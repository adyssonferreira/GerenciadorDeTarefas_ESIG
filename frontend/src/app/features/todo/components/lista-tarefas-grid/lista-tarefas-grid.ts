import {Component, EventEmitter, inject, Inject, Input, Output, signal} from '@angular/core';
import Tarefa from '../../../../core/models/Tarefa';
import {JsonPipe} from '@angular/common';
import {ListaTarefasPrioridadeTag} from '../lista-tarefas-prioridade-tag/lista-tarefas-prioridade-tag';
import {Button} from 'primeng/button';
import {Tooltip} from 'primeng/tooltip';
import {TarefaVisualizacao} from '../tarefa-visualizacao/tarefa-visualizacao';
import ModoAcao from '../../../../shared/types/ModoAcao';
import {TarefaEdicao} from '../tarefa-edicao/tarefa-edicao';
import {Toast} from 'primeng/toast';
import {MessageService} from 'primeng/api';
import {TarefaExclusao} from '../tarefa-exclusao/tarefa-exclusao';
import {TarefaService} from '../../../../core/services/tarefa.service';

@Component({
  selector: 'app-lista-tarefas-grid',
    imports: [
        ListaTarefasPrioridadeTag,
        Button,
        Tooltip,
        TarefaVisualizacao,
        TarefaEdicao,
        Toast,
        TarefaExclusao
    ],
    providers: [MessageService],
    templateUrl: './lista-tarefas-grid.html',
  styleUrl: './lista-tarefas-grid.scss'
})
export class ListaTarefasGrid {
    protected readonly ModoAcao = ModoAcao;
    @Input() tarefas: Tarefa[] = []
    @Output() atualizarGrid = new EventEmitter<void>();

    private tarefaService = inject(TarefaService);

    protected readonly modoAcao = signal<ModoAcao>(ModoAcao.IDLE);
    protected readonly tarefaSelecionada = signal<Tarefa | null>(null);

    constructor(private messageService: MessageService) {}

    setModoAcao(modo: ModoAcao, tarefa: Tarefa | null = null) {
        this.modoAcao.set(modo);
        this.tarefaSelecionada.set(tarefa);
    }



    concluirTarefa(tarefa: Tarefa) {
        this.tarefaService.concluirTarefa(tarefa.id).subscribe({
            next: () => {
                this.atualizarGrid.emit();
                this.messageService.add({
                    severity: 'success',
                    summary: 'Sucesso',
                    detail: 'Tarefa concluída com sucesso'
                });
            },

            error: (error) => {
                console.error('Erro ao concluir tarefa:', error);
                this.messageService.add({
                    severity: 'error',
                    summary: 'Erro ao concluir tarefa',
                    detail: 'Erro ao concluir tarefa'
                });

            }
        })
    }

    onItemSalvo(event: boolean) {
        if (event) {
            this.atualizarGrid.emit();
            this.messageService.add({severity: 'success', summary: 'Sucesso', detail: 'Tarefa salva com sucesso'});
            this.setModoAcao(ModoAcao.IDLE);
        } else
            this.messageService.add({
                severity: 'error',
                summary: 'Erro ao salvar tarefa',
                detail: 'Erro ao salvar tarefa'
            });

    }

    onItemExcluido(event: boolean){
        if (event) {
            this.atualizarGrid.emit();
            this.messageService.add({severity: 'success', summary: 'Sucesso', detail: 'Tarefa excluída com sucesso'});
            this.setModoAcao(ModoAcao.IDLE);
        } else
            this.messageService.add({
                severity: 'error',
                summary: 'Erro ao excluir tarefa',
                detail: 'Erro ao excluir tarefa'
            });
    }
}
