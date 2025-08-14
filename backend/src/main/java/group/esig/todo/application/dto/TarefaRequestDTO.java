package group.esig.todo.application.dto;

import java.time.Instant;

public record TarefaRequestDTO (
        String titulo,
        String descricao,
        Integer responsavelId,
        String prioridade,
        Instant deadline
) {
}
