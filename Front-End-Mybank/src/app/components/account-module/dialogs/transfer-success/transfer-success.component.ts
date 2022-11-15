import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ReportDialogComponent } from 'src/app/components/report-dialog/report-dialog.component';
import { TranferModel } from 'src/app/model/TransferModel';
import { Withdraw } from 'src/app/model/Withdraw';
import { LoadingService } from 'src/app/services/loading.service';
import { SavingsAccountService } from 'src/app/services/savings-account.service';

@Component({
  selector: 'app-transfer-success',
  templateUrl: './transfer-success.component.html',
  styleUrls: ['./transfer-success.component.sass']
})
export class TransferSuccessComponent implements OnInit {

  transfer!:TranferModel;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data:TranferModel,
    private dialog:MatDialog,
    private savingsAccountService:SavingsAccountService,
    private loadingService:LoadingService
  ) { }

  ngOnInit(): void {
    this.transfer = this.data;
  }

  public printTranferCertificate(){

    this.loadingService.isLoading(true);

    this.savingsAccountService.printTransferCertificate(Number(this.transfer.id)).subscribe((res)=>{
      this.openReportDialodWithCertificate(res);
      this.loadingService.isLoading(false);
    })
  }

  public openReportDialodWithCertificate(report:String){
    const dialogRef = this.dialog.open(ReportDialogComponent,{
      data:report
    });
  }

}
