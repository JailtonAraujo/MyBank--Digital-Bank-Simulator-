import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { SavingsAccount } from '../model/SavingsAccount';
import { Withdraw } from '../model/Withdraw';

@Injectable({
  providedIn: 'root'
})
export class SavingsAccountService {

  UrlBaseApi = `${environment.UrlBaseApi}/savings-account`;

  private AccountModel!:SavingsAccount;

  constructor(private http:HttpClient) { }


  public printCreatedAccountCertificate(id:number){
    return this.http.get(`${this.UrlBaseApi}/certificate/creted/${id}`,{responseType:'text'});
  }

  public printWithdrawOperationCertificate(id:number){
    return this.http.get(`${this.UrlBaseApi}/certificate/withdraw/${id}`,{responseType:'text'});
  }

  public verifyIfExistsSavingsAccount(account:SavingsAccount){
    return this.http.post(`${this.UrlBaseApi}/exists`,account);
  }

  public withDrawMoney(withdraw:Withdraw){
    return this.http.post<Withdraw>(`${this.UrlBaseApi}/operation/withdraw`,withdraw);
  }

  public setAccountModel(accountModel:SavingsAccount){
    this.AccountModel = accountModel;
  }

  public getAccountModel (){
    return this.AccountModel;
  }
  
}
