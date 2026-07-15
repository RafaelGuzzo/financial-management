package br.guzzo.financialmanagement.controller;

import br.guzzo.financialmanagement.dto.request.RegisterRequest;
import br.guzzo.financialmanagement.dto.response.AuthenticationResponse;
import br.guzzo.financialmanagement.model.Role;
import br.guzzo.financialmanagement.model.User;
import br.guzzo.financialmanagement.service.UserService;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/admin/users")
@RequiredArgsConstructor
public class AdminUserController {

    private final UserService userService;

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<AuthenticationResponse> createUser(
            @RequestBody RegisterRequest request,
            HttpServletResponse response,
            @AuthenticationPrincipal User adminUser) {

        // Força o papel USER para novos usuários criados por admin
        request.setRole(Role.USER);

        return ResponseEntity.ok(userService.register(request, response, adminUser));
    }
}
