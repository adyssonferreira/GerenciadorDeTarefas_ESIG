import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import Tarefa, {TarefaRequest} from '../models/Tarefa';
import Page, {PageParams} from '../../shared/types/Page';
import BuscaFiltro from '../models/BuscaFiltro';
import Service from './service';

@Injectable({
    providedIn: 'root'
})
export class TarefaService extends Service {
    private readonly baseUrl = `${this.baseApiUrl}/tarefas`;

    constructor() {
        super();
    }

    atualizarTarefa(tarefaId: string, tarefa: TarefaRequest): Observable<Tarefa> {
        return this.http.put<Tarefa>(`${this.baseUrl}/${tarefaId}`, tarefa);
    }

    buscarPorFiltro(filtro: BuscaFiltro, pagina: PageParams): Observable<Page<Tarefa>> {
        return this.http.get<Page<Tarefa>>(`${this.baseUrl}/busca`, {
            params: {
                ...(filtro.numero ? {id: filtro.numero} : {}),
                ...(filtro.termo ? {termo: filtro.termo} : {}),
                ...(filtro.prioridade && filtro.prioridade != "TODAS" ? {prioridade: filtro.prioridade} : {}),
                ...(filtro.responsavelId ? {responsavelId: filtro.responsavelId} : {}),
                ...(filtro.situacao && filtro.situacao != "TODAS" ? {status: filtro.situacao} : {}),
                ...pagina
            }
        });
    }

    excluirTarefa(tarefaId: string): Observable<void> {
        return this.http.delete<void>(`${this.baseUrl}/${tarefaId}`);
    }

    concluirTarefa(tarefaId: string): Observable<Tarefa> {
        return this.http.put<Tarefa>(`${this.baseUrl}/${tarefaId}/concluir`, {});
    }

    criarTarefa(tarefa: TarefaRequest): Observable<Tarefa> {
        return this.http.post<Tarefa>(this.baseUrl, tarefa);
    }
}
