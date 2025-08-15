import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import Tarefa from '../models/Tarefa';
import Page, {PageParams} from '../../shared/types/Page';
import BuscaFiltro from '../models/BuscaFiltro';

@Injectable({
    providedIn: 'root'
})
export class TarefaService {
    private readonly baseUrl = 'http://localhost:8080/api/v1/tarefas';

    constructor(private http: HttpClient) {
    }

    buscarTodas(): Observable<Page<Tarefa>> {
        return this.http.get<Page<Tarefa>>(this.baseUrl);
    }

    buscarPorFiltro(filtro: BuscaFiltro, pagina: PageParams): Observable<Page<Tarefa>> {
        return this.http.get<Page<Tarefa>>(`${this.baseUrl}/busca`, {
            params: {
                ...(filtro.termo ? {termo: filtro.termo} : {}),
                ...(filtro.prioridade && filtro.prioridade != "T" ? {prioridade: filtro.prioridade} : {}),
                ...(filtro.responsavelId ? {responsavelId: filtro.responsavelId} : {}),
                ...(filtro.situacao ? {status: filtro.situacao} : {}),
                ...pagina
            }
        });
    }
}
