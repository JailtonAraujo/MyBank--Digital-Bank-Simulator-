import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Withdraw } from 'src/app/model/Withdraw';
import { ReportDialogComponent } from 'src/app/components/report-dialog/report-dialog.component';
import { SavingsAccountService } from 'src/app/services/savings-account.service';
import { LoadingService } from 'src/app/services/loading.service';

@Component({
  selector: 'app-withdraw-success',
  templateUrl: './withdraw-success.component.html',
  styleUrls: ['./withdraw-success.component.sass']
})
export class WithdrawSuccessComponent implements OnInit {

  withdraw!:Withdraw;

  constructor( 
    @Inject(MAT_DIALOG_DATA) public data:Withdraw,
    private dialog:MatDialog,
    private savingsAccountService:SavingsAccountService,
    private loadingService:LoadingService) { }

  ngOnInit(): void {
    this.withdraw = this.data;
  }


  public printWithdrawOperationCertificate(){
    this.loadingService.isLoading(true);
    this.savingsAccountService.printWithdrawOperationCertificate(Number(this.withdraw.id)).subscribe((resp)=>{
      this.openReportDialodWithCertificate(resp);
      this.loadingService.isLoading(false);
    })
  }


  public openReportDialodWithCertificate(report:String){
    const dialogRef = this.dialog.open(ReportDialogComponent,{
      data:report
    });
  }

}
