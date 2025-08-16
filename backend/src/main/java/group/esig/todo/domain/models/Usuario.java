package group.esig.todo.domain.models;

import lombok.Builder;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.util.UUID;

@Data
@Builder
@EqualsAndHashCode(of = "id")
public class Usuario {

    private Integer id;
    private String nome;
    private String email;
    private String hashSenha;
}
