package group.esig.todo.domain.repositories;

import group.esig.todo.domain.models.Usuario;

public interface UsuarioRepository {

    Usuario buscarPorId(String id);
}
