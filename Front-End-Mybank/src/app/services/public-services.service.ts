import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PublicServicesService {

  constructor() { }

  // format date to type dd/mm/yyyy
  public formatDate(date:Date){
    const day = Number(date.getDay) < 10 ? '0'+date.getDay : date.getDate;
    const month = Number(date.getMonth) < 10 ? '0'+date.getMonth : date.getMonth;
    const year = date.getFullYear;

    return Date.parse(`${day}/${month}/${year}`);

  }
}
