package group.esig.todo.domain.repositories;

import group.esig.todo.domain.models.Usuario;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface UsuarioRepository {

    List<Usuario> listarTodos();

    Usuario buscarPorId(Integer id);
}