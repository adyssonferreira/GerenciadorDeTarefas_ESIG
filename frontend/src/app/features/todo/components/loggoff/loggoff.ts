import {Component, inject} from '@angular/core';
import {Button} from 'primeng/button';
import {Router} from '@angular/router';
import {AutenticacaoService} from '../../../../core/services/autenticacao.service';

@Component({
  selector: 'app-loggoff',
    imports: [
        Button
    ],
  templateUrl: './loggoff.html',
  styleUrl: './loggoff.scss'
})
export class Loggoff {

    private router =inject(Router)
    private autenticacaoService = inject(AutenticacaoService);

    logoff() {
        this.autenticacaoService.limparAccessToken();
        this.router.navigate(['/login']);
    }
}
