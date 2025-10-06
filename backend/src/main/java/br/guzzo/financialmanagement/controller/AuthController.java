package br.guzzo.financialmanagement.controller;

import br.guzzo.financialmanagement.dto.request.AuthenticationRequest;
import br.guzzo.financialmanagement.dto.request.RegisterRequest;
import br.guzzo.financialmanagement.dto.response.AuthenticationResponse;
import br.guzzo.financialmanagement.model.User;
import br.guzzo.financialmanagement.repository.UserRepository;
import br.guzzo.financialmanagement.service.JwtService;
import br.guzzo.financialmanagement.service.UserService;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {
    private final UserService userService;
    private final JwtService jwtService;
    private final UserRepository userRepository;

    @PostMapping("/register")
    public ResponseEntity<AuthenticationResponse> register(
            @RequestBody RegisterRequest request,
            HttpServletResponse response,
            @AuthenticationPrincipal User currentUser) {

        return ResponseEntity.ok(userService.register(request, response, currentUser));
    }


    @PostMapping("/authenticate")
    public ResponseEntity<AuthenticationResponse> authenticate(
            @RequestBody AuthenticationRequest request,
            HttpServletResponse response) {  // Adicione o parâmetro
        return ResponseEntity.ok(userService.authenticate(request, response));
    }

    @PostMapping("/refresh")
    public ResponseEntity<AuthenticationResponse> refreshToken(
            @CookieValue(name = "refreshToken", required = false) String refreshToken) {

        if (refreshToken == null || refreshToken.isEmpty()) {
            throw new RuntimeException("Refresh token não encontrado");
        }

        String userEmail = jwtService.extractUsername(refreshToken);
        if (userEmail == null) {
            throw new RuntimeException("Refresh token inválido");
        }

        var user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));

        if (!jwtService.isTokenValid(refreshToken, user)) {
            throw new RuntimeException("Refresh token expirado ou inválido");
        }

        String newAccessToken = jwtService.generateAccessToken(user);

        return ResponseEntity.ok(AuthenticationResponse.builder()
                .accessToken(newAccessToken)
                .build());
    }
}