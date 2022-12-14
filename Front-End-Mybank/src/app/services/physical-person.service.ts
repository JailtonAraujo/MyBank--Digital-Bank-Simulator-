import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { SavingsAccount } from '../model/SavingsAccount';
import { PhysicalPerson } from '../model/PhysicalPerson';
import { Account } from '../model/Account';
import { Auth } from '../model/Auth';

@Injectable({
  providedIn: 'root'
})
export class PhysicalPersonService {

  urlBaseApiPhysicalPerson = `${environment.UrlBaseApi}/physical-person`

  constructor(private http:HttpClient) { }

  public verifyIfExistsCpf(CPF:String){
    return this.http.post(`${this.urlBaseApiPhysicalPerson}/verifyifexistscpf`,{cpf:CPF});
  }

  public createdNewSavingsAccount(physicalPerson:PhysicalPerson){
    return this.http.post<Auth>(`${this.urlBaseApiPhysicalPerson}/savings-account`,physicalPerson);
  }

  public findPersonByName(name:string){
     return this.http.get<Array<any>>(`${this.urlBaseApiPhysicalPerson}/name/${name}`); 
  }

  public findPersonByid(id:string){
    return this.http.get<PhysicalPerson>(`${this.urlBaseApiPhysicalPerson}/${id}`);
  }

  public findPersonByAccount(account:Account){
      return this.http.post<PhysicalPerson>(`${this.urlBaseApiPhysicalPerson}/find/account`,account);
  }

}
