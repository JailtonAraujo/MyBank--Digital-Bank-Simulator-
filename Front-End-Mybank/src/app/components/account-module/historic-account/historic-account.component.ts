import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Auth } from 'src/app/model/Auth';
import { ObjectPagination } from 'src/app/model/ObjectPagination';
import { HistoricService } from 'src/app/services/historic.service';
import { LoadingService } from 'src/app/services/loading.service';


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

  constructor(private historicService:HistoricService,
    private authReducer:Store<{authReducer:Auth}>,
    private loadingService:LoadingService) { }

  ngOnInit(): void {

  

    this.authReducer.subscribe((val)=>{
      this.getAllHistoricByAccountId(Number(val.authReducer.accountId));
     
    })
  }


  public getAllHistoricByAccountId(accountId:number){

    const objectPagination:ObjectPagination ={
      accountId:accountId,
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

    this.loadingService.isLoading(true);


    this.historicService.getAllSWithdrawHistoricByAccountId(objectPagination).subscribe((res)=>{
      this.elements_saque = res.content;
      this.totalItens_saque = res.totalElements;

      this.loadingService.isLoading(false);

    },error=>{
      this.loadingService.isLoading(false);
    })
  }


  public nextPageTblTransfer(offset:any){

    const objectPagination:ObjectPagination ={
      accountId:1,
      offset:(offset.pageIndex*10),
      limit:10
    }

    this.loadingService.isLoading(true);

    this.historicService.getAllTransferHistoricByAccountId(objectPagination).subscribe((res)=>{
      this.elemenst_transfer = res.content;
      this.totalItens_transfer = res.totalElements;
      
      this.loadingService.isLoading(false);

    })
  }

}
