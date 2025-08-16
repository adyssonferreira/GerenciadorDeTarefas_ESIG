package group.esig.todo.application.services.impl;

import group.esig.todo.application.dto.TarefaRequestDTO;
import group.esig.todo.application.dto.TarefaResponseDTO;
import group.esig.todo.domain.enums.Prioridade;
import group.esig.todo.domain.enums.TarefaStatus;
import group.esig.todo.domain.models.Tarefa;
import group.esig.todo.domain.models.Usuario;
import group.esig.todo.domain.repositories.TarefaRepository;
import group.esig.todo.domain.repositories.UsuarioRepository;
import group.esig.todo.infrastructure.persistence.repositories.UsuarioRepositoryImpl;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;

import java.time.Instant;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

@SpringBootTest
@ActiveProfiles("teste")
class TarefaServiceImplTest {

    @Autowired
    private TarefaServiceImpl tarefaServiceImpl;

    @Mock
    private TarefaRepository tarefaRepository;

    @Mock
    private UsuarioRepository usuarioRepository;

    @Test
    void salvar_deveSalvarTarefaComSucesso() {
        Usuario mockUsuario = Usuario.builder()
                .id(1)
                .nome("João")
                .build();

        Tarefa mockTarefa = Tarefa.builder()
                .id(1)
                .titulo("Estudar Spring Boot")
                .descricao("Estudar tópicos avançados")
                .prioridade(Prioridade.ALTA)
                .status(TarefaStatus.ABERTA)
                .deadline(Instant.parse("2025-12-31T23:59:59.00Z"))
                .responsavel(mockUsuario)
                .build();

        when(usuarioRepository.buscarPorId(1)).thenReturn(mockUsuario);
        when(tarefaRepository.salvar(any(Tarefa.class))).thenReturn(mockTarefa);

        TarefaRequestDTO requestDTO = new TarefaRequestDTO(
                "Estudar Spring Boot",
                "Estudar tópicos avançados",
                1,
                "ALTA",
                Instant.parse("2025-12-31T23:59:59.00Z")
        );

        TarefaResponseDTO responseDTO = tarefaServiceImpl.salvar(requestDTO);

        assertNotNull(responseDTO);
        assertEquals("Estudar Spring Boot", responseDTO.titulo());
        assertEquals("Estudar tópicos avançados", responseDTO.descricao());
        assertEquals("João", responseDTO.responsavel().nome());
        assertEquals("ALTA", responseDTO.prioridade());
        assertEquals("ABERTA", responseDTO.status());
        assertEquals(Instant.parse("2025-12-31T23:59:59.00Z"), responseDTO.deadline());
    }

    @Test
    void salvar_deveLancarExceptionQuandoUsuarioNaoEncontrado() {
        when(usuarioRepository.buscarPorId(99)).thenThrow(new RuntimeException("Usuário não encontrado"));

        TarefaRequestDTO requestDTO = new TarefaRequestDTO(
                "Estudar Spring Boot",
                "Estudar tópicos avançados",
                99,
                "ALTA",
                Instant.parse("2025-12-31T23:59:59.00Z")
        );

        RuntimeException exception = assertThrows(RuntimeException.class, () -> tarefaServiceImpl.salvar(requestDTO));

        assertEquals("Usuário não encontrado", exception.getMessage());
    }
}