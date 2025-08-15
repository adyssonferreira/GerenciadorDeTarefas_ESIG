package group.esig.todo.application.dto;

import group.esig.todo.domain.enums.Prioridade;
import group.esig.todo.domain.enums.TarefaStatus;

import java.util.UUID;

public record TarefaQueryDTO(
        String id,
        String termo,
        Prioridade prioridade,
        Integer responsavelId,
        TarefaStatus status
) {
}
