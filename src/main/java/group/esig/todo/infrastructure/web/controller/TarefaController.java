package group.esig.todo.infrastructure.web.controller;

import group.esig.todo.application.dto.TarefaRequestDTO;
import group.esig.todo.application.dto.TarefaResponseDTO;
import group.esig.todo.application.services.TarefaService;
import group.esig.todo.domain.valueobjects.PageModel;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/api/v1/tarefas")
@RequiredArgsConstructor
public class TarefaController {

    private final TarefaService tarefaService;

    @PostMapping
    public ResponseEntity<TarefaResponseDTO> criarTarefa(@RequestBody TarefaRequestDTO dto) {
        return new ResponseEntity<>(tarefaService.salvar(dto), HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<TarefaResponseDTO> atualizarTarefa(@PathVariable String id, @RequestBody TarefaRequestDTO tarefa) {
        return ResponseEntity.ok(tarefaService.atualizar(UUID.fromString(id), tarefa));
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void removerTarefa(@PathVariable UUID id) {
        tarefaService.remover(id);
    }

    @GetMapping
    public ResponseEntity<PageModel<TarefaResponseDTO>> listarTarefas(Pageable pageable) {
        Page<TarefaResponseDTO> page = tarefaService.listarPaginado(pageable);
        return ResponseEntity.ok(PageModel.of(page));
    }

    @GetMapping("/{id}")
    public ResponseEntity<TarefaResponseDTO> buscarTarefaPorId(@PathVariable UUID id) {
        return ResponseEntity.ok(tarefaService.buscarPorId(id));
    }

    @PutMapping("/{id}/concluir")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void concluirTarefa(@PathVariable UUID id) {
        tarefaService.concluir(id);
    }
}
