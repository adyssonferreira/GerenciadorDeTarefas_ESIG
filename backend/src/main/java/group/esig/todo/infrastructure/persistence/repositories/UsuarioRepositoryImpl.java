package group.esig.todo.infrastructure.persistence.repositories;

import group.esig.todo.domain.models.Usuario;
import group.esig.todo.domain.repositories.UsuarioRepository;
import group.esig.todo.infrastructure.configs.CacheConfig;
import group.esig.todo.infrastructure.persistence.mappers.UsuarioMapperPersistence;
import group.esig.todo.infrastructure.persistence.repositories.jpa.UsuarioRepositoryJpa;
import group.esig.todo.infrastructure.web.exception.ResourceNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Component;

import java.util.UUID;

@Component
@RequiredArgsConstructor
public class UsuarioRepositoryImpl implements UsuarioRepository {

    private final UsuarioRepositoryJpa repositoryJpa;
    private final UsuarioMapperPersistence mapper;

    @Override
    @Cacheable(value = CacheConfig.USUARIOS_CACHE, key = "#id")
    public Usuario buscarPorId(String id) {
        return repositoryJpa.findById(UUID.fromString(id))
                .map(mapper::toModel)
                .orElseThrow(() -> new ResourceNotFoundException("Usuário", "id", id));
    }

}

