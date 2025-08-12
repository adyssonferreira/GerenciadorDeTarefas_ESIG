package group.esig.todo.domain.models;


import group.esig.todo.domain.enums.TarefaStatus;
import lombok.Data;
import lombok.EqualsAndHashCode;

import group.esig.todo.domain.enums.Prioridade;

import java.util.UUID;

@Data
@EqualsAndHashCode(of = "id")
public class Tarefa {

    private UUID id;
    private String descricao;
    private Usuario responsavel;
    private Prioridade prioridade;
    private TarefaStatus status;
}
