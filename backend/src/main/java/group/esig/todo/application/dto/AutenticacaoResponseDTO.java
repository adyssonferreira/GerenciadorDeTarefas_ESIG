package group.esig.todo.application.dto;

public record AutenticacaoResponseDTO(
        String token,
        String expiraEm
) {
}
