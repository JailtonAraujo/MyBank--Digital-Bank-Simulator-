import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';

import {catchError, Observable, throwError} from 'rxjs';
@Injectable()
export class RequestsInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    let tempUris = request.url.split("/");

    const currentUri = tempUris[(tempUris.length-1)];

    if(localStorage.getItem('authMyBank') !== null && localStorage.getItem('authMyBank') !== '')  {

      const token = JSON.parse(String(localStorage.getItem('authMyBank'))).token;

      if(token){
        request = request.clone({
          setHeaders: {'Authorization':token}
        })
      }

    }

    return next.handle(request).pipe(catchError(this.handlerError))

  }

  handlerError(error: HttpErrorResponse){
    let errorMsg = '';
    if(error.status == 403){
      errorMsg = "Acesso negado ou sessão expirada, faça login!";
    } else if(error.status == 500){
      errorMsg = "Erro interno, por favor, tente mais tarde";
    }else{
      console.log(error.error);
    return throwError(error);
    }

    console.log(errorMsg);
    return throwError(errorMsg);
  }
}
