package group.esig.todo.infrastructure.persistence.repositories;

import group.esig.todo.application.dto.TarefaQueryDTO;
import group.esig.todo.domain.models.Tarefa;
import group.esig.todo.domain.repositories.TarefaRepository;
import group.esig.todo.infrastructure.configs.CacheConfig;
import group.esig.todo.infrastructure.persistence.mappers.TarefaMapperPersistence;
import group.esig.todo.infrastructure.persistence.repositories.jpa.TarefaRepositoryJpa;
import group.esig.todo.infrastructure.persistence.specifications.TarefaSpecification;
import group.esig.todo.presentation.web.exception.ResourceNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Component;

import java.util.UUID;

@Component
@RequiredArgsConstructor
public class TarefaRepositoryImpl implements TarefaRepository {

    final private TarefaRepositoryJpa repositoryJpa;
    final private TarefaMapperPersistence mapper;
    final private TarefaSpecification specification;

    @Override
    public Tarefa salvar(Tarefa tarefa) {
        var savedEntity = repositoryJpa.saveAndFlush(mapper.toEntity(tarefa));
        return mapper.toModel(savedEntity);
    }

    @Override
    @Cacheable(value = CacheConfig.TAREFA_CACHE, key = "#id")
    public Tarefa buscarPorId(String id) {
        return repositoryJpa.findById(UUID.fromString(id))
                .map(mapper::toModel)
                .orElseThrow(() -> new ResourceNotFoundException("Tarefa", "id", id));
    }

    @Override
    public void remover(String id) {
        repositoryJpa.deleteById(UUID.fromString(id));
    }

    @Override
    public Page<Tarefa> listar(Pageable pageable) {
      return repositoryJpa.findAll(pageable).map(mapper::toModel);
    }

    @Override
    public Page<Tarefa> buscaPorTermo(TarefaQueryDTO query, Pageable pageable) {
        return repositoryJpa.findAll(specification.build(query), pageable).map(mapper::toModel);
    }
}
