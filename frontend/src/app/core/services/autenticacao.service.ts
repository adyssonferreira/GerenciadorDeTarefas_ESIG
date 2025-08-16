import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import AcessoToken from '../models/AccessToken';
import {HttpClient} from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class AutenticacaoService {
    private readonly TOKEN_KEY = 'app.token';

    private readonly baseUrl = 'http://localhost:8080/api/v1/auth';

    constructor(private http: HttpClient) {
    }

    gerarToken(usernameOrEmail: string, senha: string): Observable<AcessoToken> {
        return this.http.post<AcessoToken>(`${this.baseUrl}/login`, {usernameOrEmail, senha});
    }

    setAccessToken(acessoToken: AcessoToken): void {
        localStorage.setItem(this.TOKEN_KEY, JSON.stringify(acessoToken));
    }

    getAccessToken(): AcessoToken | null {
        const stringAccess = localStorage.getItem(this.TOKEN_KEY);

        if (!stringAccess) return null;

        return JSON.parse(stringAccess) as AcessoToken;
    }

    limparAccessToken() {
        localStorage.removeItem(this.TOKEN_KEY);
    }

    isAuthenticado(): boolean {
        return !!this.getAccessToken() && !this.isTokenExpirado(this.getAccessToken()!.expiraEm);
    }

    private isTokenExpirado(datestring: string): boolean {
        const expiracao = new Date(datestring).getTime();
        const agora = new Date().getTime();
        return agora > expiracao;
    }
}
