package br.guzzo.financialmanagement.dto.request;

import br.guzzo.financialmanagement.model.Role;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class RegisterRequest {
    private String name;
    private String email;
    private String password;

    @JsonIgnore // Evita que o role seja definido diretamente pelo request
    private Role role;
}