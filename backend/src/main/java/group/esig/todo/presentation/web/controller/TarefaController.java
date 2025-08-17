package group.esig.todo.presentation.web.controller;

import group.esig.todo.application.dto.TarefaQueryDTO;
import group.esig.todo.application.dto.TarefaRequestDTO;
import group.esig.todo.application.dto.TarefaResponseDTO;
import group.esig.todo.application.services.TarefaService;
import group.esig.todo.domain.valueobjects.PageModel;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.lang.Integer;

@RestController
@RequestMapping("/api/v1/tarefas")
@RequiredArgsConstructor
@Tag(name = "Tarefas", description = "Controlador para gerenciamento completo de tarefas")
public class TarefaController {

    private final TarefaService tarefaService;

    @PostMapping
    @Operation(
        summary = "Criar nova tarefa",
        description = "Cria uma nova tarefa no sistema com os dados fornecidos"
    )
    @ApiResponses(value = {
        @ApiResponse(
            responseCode = "201",
            description = "Tarefa criada com sucesso"
        ),
        @ApiResponse(
            responseCode = "400",
            description = "Dados de entrada inválidos"
        ),
        @ApiResponse(
            responseCode = "500",
            description = "Erro interno do servidor"
        )
    })
    public ResponseEntity<TarefaResponseDTO> criarTarefa(@RequestBody TarefaRequestDTO dto) {
        return new ResponseEntity<>(tarefaService.salvar(dto), HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    @Operation(
        summary = "Atualizar tarefa existente",
        description = "Atualiza uma tarefa existente com base no ID fornecido"
    )
    @ApiResponses(value = {
        @ApiResponse(
            responseCode = "200",
            description = "Tarefa atualizada com sucesso"
        ),
        @ApiResponse(
            responseCode = "400",
            description = "Dados de entrada inválidos"
        ),
        @ApiResponse(
            responseCode = "404",
            description = "Tarefa não encontrada"
        ),
        @ApiResponse(
            responseCode = "500",
            description = "Erro interno do servidor"
        )
    })
    public ResponseEntity<TarefaResponseDTO> atualizarTarefa(
        @Parameter(description = "ID da tarefa a ser atualizada", required = true)
        @PathVariable Integer id, 
        @RequestBody TarefaRequestDTO tarefa) {
        return ResponseEntity.ok(tarefaService.atualizar(id, tarefa));
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    @Operation(
        summary = "Remover tarefa",
        description = "Remove uma tarefa do sistema com base no ID fornecido"
    )
    @ApiResponses(value = {
        @ApiResponse(
            responseCode = "204",
            description = "Tarefa removida com sucesso"
        ),
        @ApiResponse(
            responseCode = "404",
            description = "Tarefa não encontrada"
        ),
        @ApiResponse(
            responseCode = "500",
            description = "Erro interno do servidor"
        )
    })
    public void removerTarefa(
        @Parameter(description = "ID da tarefa a ser removida", required = true)
        @PathVariable Integer id) {
        tarefaService.remover(id);
    }

    @GetMapping
    @Operation(
        summary = "Listar tarefas com paginação",
        description = "Retorna uma lista paginada de todas as tarefas do sistema"
    )
    @ApiResponses(value = {
        @ApiResponse(
            responseCode = "200",
            description = "Lista de tarefas recuperada com sucesso"
        ),
        @ApiResponse(
            responseCode = "500",
            description = "Erro interno do servidor"
        )
    })
    public ResponseEntity<PageModel<TarefaResponseDTO>> listarTarefas(
        @Parameter(description = "Informações de paginação (page, size, sort)")
        Pageable pageable) {
        Page<TarefaResponseDTO> page = tarefaService.listarPaginado(pageable);
        return ResponseEntity.ok(PageModel.of(page));
    }

    @GetMapping("busca")
    @Operation(
        summary = "Buscar tarefas com filtros",
        description = "Busca tarefas aplicando filtros específicos como termo, prioridade, responsável e status"
    )
    @ApiResponses(value = {
        @ApiResponse(
            responseCode = "200",
            description = "Busca realizada com sucesso"
        ),
        @ApiResponse(
            responseCode = "400",
            description = "Parâmetros de busca inválidos"
        ),
        @ApiResponse(
            responseCode = "500",
            description = "Erro interno do servidor"
        )
    })
    public ResponseEntity<PageModel<TarefaResponseDTO>> buscaTarefas(
        @Parameter(description = "Critérios de busca (termo, prioridade, responsável, status)")
        @ModelAttribute TarefaQueryDTO query, 
        @Parameter(description = "Informações de paginação (page, size, sort)")
        Pageable pageable) {
        Page<TarefaResponseDTO> page = tarefaService.buscaPaginada(query, pageable);
        return ResponseEntity.ok(PageModel.of(page));
    }

    @GetMapping("/{id}")
    @Operation(
        summary = "Buscar tarefa por ID",
        description = "Retorna os detalhes de uma tarefa específica com base no ID fornecido"
    )
    @ApiResponses(value = {
        @ApiResponse(
            responseCode = "200",
            description = "Tarefa encontrada com sucesso"
        ),
        @ApiResponse(
            responseCode = "404",
            description = "Tarefa não encontrada"
        ),
        @ApiResponse(
            responseCode = "500",
            description = "Erro interno do servidor"
        )
    })
    public ResponseEntity<TarefaResponseDTO> buscarTarefaPorId(
        @Parameter(description = "ID da tarefa a ser buscada", required = true)
        @PathVariable Integer id) {
        return ResponseEntity.ok(tarefaService.buscarPorId(id));
    }

    @PutMapping("/{id}/concluir")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    @Operation(
        summary = "Concluir tarefa",
        description = "Marca uma tarefa como concluída com base no ID fornecido"
    )
    @ApiResponses(value = {
        @ApiResponse(
            responseCode = "204",
            description = "Tarefa marcada como concluída com sucesso"
        ),
        @ApiResponse(
            responseCode = "404",
            description = "Tarefa não encontrada"
        ),
        @ApiResponse(
            responseCode = "400",
            description = "Tarefa já está concluída ou não pode ser concluída"
        ),
        @ApiResponse(
            responseCode = "500",
            description = "Erro interno do servidor"
        )
    })
    public void concluirTarefa(
        @Parameter(description = "ID da tarefa a ser concluída", required = true)
        @PathVariable Integer id) {
        tarefaService.concluir(id);
    }
}
