package group.esig.todo.application.dto;

import jakarta.validation.constraints.NotBlank;

public record LoginRequestDTO(
        @NotBlank
        String usernameOrEmail,

        @NotBlank
        String senha
) {
}
