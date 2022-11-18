import { Component, OnInit } from '@angular/core';
import { HistoricService } from 'src/app/services/historic.service';

const ELEMENT_DATA_trans: any[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
];

const ELEMENT_DATA_saque: any[] = [
  { name: 'Hydrogen', Value: 1.0079, data: '12/02/1998'},
  { name: 'Helium', Value: 4.0026, data: '12/02/1998'},
  { name: 'Lithium', Value: 6.941, data: '12/02/1998'},
  { name: 'Beryllium', Value: 9.0122, data: '12/02/1998'},
  { name: 'Boron', Value: 10.811, data: '12/02/1998'},
  { name: 'Carbon', Value: 12.0107, data: '12/02/1998'},
  { name: 'Nitrogen', Value: 14.0067, data: '12/02/1998'},
  { name: 'Oxygen', Value: 15.9994, data: '12/02/1998'},
  { name: 'Fluorine', Value: 18.9984, data: '12/02/1998'},
  { name: 'Neon', Value: 20.1797, data: '12/02/1998'},
];

@Component({
  selector: 'app-historic-account',
  templateUrl: './historic-account.component.html',
  styleUrls: ['./historic-account.component.sass']
})

export class HistoricAccountComponent implements OnInit {

  constructor(private historicService:HistoricService) { }

  ngOnInit(): void {
  }

  displayedColumns_trans: string[] = ['name', 'weight', 'symbol', 'position'];
  displayedColumns_saldo: string[] = ['name', 'Value', 'data'];

  elemenst = ELEMENT_DATA_trans;
  elements_saldo = ELEMENT_DATA_saque;

  public evttest(event:any){
    const tabPosition = event.index;

    tabPosition == 0 ? console.log("Entrada") : console.log("saida") 
  }

  public getAllWithdrawHistoricByAccountId(){
    
  } 

}
