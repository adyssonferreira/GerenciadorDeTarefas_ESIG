package group.esig.todo.application.dto;

import group.esig.todo.domain.models.Usuario;

import java.util.UUID;

public record UsuarioDTO(
        Integer id,
        String nome,
        String email
) {

    public static UsuarioDTO from(Usuario usuario){
        return new UsuarioDTO(usuario.getId(), usuario.getNome(), usuario.getEmail());
    }
}
