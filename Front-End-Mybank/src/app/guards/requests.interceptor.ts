import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';
import { MessageService } from '../services/message.service';

import {catchError, Observable, throwError} from 'rxjs';
@Injectable()
export class RequestsInterceptor implements HttpInterceptor {

  constructor() {}

  //Urls that not needs authentication token 
  urlauthorized = ["savings-account/exists","physical-person/verifyifexistscpf",
  "physical-person/savings-account","certificate/create/","login"];

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const urlBase= environment.UrlBaseApi+"/";

    const urlForVerify = urlBase+request.url.split(urlBase)[1];

    if(urlForVerify.includes(urlBase+this.urlauthorized[0]) || urlForVerify.includes(urlBase+this.urlauthorized[1]) 
    || urlForVerify.includes(urlBase+this.urlauthorized[2]) || urlForVerify.includes(urlBase+this.urlauthorized[3])
    || urlForVerify.includes(urlBase+this.urlauthorized[4])){
      return next.handle(request).pipe(catchError(this.handlerError));
    }

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
      console.log("Acesso negado ou sessão expirada, faça login!");
      localStorage.clear();
    } else if(error.status == 500){
      errorMsg = "Erro interno, por favor, tente mais tarde";
    }else{
      console.log(error.error);
    return throwError(error);
    }

    console.log(errorMsg);
    return throwError(error);
  }
}
