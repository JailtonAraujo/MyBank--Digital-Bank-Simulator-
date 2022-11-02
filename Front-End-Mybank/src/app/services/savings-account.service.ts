import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { SavingsAccount } from '../model/SavingsAccount';

@Injectable({
  providedIn: 'root'
})
export class SavingsAccountService {

  UrlBaseApi = `${environment.UrlBaseApi}/savings-account`;

  private AccountModel!:SavingsAccount;

  constructor(private http:HttpClient) { }


  public printCreatedAccountCertificate(id:number):Observable<any>{
    return this.http.get(`${this.UrlBaseApi}/certificate-creted/${id}`,{responseType:'text'});
  }


  public setAccountModel(accountModel:SavingsAccount){
    this.AccountModel = accountModel;
  }

  public getAccountModel (){
    return this.AccountModel;
  }
  
}
