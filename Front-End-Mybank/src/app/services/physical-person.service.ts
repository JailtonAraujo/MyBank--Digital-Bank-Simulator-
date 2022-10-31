import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class PhysicalPersonService {

  urlBaseApiPhysicalPerson = `${environment.UrlBaseApi}/physical-person`

  constructor(private http:HttpClient) { }

  public verifyIfExistsCpf(CPF:String){
    return this.http.post(`${this.urlBaseApiPhysicalPerson}/verifyifexistscpf`,{cpf:CPF});
  }
}
