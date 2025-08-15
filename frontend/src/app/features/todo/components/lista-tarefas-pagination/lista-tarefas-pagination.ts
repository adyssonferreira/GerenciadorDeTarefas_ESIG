import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Paginator, PaginatorState} from 'primeng/paginator';
import Page from '../../../../shared/types/Page';
import Tarefa from '../../../../core/models/Tarefa';

@Component({
  selector: 'app-lista-tarefas-pagination',
    imports: [
        Paginator
    ],
  templateUrl: './lista-tarefas-pagination.html',
  styleUrl: './lista-tarefas-pagination.scss'
})
export class ListaTarefasPagination {
    first = 0;
    rows = 10;

    @Input() pageData!: Page<Tarefa>;
    @Output() paginate = new EventEmitter<PaginatorState>();

    onPageChange(event: PaginatorState) {
        this.paginate.emit(event);
    }
}
