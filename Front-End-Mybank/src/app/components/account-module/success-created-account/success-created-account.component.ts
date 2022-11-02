import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { SavingsAccount } from 'src/app/model/SavingsAccount';
import { LoadingService } from 'src/app/services/loading.service';
import { SavingsAccountService } from 'src/app/services/savings-account.service';
import { ReportDialogComponent } from '../../report-dialog/report-dialog.component';

@Component({
  selector: 'app-success-created-account',
  templateUrl: './success-created-account.component.html',
  styleUrls: ['./success-created-account.component.sass']
})
export class SuccessCreatedAccountComponent implements OnInit {

  account!:SavingsAccount;

  constructor(
    private savingsAccountService:SavingsAccountService,
    private router:Router,
    private dialog:MatDialog,
    private loadingService:LoadingService) { }

  ngOnInit(): void {

    this.account = this.savingsAccountService.getAccountModel();
    if(!this.account){
      this.router.navigate(['']);
    }
  }

  public openDialog(dataReport:String) {
    const dialogRef = this.dialog.open(ReportDialogComponent,{
      data:dataReport
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  public printCreateAccountCertificate(){

    this.loadingService.isLoading(true);

    this.savingsAccountService.printCreatedAccountCertificate(Number(this.account.id)).subscribe((resp)=>{
      this.openDialog(resp);
      this.loadingService.isLoading(false);
    
    });
  }

}
