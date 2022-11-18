import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
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
