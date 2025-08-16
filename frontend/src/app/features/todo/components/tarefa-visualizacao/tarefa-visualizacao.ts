import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Dialog} from 'primeng/dialog';
import Tarefa from '../../../../core/models/Tarefa';
import {DatePipe} from '@angular/common';
import {Tooltip} from 'primeng/tooltip';
import {ListaTarefasPrioridadeTag} from '../lista-tarefas-prioridade-tag/lista-tarefas-prioridade-tag';

@Component({
  selector: 'app-tarefa-visualizacao',
    imports: [
        Dialog,
        DatePipe,
        Tooltip,
        ListaTarefasPrioridadeTag
    ],
  templateUrl: './tarefa-visualizacao.html',
  styleUrl: './tarefa-visualizacao.scss'
})
export class TarefaVisualizacao {
    @Input() visible: boolean = false;
    @Input() tarefa: Tarefa | null = null;

    @Output() onFecharDialog = new EventEmitter<void>();

    onVisibleChange(event: boolean){
        if(!event) {
            this.onFecharDialog.emit();
        }
    }
}
