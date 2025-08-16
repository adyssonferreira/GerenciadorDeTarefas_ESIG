import {Component, EventEmitter, inject, Input, Output, signal} from '@angular/core';
import {Button} from "primeng/button";
import {Dialog} from "primeng/dialog";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import Tarefa from '../../../../core/models/Tarefa';
import {TarefaService} from '../../../../core/services/tarefa.service';
import {MessageService} from 'primeng/api';
import {finalize} from 'rxjs';

@Component({
    selector: 'app-tarefa-exclusao',
    imports: [
        Button,
        Dialog,
        FormsModule,
        ReactiveFormsModule,
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

    excluirTarefa() {
        this.loadingExclusao.set(true);
        this.tarefaService.excluirTarefa(this.tarefa!.id)
            .pipe(
                finalize(() => {
                    this.loadingExclusao.set(false);
                })
            )
            .subscribe({
                next: (_tarefa) => {
                    this.onItemExcluido.emit(true);
                },
                error: (error) => {
                    console.error('Erro ao excluir tarefa:', error);
                    this.onItemExcluido.emit(false);
                }
            });
    }

    fecharDialog() {
        this.onFecharDialog.emit();
    }
}
