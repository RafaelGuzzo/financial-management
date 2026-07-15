package br.guzzo.financialmanagement.service;

import br.guzzo.financialmanagement.dto.request.AuthenticationRequest;
import br.guzzo.financialmanagement.dto.request.RegisterRequest;
import br.guzzo.financialmanagement.dto.response.AuthenticationResponse;
import br.guzzo.financialmanagement.exception.InvalidCredentialsException;
import br.guzzo.financialmanagement.model.Role;
import br.guzzo.financialmanagement.model.User;
import br.guzzo.financialmanagement.repository.UserRepository;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.ValidationException;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository repository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;

    @Transactional
    public AuthenticationResponse register(RegisterRequest request, HttpServletResponse response, User currentUser) {
        validateRegisterRequest(request, currentUser);

        var user = buildUserFromRequest(request);
        repository.save(user);

        String accessToken = jwtService.generateAccessToken(user);
        String refreshToken = jwtService.generateRefreshToken(user);

        addRefreshTokenCookie(response, refreshToken);

        return buildAuthenticationResponse(accessToken);
    }

    private void validateRegisterRequest(RegisterRequest request, User currentUser) {
        if (request.getEmail() == null || request.getPassword() == null) {
            throw new ValidationException("Email e senha são obrigatórios");
        }

        if (repository.existsByEmail(request.getEmail())) {
            throw new ValidationException("Email já está em uso");
        }

        if (request.getRole() == Role.ADMIN && (currentUser == null || currentUser.getRole() != Role.ADMIN)) {
            throw new AccessDeniedException("Apenas administradores podem criar outros administradores");
        }
    }

    private User buildUserFromRequest(RegisterRequest request) {
        return User.builder()
                .name(request.getName())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .role(request.getRole() != null ? request.getRole() : Role.USER)
                .build();
    }

    private AuthenticationResponse buildAuthenticationResponse(String accessToken) {
        return AuthenticationResponse.builder()
                .accessToken(accessToken)
                .build();
    }


    public AuthenticationResponse authenticate(AuthenticationRequest request, HttpServletResponse response) {
        System.out.println(new BCryptPasswordEncoder(12).encode("admin123"));
        try {
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            request.getEmail(),
                            request.getPassword()
                    )
            );

            User user = (User) authentication.getPrincipal();

            String accessToken = jwtService.generateAccessToken(user);
            String refreshToken = jwtService.generateRefreshToken(user);

            addRefreshTokenCookie(response, refreshToken);

            return AuthenticationResponse.builder()
                    .accessToken(accessToken)
                    .build();

        } catch (BadCredentialsException e) {
            throw new InvalidCredentialsException("Credenciais inválidas");
        }
    }

    private void addRefreshTokenCookie(HttpServletResponse response, String refreshToken) {
        Cookie cookie = new Cookie("refreshToken", refreshToken);
        cookie.setHttpOnly(true);
        cookie.setSecure(true); // Apenas HTTPS em produção
        cookie.setPath("/api/auth/refresh");
        cookie.setMaxAge((1000));// deveria puxar de jwtService
        response.addCookie(cookie);
    }
}