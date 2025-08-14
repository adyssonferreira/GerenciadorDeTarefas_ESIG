package group.esig.todo.infrastructure.persistence.repositories;

import group.esig.todo.domain.models.Usuario;
import group.esig.todo.domain.repositories.UsuarioRepository;
import group.esig.todo.infrastructure.persistence.mappers.UsuarioMapperPersistence;
import group.esig.todo.infrastructure.persistence.repositories.jpa.UsuarioRepositoryJpa;
import group.esig.todo.presentation.web.exception.ResourceNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.stream.Collectors;

@Repository
@RequiredArgsConstructor
public class UsuarioRepositoryImpl implements UsuarioRepository {

    private final UsuarioRepositoryJpa usuarioRepositoryJpa;
    private final UsuarioMapperPersistence mapper;

    @Override
    public List<Usuario> listarTodos() {
        return usuarioRepositoryJpa.findAll().stream()
                .map(mapper::toDomain)
                .collect(Collectors.toList());
    }

    @Override
    public Usuario buscarPorId(Integer id) {
        return usuarioRepositoryJpa.findById(id)
                .map(mapper::toDomain)
                .orElseThrow(() -> new ResourceNotFoundException("Usuário", "id", id));
    }
}