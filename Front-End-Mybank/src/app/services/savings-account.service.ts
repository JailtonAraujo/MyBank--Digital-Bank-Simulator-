import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { SavingsAccount } from '../model/SavingsAccount';
import { TranferModel } from '../model/TransferModel';
import { Withdraw } from '../model/Withdraw';

@Injectable({
  providedIn: 'root'
})
export class SavingsAccountService {

  UrlBaseApiSavingsAccount = `${environment.UrlBaseApi}/savings-account`;

  private AccountModel!:SavingsAccount;

  constructor(private http:HttpClient) { }


  public printCreatedAccountCertificate(id:number){
    return this.http.get(`${this.UrlBaseApiSavingsAccount}/certificate/creted/${id}`,{responseType:'text'});
  }

  public printWithdrawOperationCertificate(id:number){
    return this.http.get(`${this.UrlBaseApiSavingsAccount}/certificate/withdraw/${id}`,{responseType:'text'});
  }

  public printTransferCertificate(id:number){
    return this.http.get(`${this.UrlBaseApiSavingsAccount}/certificate/transfer/${id}`,{responseType:'text'});
  }

  public verifyIfExistsSavingsAccount(account:SavingsAccount){
    return this.http.post(`${this.UrlBaseApiSavingsAccount}/exists`,account);
  }

  public withDrawMoney(withdraw:Withdraw){
    return this.http.post<Withdraw>(`${this.UrlBaseApiSavingsAccount}/operation/withdraw`,withdraw);
  }

  public transfer(transer:TranferModel){
    return this.http.post<TranferModel>(`${this.UrlBaseApiSavingsAccount}/operation/transfer`,transer);
  }

  //Get and Sets
  public setAccountModel(accountModel:SavingsAccount){
    this.AccountModel = accountModel;
  }

  public getAccountModel (){
    return this.AccountModel;
  }
  
}
