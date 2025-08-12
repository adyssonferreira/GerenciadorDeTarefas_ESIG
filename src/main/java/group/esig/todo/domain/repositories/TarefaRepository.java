package group.esig.todo.domain.repositories;

import group.esig.todo.domain.models.Tarefa;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface TarefaRepository {

    Tarefa salvar(Tarefa tarefa);

    Tarefa buscarPorId(String id);

    void remover(String id);

    Page<Tarefa> listar(Pageable pageable);
}
