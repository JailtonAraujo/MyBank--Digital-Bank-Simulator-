import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { PhysicalPerson } from '../model/PhysicalPerson';

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
    return this.http.post(`${this.urlBaseApiPhysicalPerson}/savings-account`,physicalPerson);
  }
}
