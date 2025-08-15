package group.esig.todo.application.services;


import group.esig.todo.application.dto.TarefaQueryDTO;
import group.esig.todo.application.dto.TarefaRequestDTO;
import group.esig.todo.application.dto.TarefaResponseDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface TarefaService {

    TarefaResponseDTO salvar(TarefaRequestDTO dto);

    TarefaResponseDTO buscarPorId(Integer id);

    void remover(Integer id);

    TarefaResponseDTO atualizar(Integer tarefaId, TarefaRequestDTO tarefa);

    Page<TarefaResponseDTO> listarPaginado(Pageable pageable);

    Page<TarefaResponseDTO> buscaPaginada(TarefaQueryDTO query, Pageable pageable);

    void concluir(Integer id);
}
