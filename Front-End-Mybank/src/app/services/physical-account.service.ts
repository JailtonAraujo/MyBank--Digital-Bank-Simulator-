import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class PhysicalAccountService {

  UrlBaseApi = `${environment.UrlBaseApi}/physical-account`;

  constructor(private http:HttpClient) { }


  
}
