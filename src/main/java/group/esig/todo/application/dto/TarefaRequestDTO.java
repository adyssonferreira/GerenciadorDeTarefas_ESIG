package group.esig.todo.application.dto;

import java.time.Instant;

public record TarefaRequestDTO (
        String titulo,
        String descricao,
        String responsavelId,
        String prioridade,
        Instant deadline
) {
}
