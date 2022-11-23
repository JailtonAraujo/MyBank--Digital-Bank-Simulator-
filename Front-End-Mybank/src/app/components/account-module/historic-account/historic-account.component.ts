import { Component, OnInit } from '@angular/core';
import { ObjectPagination } from 'src/app/model/ObjectPagination';
import { HistoricService } from 'src/app/services/historic.service';


@Component({
  selector: 'app-historic-account',
  templateUrl: './historic-account.component.html',
  styleUrls: ['./historic-account.component.sass']
})

export class HistoricAccountComponent implements OnInit {

  displayedColumns_transfer: string[] = ['id', 'namePersonOrigem', 'namePersonDestino', 'value','date'];
  displayedColumns_saque: string[] = ['id', 'value', 'date'];

  totalItens_saque:number = 0;
  totalItens_transfer:number = 0;

  elemenst_transfer=[];
  elements_saque=[];

  constructor(private historicService:HistoricService) { }

  ngOnInit(): void {
    this.getAllWithdrawHistoricByAccountId();
  }


  public getAllWithdrawHistoricByAccountId(){

    const objectPagination:ObjectPagination ={
      accountId:1,
      offset:0,
      limit:10
    }
    
    this.historicService.getAllSWithdrawHistoricByAccountId(objectPagination).subscribe((res)=>{
      
      this.elements_saque = res.content;
      this.totalItens_saque = res.totalElements;

    })

    this.historicService.getAllTransferHistoricByAccountId(objectPagination).subscribe((res)=>{

      this.elemenst_transfer = res.content;
      this.totalItens_transfer=res.totalElements;

    })
  } 

  public nextPageTblSaque(offset:any){

    const objectPagination:ObjectPagination ={
      accountId:1,
      offset:(offset.pageIndex*10),
      limit:10
    }

    this.historicService.getAllSWithdrawHistoricByAccountId(objectPagination).subscribe((res)=>{
      this.elements_saque = res.content;
      this.totalItens_saque = res.totalElements;
    })
  }


  public nextPageTblTransfer(offset:any){

    const objectPagination:ObjectPagination ={
      accountId:1,
      offset:(offset.pageIndex*10),
      limit:10
    }

    this.historicService.getAllTransferHistoricByAccountId(objectPagination).subscribe((res)=>{
      this.elemenst_transfer = res.content;
      this.totalItens_transfer = res.totalElements;
    })
  }

}
