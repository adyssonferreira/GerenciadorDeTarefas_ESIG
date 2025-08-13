package group.esig.todo.domain.models;


import group.esig.todo.domain.enums.TarefaStatus;
import lombok.*;

import group.esig.todo.domain.enums.Prioridade;

import java.time.Instant;
import java.util.UUID;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(of = "id")
public class Tarefa {

    private UUID id;
    private String titulo;
    private String descricao;
    private Usuario responsavel;
    private Prioridade prioridade;
    private TarefaStatus status;
    private Instant deadline;
}
