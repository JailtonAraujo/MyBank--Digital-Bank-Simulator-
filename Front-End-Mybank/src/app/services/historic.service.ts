import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { HttpClient } from '@angular/common/http';
import { Withdraw } from '../model/Withdraw';
@Injectable({
  providedIn: 'root'
})
export class HistoricService {

  private urlBaseApiHistoric = `${environment.UrlBaseApi}/historic`;

  constructor(private http:HttpClient) { }


  public getAllSWithdrawHistoricByAccountId(accountId:number){
    this.http.get<Array<Withdraw>>(`${this.urlBaseApiHistoric}/withdraw/${accountId}`);
  }
}
