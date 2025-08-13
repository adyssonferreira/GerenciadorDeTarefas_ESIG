package group.esig.todo.infrastructure.persistence.mappers;

import group.esig.todo.domain.models.Tarefa;
import group.esig.todo.infrastructure.persistence.entities.TarefaEntity;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface TarefaMapperPersistence {

    TarefaEntity toEntity(Tarefa tarefa);

    Tarefa toModel(TarefaEntity entity);
}
