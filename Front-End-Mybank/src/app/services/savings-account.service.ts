import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { SavingsAccount } from '../model/SavingsAccount';

@Injectable({
  providedIn: 'root'
})
export class SavingsAccountService {

  UrlBaseApi = `${environment.UrlBaseApi}/physical-account`;

  private AccountModel!:SavingsAccount;

  constructor(private http:HttpClient) { }

  public setAccountModel(accountModel:SavingsAccount){
    this.AccountModel = accountModel;
  }

  public getAccountModel (){
    return this.AccountModel;
  }
  
}
