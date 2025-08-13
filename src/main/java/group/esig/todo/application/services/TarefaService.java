package group.esig.todo.application.services;


import group.esig.todo.application.dto.TarefaRequestDTO;
import group.esig.todo.application.dto.TarefaResponseDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.UUID;

public interface TarefaService {

    TarefaResponseDTO salvar(TarefaRequestDTO dto);

    TarefaResponseDTO buscarPorId(UUID id);

    void remover(UUID id);

    TarefaResponseDTO atualizar(UUID tarefaId, TarefaRequestDTO tarefa);

    Page<TarefaResponseDTO> listarPaginado(Pageable pageable);

    void concluir(UUID id);
}
