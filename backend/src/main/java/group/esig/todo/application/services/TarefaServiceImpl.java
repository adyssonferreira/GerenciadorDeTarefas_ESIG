package group.esig.todo.application.services;

import group.esig.todo.application.dto.TarefaQueryDTO;
import group.esig.todo.application.dto.TarefaRequestDTO;
import group.esig.todo.application.dto.TarefaResponseDTO;
import group.esig.todo.domain.enums.Prioridade;
import group.esig.todo.domain.enums.TarefaStatus;
import group.esig.todo.domain.models.Tarefa;
import group.esig.todo.domain.models.Usuario;
import group.esig.todo.domain.repositories.TarefaRepository;
import group.esig.todo.domain.repositories.UsuarioRepository;
import group.esig.todo.infrastructure.configs.CacheConfig;
import lombok.RequiredArgsConstructor;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.Objects;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class TarefaServiceImpl implements TarefaService {

    private final TarefaRepository repository;
    private final UsuarioRepository usuarioRepository;


    @Override
    public TarefaResponseDTO salvar(TarefaRequestDTO dto) {
        final Usuario responsavel = usuarioRepository.buscarPorId(dto.responsavelId());

        Tarefa tarefa =  Tarefa.builder()
                .titulo(dto.titulo())
                .descricao(dto.descricao())
                .prioridade(Prioridade.valueOf(dto.prioridade()))
                .status(TarefaStatus.ABERTA)
                .deadline(dto.deadline())
                .responsavel(responsavel)
                .build();

        return TarefaResponseDTO.from(repository.salvar(tarefa));
    }

    @Override
    public TarefaResponseDTO buscarPorId(Integer id) {
        Tarefa tarefa = repository.buscarPorId(id);

        return TarefaResponseDTO.from(tarefa);
    }

    @Override
    public void remover(Integer id) {
        repository.remover(id);
    }

    @Override
    @CacheEvict(value = CacheConfig.TAREFA_CACHE, key = "#tarefaId")
    public TarefaResponseDTO atualizar(Integer tarefaId, TarefaRequestDTO dto) {
        Tarefa tarefa = repository.buscarPorId(tarefaId);

        if (Objects.nonNull(dto.titulo()) && !dto.titulo().isBlank())
            tarefa.setTitulo(dto.titulo());

        if (Objects.nonNull(dto.descricao()) && !dto.descricao().isBlank())
            tarefa.setDescricao(dto.descricao());

        tarefa.setPrioridade(Prioridade.valueOf(dto.prioridade()));
        tarefa.setDeadline(dto.deadline());

        return TarefaResponseDTO.from(repository.salvar(tarefa));
    }

    @Override
    public Page<TarefaResponseDTO> listarPaginado(Pageable pageable) {
        return repository.listar(pageable).map(TarefaResponseDTO::from);
    }

    @Override
    public Page<TarefaResponseDTO> buscaPaginada(TarefaQueryDTO query, Pageable pageable) {
        return repository.buscaPorTermo(query, pageable).map(TarefaResponseDTO::from);
    }

    @Override
    @CacheEvict(value = CacheConfig.TAREFA_CACHE, key = "#tarefaId")
    public void concluir(Integer tarefaId) {
        Tarefa tarefa = repository.buscarPorId(tarefaId);
        tarefa.setStatus(TarefaStatus.FINALIZADA);
        repository.salvar(tarefa);
    }
}
