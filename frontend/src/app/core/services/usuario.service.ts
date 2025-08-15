import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import Usuario from '../models/Usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private readonly baseUrl = 'http://localhost:8080/api/v1/usuarios';

  constructor(private http: HttpClient) {}

  buscarTodos(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(this.baseUrl);
  }
}
