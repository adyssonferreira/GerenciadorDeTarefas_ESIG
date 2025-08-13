package group.esig.todo.infrastructure.persistence.repositories;

import group.esig.todo.domain.models.Tarefa;
import group.esig.todo.domain.repositories.TarefaRepository;
import group.esig.todo.infrastructure.persistence.mappers.TarefaMapperPersistence;
import group.esig.todo.infrastructure.persistence.repositories.jpa.TarefaRepositoryJpa;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Component;

import java.util.UUID;

@Component
@RequiredArgsConstructor
public class TarefaRepositoryImpl implements TarefaRepository {

    final private TarefaRepositoryJpa repositoryJpa;
    final private TarefaMapperPersistence mapper;

    @Override
    public Tarefa salvar(Tarefa tarefa) {
        var savedEntity = repositoryJpa.saveAndFlush(mapper.toEntity(tarefa));
        return mapper.toModel(savedEntity);
    }

    @Override
    public Tarefa buscarPorId(String id) {
        return repositoryJpa.findById(UUID.fromString(id))
                .map(mapper::toModel)
                .orElseThrow(() -> new RuntimeException("Tarefa não encontrada"));
    }

    @Override
    public void remover(String id) {
        repositoryJpa.deleteById(UUID.fromString(id));
    }

    @Override
    public Page<Tarefa> listar(Pageable pageable) {
      return repositoryJpa.findAll(pageable).map(mapper::toModel);
    }
}
