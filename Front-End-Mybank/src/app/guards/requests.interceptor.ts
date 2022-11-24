import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { catchError, Observable } from 'rxjs';

@Injectable()
export class RequestsInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    let tempUris = request.url.split("/");

    const currentUri = tempUris[(tempUris.length-1)];

    const urisAuthorizeds = ["login","exists"];

    if(currentUri.includes(urisAuthorizeds[0]) || currentUri.includes(urisAuthorizeds[1])){
      return next.handle(request);
    }

    if(localStorage.getItem('authMyBank') !== null || localStorage.getItem('authMyBank') !== '')  {

      const token = JSON.parse(String(localStorage.getItem('authMyBank'))).token;

      request = request.clone({
        setHeaders: {'Authorization':token}
      })

    }

    return next.handle(request);
  }

}
