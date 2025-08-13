package group.esig.todo.infrastructure.persistence.entities;

import group.esig.todo.domain.enums.Prioridade;
import group.esig.todo.domain.enums.TarefaStatus;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.Instant;
import java.util.UUID;

@Entity
@Table(name = "tarefas")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class TarefaEntity {

    @Id
    private UUID id;

    @Column(nullable = false)
    private String titulo;

    @Column(columnDefinition = "TEXT")
    private String descricao;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "responsavel_id")
    private UsuarioEntity responsavel;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Prioridade prioridade;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private TarefaStatus status;

    @Column
    private Instant deadline;

    @CreationTimestamp
    @Column(name = "criado_em", nullable = false, updatable = false)
    private Instant criadoEm;

    @UpdateTimestamp
    @Column(name = "atualizado_em", nullable = false)
    private Instant atualizadoEm;

    @PrePersist
    @PreUpdate
    private void validar() {
        if (titulo == null || titulo.trim().isEmpty()) {
            throw new IllegalArgumentException("Título é obrigatório");
        }

        if (deadline != null && deadline.isBefore(Instant.now())) {
            throw new IllegalArgumentException("Deadline não pode ser no passado");
        }
    }
}
