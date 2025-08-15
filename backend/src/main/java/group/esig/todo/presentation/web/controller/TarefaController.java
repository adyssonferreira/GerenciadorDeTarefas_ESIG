package group.esig.todo.presentation.web.controller;

import group.esig.todo.application.dto.TarefaQueryDTO;
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

import java.lang.Integer;

@RestController
@CrossOrigin(origins = "*", maxAge = 3600)
@RequestMapping("/api/v1/tarefas")
@RequiredArgsConstructor
public class TarefaController {

    private final TarefaService tarefaService;

    @PostMapping
    public ResponseEntity<TarefaResponseDTO> criarTarefa(@RequestBody TarefaRequestDTO dto) {
        return new ResponseEntity<>(tarefaService.salvar(dto), HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<TarefaResponseDTO> atualizarTarefa(@PathVariable Integer id, @RequestBody TarefaRequestDTO tarefa) {
        return ResponseEntity.ok(tarefaService.atualizar(id, tarefa));
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void removerTarefa(@PathVariable Integer id) {
        tarefaService.remover(id);
    }

    @GetMapping
    public ResponseEntity<PageModel<TarefaResponseDTO>> listarTarefas(Pageable pageable) {
        Page<TarefaResponseDTO> page = tarefaService.listarPaginado(pageable);
        return ResponseEntity.ok(PageModel.of(page));
    }

    @GetMapping("busca")
    public ResponseEntity<PageModel<TarefaResponseDTO>> buscaTarefas(@ModelAttribute TarefaQueryDTO query, Pageable pageable) {
        Page<TarefaResponseDTO> page = tarefaService.buscaPaginada(query, pageable);
        return ResponseEntity.ok(PageModel.of(page));
    }

    @GetMapping("/{id}")
    public ResponseEntity<TarefaResponseDTO> buscarTarefaPorId(@PathVariable Integer id) {
        return ResponseEntity.ok(tarefaService.buscarPorId(id));
    }

    @PutMapping("/{id}/concluir")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void concluirTarefa(@PathVariable Integer id) {
        tarefaService.concluir(id);
    }
}
