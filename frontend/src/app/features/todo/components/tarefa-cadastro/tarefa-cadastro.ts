import {Component, EventEmitter, inject, Input, OnInit, Output, signal} from '@angular/core';
import {Dialog} from "primeng/dialog";
import Tarefa, {TarefaRequest} from '../../../../core/models/Tarefa';
import {TarefaService} from '../../../../core/services/tarefa.service';
import {UsuarioService} from '../../../../core/services/usuario.service';
import Option from '../../../../shared/types/Option';
import Prioridade from '../../../../core/enums/Prioridade';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {InputText} from 'primeng/inputtext';
import {Textarea} from 'primeng/textarea';
import {DatePicker} from 'primeng/datepicker';
import {Select} from 'primeng/select';
import {Button} from 'primeng/button';
import {finalize} from 'rxjs';

@Component({
  selector: 'app-tarefa-cadastro',
    imports: [
        Dialog,
        FormsModule,
        InputText,
        ReactiveFormsModule,
        Textarea,
        DatePicker,
        Select,
        Button
    ],
  templateUrl: './tarefa-cadastro.html',
  styleUrl: './tarefa-cadastro.scss'
})
export class TarefaCadastro implements OnInit {
    @Input() visible: boolean = false;
    @Input() tarefa: Tarefa | null = null;

    private tarefaService = inject(TarefaService);
    private usuarioService = inject(UsuarioService);

    @Output() onFecharDialog = new EventEmitter<void>();
    @Output() onItemSalvo = new EventEmitter<boolean>(true);

    protected readonly usuarios = signal<Option[]>([]);
    protected readonly loadingCadastro = signal(false);

    prioridades: Option[] = [
        {
            value: Prioridade.BAIXA,
            label: "Baixa"
        },
        {
            value: Prioridade.MEDIA,
            label: "Média"
        },
        {
            value: Prioridade.ALTA,
            label: "Alta"
        },

    ]

    tarefaForm: FormGroup;

    constructor(private formBuilder: FormBuilder) {
        this.tarefaForm = this.formBuilder.group({
            titulo: "",
            descricao: "",
            deadline: [null],
            situacao: "",
            prioridade: "",
            responsavel: [null],
        })
    }

    ngOnInit(): void {
        this.fetchUsuarios();
    }

    onVisibleChange(event: boolean){
        if(!event) {
            this.onFecharDialog.emit();
        }
    }

    fetchUsuarios() {
        this.usuarioService.buscarTodos().subscribe({
            next: (_usuarios) => {
                const usuarios = _usuarios.map(usuario => ({
                    label: usuario.nome,
                    value: usuario.id
                }));

                this.usuarios.set(usuarios);
                const responsavel = _usuarios.find(usuario => usuario.id === this.tarefa?.responsavel.id);
                this.tarefaForm.patchValue({responsavel: {label: responsavel?.nome, value: responsavel?.id}});

            },
            error: (error) => {
                console.error('Erro ao buscar usuários:', error);
            }
        });
    }

    salvarTarefa() {
        const formData = this.tarefaForm.value;

        const request: TarefaRequest = {
            titulo: formData.titulo,
            descricao: formData.descricao,
            deadline: formData.deadline?.toISOString() ?? "",
            status: formData.situacao,
            prioridade: formData.prioridade.value,
            responsavelId: formData.responsavel.value
        }

        if(!this.validacoes(request)) return

        this.loadingCadastro.set(true);

        this.tarefaService.criarTarefa(request)
            .pipe(
                finalize(() => {
                    this.loadingCadastro.set(false);
                })
            )
            .subscribe({
                next: (_usuarios) => {
                    this.tarefaForm.reset();
                    this.onItemSalvo.emit(true);
                },

                error: (error) => {
                    console.error('Erro ao criar tarefa:', error);
                    this.onItemSalvo.emit(false);
                },
            })
    }

    validacoes(request: TarefaRequest): boolean {
        if(request.titulo.trim().length == 0) {
            alert("Campo título está vazio")
            return false;
        }

        if(!request.responsavelId) {
            alert("O responsável não foi atribuído")
            return false;
        }

        if(request.deadline.trim().length == 0) {
            alert("Campo deadline está vazio")
            return false;
        } else {
            const deadlineDate = new Date(request.deadline);
            const currentDate = new Date();

            if (deadlineDate <= currentDate) {
                alert("A data limite deve ser posterior à data atual");
                return false;
            }
        }

        return true;
    }

}
