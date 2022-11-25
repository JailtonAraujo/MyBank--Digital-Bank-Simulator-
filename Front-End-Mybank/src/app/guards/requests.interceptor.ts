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
    if (error.error instanceof ErrorEvent) {
       console.log('This is client side error');
       errorMsg = `Error: ${error.error.message}`;
    } else {
       console.log('This is server side error');
       errorMsg = `Error Code: ${error.status},  Message: ${error.message}`;
    }
    if(error.status == 403){
      errorMsg = "Acesso negado ou sessão expirada, faça login!";
    } else if(error.status == 500){
      errorMsg = "Erro interno, por favor, tente mais tarde!";
    }

    console.log(errorMsg);
    return throwError(errorMsg);
  }
}
