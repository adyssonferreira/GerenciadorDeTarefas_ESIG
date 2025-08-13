package group.esig.todo.application.dto;

import group.esig.todo.domain.models.Tarefa;

import java.time.Instant;

public record TarefaResponseDTO(
        String id,
        String titulo,
        String descricao,
        UsuarioDTO responsavel,
        String prioridade,
        String status,
        Instant deadline
) {
    
    public static TarefaResponseDTO from(Tarefa model){
        return new TarefaResponseDTO(
                model.getId().toString(),
                model.getTitulo(),
                model.getDescricao(),
                UsuarioDTO.from(model.getResponsavel()),
                model.getPrioridade().toString(),
                model.getStatus().toString(),
                model.getDeadline()
        );
    }
}
