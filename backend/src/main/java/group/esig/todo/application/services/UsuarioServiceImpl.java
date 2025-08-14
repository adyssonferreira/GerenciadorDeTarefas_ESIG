package group.esig.todo.application.services;

import group.esig.todo.application.dto.UsuarioDTO;
import group.esig.todo.domain.models.Usuario;
import group.esig.todo.domain.repositories.UsuarioRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class UsuarioServiceImpl implements UsuarioService {

    private final UsuarioRepository usuarioRepository;

    public List<UsuarioDTO> listarTodos() {
        List<Usuario> usuarios = usuarioRepository.listarTodos();
        return usuarios.stream()
                .map(UsuarioDTO::from)
                .collect(Collectors.toList());
    }
}
