package group.esig.todo.domain.models;

import lombok.Data;
import lombok.EqualsAndHashCode;

import java.util.UUID;

@Data
@EqualsAndHashCode(of = "id")
public class Usuario {

    private UUID id;
    private String nome;
    private String email;
    private String hashSenha;
}
