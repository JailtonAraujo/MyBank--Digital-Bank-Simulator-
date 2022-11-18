import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class CertificateService {

  private urlBaseApiCertificate = `${environment.UrlBaseApi}/certificate`;
  
  constructor(private http:HttpClient) { }


  
  public printCreatedAccountCertificate(id:number){
    return this.http.get(`${this.urlBaseApiCertificate}/create/${id}`,{responseType:'text'});
  }

  public printWithdrawOperationCertificate(id:number){
    return this.http.get(`${this.urlBaseApiCertificate}/withdraw/${id}`,{responseType:'text'});
  }

  public printTransferCertificate(id:number){
    return this.http.get(`${this.urlBaseApiCertificate}/transfer/${id}`,{responseType:'text'});
  }

}
