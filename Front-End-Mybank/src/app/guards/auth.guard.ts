import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { MessageService } from '../services/message.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private messageService:MessageService,
    private router:Router
    ){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

      if(localStorage.getItem('authMyBank') != null){
        console.log(  JSON.parse( String(localStorage.getItem('authMyBank'))) );
        return true;
      }

    this.messageService.addMessage('Por favor, faça login!','error');
    this.router.navigate(['/']);
    return false;
  }
  
}
