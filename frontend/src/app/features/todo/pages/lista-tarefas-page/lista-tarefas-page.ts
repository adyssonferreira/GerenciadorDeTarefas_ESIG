import {Component, computed, inject, OnInit, signal} from '@angular/core';
import Tarefa from '../../../../core/models/Tarefa';
import BuscaFiltro, {getIntialBuscaFiltro} from '../../../../core/models/BuscaFiltro';
import {ListaTarefasCampos} from '../../components/lista-tarefas-campos/lista-tarefas-campos';
import {ListaTarefasGrid} from '../../components/lista-tarefas-grid/lista-tarefas-grid';
import {TarefaService} from '../../../../core/services/tarefa.service';
import Page, {getInitialPage, PageParams} from '../../../../shared/types/Page';
import {ListaTarefasPagination} from '../../components/lista-tarefas-pagination/lista-tarefas-pagination';
import {PaginatorState} from 'primeng/paginator';
import {JsonPipe} from '@angular/common';
import Situacao from '../../../../core/enums/Situacao';

@Component({
    selector: 'app-lista-tarefas-page',
    imports: [
        ListaTarefasCampos,
        ListaTarefasGrid,
        ListaTarefasPagination,
        JsonPipe
    ],
    templateUrl: './lista-tarefas-page.html',
    styleUrl: './lista-tarefas-page.scss'
})
export class ListaTarefasPage implements OnInit {
    private tarefaService = inject(TarefaService);

    protected readonly page = signal<Page<Tarefa>>(getInitialPage<Tarefa>())
    protected tarefas = computed(() => this.page().items ?? []);
    protected readonly filtro = signal<BuscaFiltro>(getIntialBuscaFiltro());

    ngOnInit() {
        this.buscarTarefas(this.filtro());
    }

    buscarTarefas(newFiltro: BuscaFiltro, newPageParams?: PageParams) {
        const self = this;

        debugger

        if(!newFiltro.situacao) {
            newFiltro.situacao = Situacao.ABERTA;
        }

        this.filtro.set(newFiltro);

        const paginaParams = newPageParams ?? {page: 0, size: this.page().size}

        this.tarefaService.buscarPorFiltro(this.filtro(), paginaParams).subscribe({
            next: (currentPage: Page<Tarefa>) => {
                self.page.set(currentPage);
            },
            error: (error: any) => {
                console.error('Erro ao buscar usuários:', error);
            }
        })
    }

    atualizarPagina(event: PaginatorState) {
        const paginaParams = {
            page: event.page,
            size: event.rows
        } as PageParams;

        this.buscarTarefas(this.filtro(), paginaParams);
    }

    atualizarPaginaAtual() {
        const paginaParams = {
            page: this.page().number,
            size: this.page().size,
        } as PageParams;

        this.buscarTarefas(this.filtro(), paginaParams);
    }
}
