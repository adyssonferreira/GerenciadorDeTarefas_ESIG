import {Component, EventEmitter, inject, Input, OnInit, Output, signal} from '@angular/core';
import Tarefa, {TarefaRequest} from '../../../../core/models/Tarefa';
import {Dialog} from 'primeng/dialog';
import {FormBuilder, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {InputText} from 'primeng/inputtext';
import {Textarea} from 'primeng/textarea';
import {UsuarioService} from '../../../../core/services/usuario.service';
import Option from '../../../../shared/types/Option';
import {Select} from 'primeng/select';
import { DatePickerModule } from 'primeng/datepicker';

import {Button} from 'primeng/button';
import {TarefaService} from '../../../../core/services/tarefa.service';

import Prioridade from '../../../../core/enums/Prioridade';
import {finalize} from 'rxjs';

@Component({
    selector: 'app-tarefa-edicao',
    imports: [
        Dialog,
        ReactiveFormsModule,
        InputText,
        Textarea,
        Select,
        DatePickerModule,
        Button,
    ],
    templateUrl: './tarefa-edicao.html',
    styleUrl: './tarefa-edicao.scss'
})
export class TarefaEdicao implements OnInit {
    @Input() visible: boolean = false;
    @Input() tarefa: Tarefa | null = null;

    private tarefaService = inject(TarefaService);
    private usuarioService = inject(UsuarioService);

    @Output() onFecharDialog = new EventEmitter<void>();
    @Output() onItemSalvo = new EventEmitter<boolean>(true);

    protected readonly usuarios = signal<Option[]>([]);
    protected readonly loadingEdicao = signal(false);

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

        this.tarefaForm.patchValue({
            ...this.tarefa,
            prioridade: this.prioridades.find(prioridade => prioridade.value === this.tarefa?.prioridade) ?? null,
            deadline: new Date(this.tarefa!.deadline)
        });
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
        this.loadingEdicao.set(true);
        const formData = this.tarefaForm.value;

        const request: TarefaRequest = {
            titulo: formData.titulo,
            descricao: formData.descricao,
            deadline: formData.deadline?.toISOString() ?? "",
            status: formData.situacao,
            prioridade: formData.prioridade.value,
            responsavelId: formData.responsavel.value
        }

        this.tarefaService.atualizarTarefa(this.tarefa!.id, request)
            .pipe(
                finalize(() => {
                    this.loadingEdicao.set(false);
                })
            )
            .subscribe({
                next: (_) => {
                    this.onItemSalvo.emit(true);
                },

                error: (error) => {
                    console.error('Erro ao atualizar tarefa:', error);
                    this.onItemSalvo.emit(false);
                },
        })
    }
}
