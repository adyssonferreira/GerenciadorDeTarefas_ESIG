package group.esig.todo.application.services;

import group.esig.todo.application.dto.AutenticacaoResponseDTO;
import group.esig.todo.application.dto.LoginRequestDTO;

public interface AutenticacaoService {
    AutenticacaoResponseDTO autenticar(LoginRequestDTO dto);
}
