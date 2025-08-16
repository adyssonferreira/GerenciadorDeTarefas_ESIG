package group.esig.todo.presentation.web.controller;

import group.esig.todo.application.dto.AutenticacaoResponseDTO;
import group.esig.todo.application.dto.LoginRequestDTO;
import group.esig.todo.application.services.AutenticacaoService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/auth")
public class AuthController {

    private final AutenticacaoService autenticacaoService;

    @PostMapping("/login")
    public AutenticacaoResponseDTO login(@RequestBody @Valid LoginRequestDTO req) {
        return autenticacaoService.autenticar(req);
    }
}
