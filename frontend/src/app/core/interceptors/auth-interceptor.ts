import {inject} from '@angular/core';
import { HttpInterceptorFn } from '@angular/common/http';
import {AutenticacaoService} from '../services/autenticacao.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const autencticacaoService = inject(AutenticacaoService);
  const token = autencticacaoService.getAccessToken()?.token;

  if(!token) {
    return next(req);
  }

  const authReq = req.clone( {
    setHeaders: {
      Authorization: `Bearer ${token}`
    }
  })

    return next(authReq);
};
