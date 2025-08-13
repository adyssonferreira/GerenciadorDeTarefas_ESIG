package group.esig.todo.infrastructure.persistence.mappers;

import group.esig.todo.domain.models.Usuario;
import group.esig.todo.infrastructure.persistence.entities.UsuarioEntity;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface UsuarioMapperPersistence {
    Usuario toModel(UsuarioEntity entity);
}
