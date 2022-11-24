import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { HttpClient } from '@angular/common/http';
import { Auth } from '../model/Auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http:HttpClient) { }

  urlBaseApi = `${environment.UrlBaseApi}/login`

  //
  public login (auth:any){
    return this.http.post<Auth>(`${this.urlBaseApi}`,auth).pipe();
  }

  public logout(){
    localStorage.clear();
  }
}
