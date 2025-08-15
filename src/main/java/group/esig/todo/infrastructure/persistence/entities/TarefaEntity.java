@Entity
@Table(name = "tarefas")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class TarefaEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(nullable = false)
    private String titulo;
