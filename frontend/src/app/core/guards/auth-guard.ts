import {CanActivateFn, Router} from '@angular/router';
import {inject} from '@angular/core';
import {AutenticacaoService} from '../services/autenticacao.service';

const authGuard: CanActivateFn = (route, state) => {

    const autenticacaoService = inject(AutenticacaoService);
    const router = inject(Router);

    if(autenticacaoService.isAuthenticado()) {
        return true;
    }

    return router.createUrlTree(['/login'], {
        queryParams: {
            returnUrl: router.url
        }
    });
};

export default authGuard;
