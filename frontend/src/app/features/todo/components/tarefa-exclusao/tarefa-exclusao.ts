import {Component, EventEmitter, inject, Input, Output, signal} from '@angular/core';
import {Button} from "primeng/button";
import {DatePicker} from "primeng/datepicker";
import {Dialog} from "primeng/dialog";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {InputText} from "primeng/inputtext";
import {Select} from "primeng/select";
import {Textarea} from "primeng/textarea";
import {Toast} from "primeng/toast";
import Tarefa from '../../../../core/models/Tarefa';
import {TarefaService} from '../../../../core/services/tarefa.service';
import {MessageService} from 'primeng/api';

@Component({
    selector: 'app-tarefa-exclusao',
    imports: [
        Button,
        DatePicker,
        Dialog,
        FormsModule,
        InputText,
        ReactiveFormsModule,

        Toast
    ],
    providers: [MessageService],
    templateUrl: './tarefa-exclusao.html',
    styleUrl: './tarefa-exclusao.scss'
})
export class TarefaExclusao {
    @Input() visible: boolean = false;
    @Input() tarefa: Tarefa | null = null;
    private tarefaService = inject(TarefaService);

    @Output() onFecharDialog = new EventEmitter<void>();
    @Output() onItemExcluido = new EventEmitter<boolean>();

    protected readonly loadingExclusao = signal(false);

    onVisibleChange(event: boolean){
        if(!event) {
            this.onFecharDialog.emit();
        }
    }

    excluirTarefa(){
        this.loadingExclusao.set(true);
        this.tarefaService.excluirTarefa(this.tarefa!.id).subscribe({
            next: (_tarefa) => {
                this.loadingExclusao.set(false);
                this.onItemExcluido.emit(true);
            },
            error: (error) => {
                console.error('Erro ao excluir tarefa:', error);

                this.loadingExclusao.set(false);
                this.onItemExcluido.emit(false);
            }
        });
    }

    fecharDialog() {
        this.onFecharDialog.emit();
    }
}
