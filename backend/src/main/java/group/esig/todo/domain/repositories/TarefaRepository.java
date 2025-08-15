package group.esig.todo.domain.repositories;

import group.esig.todo.application.dto.TarefaQueryDTO;
import group.esig.todo.domain.models.Tarefa;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface TarefaRepository {

    Tarefa salvar(Tarefa tarefa);

    Tarefa buscarPorId(Integer id);

    void remover(Integer id);

    Page<Tarefa> listar(Pageable pageable);

    Page<Tarefa> buscaPorTermo(TarefaQueryDTO termo, Pageable pageable);
}
