package group.esig.todo.presentation.web.controller;

import group.esig.todo.application.dto.AutenticacaoResponseDTO;
import group.esig.todo.application.dto.LoginRequestDTO;
import group.esig.todo.application.services.AutenticacaoService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/auth")
@Tag(name = "Autenticação", description = "Controlador para autenticação de usuários no sistema")
public class AuthController {

    private final AutenticacaoService autenticacaoService;

    @PostMapping("/login")
    @Operation(
        summary = "Realizar login no sistema",
        description = "Autentica um usuário no sistema usando email/username e senha, retornando um token JWT válido"
    )
    @ApiResponses(value = {
        @ApiResponse(
            responseCode = "200",
            description = "Login realizado com sucesso, token JWT retornado"
        ),
        @ApiResponse(
            responseCode = "400",
            description = "Dados de entrada inválidos (campos obrigatórios não preenchidos)"
        ),
        @ApiResponse(
            responseCode = "401",
            description = "Credenciais inválidas - usuário ou senha incorretos"
        ),
        @ApiResponse(
            responseCode = "500",
            description = "Erro interno do servidor"
        )
    })
    public AutenticacaoResponseDTO login(@RequestBody @Valid LoginRequestDTO req) {
        return autenticacaoService.autenticar(req);
    }
}
