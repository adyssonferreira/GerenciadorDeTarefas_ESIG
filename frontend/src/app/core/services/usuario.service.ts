import Service from './service';
import { Observable } from 'rxjs';
import Usuario from '../models/Usuario';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService extends Service {
  private readonly baseUrl = `${this.baseApiUrl}/usuarios`;

  constructor() {
    super();
  }

  buscarTodos(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(this.baseUrl);
  }
}
