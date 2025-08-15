@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(of = "id")
public class Tarefa {

    private Integer id;
    private String titulo;
    private String descricao;
    private Usuario responsavel;
    private Prioridade prioridade;
    private TarefaStatus status;
    private Instant deadline;
}
