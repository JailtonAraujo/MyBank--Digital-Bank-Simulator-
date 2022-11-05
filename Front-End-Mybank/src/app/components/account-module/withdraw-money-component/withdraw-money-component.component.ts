import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Account } from 'src/app/model/Account';
import { Withdraw } from 'src/app/model/Withdraw';
import { MessageService } from 'src/app/services/message.service';
import { SavingsAccountService } from 'src/app/services/savings-account.service';
import { MatDialog } from '@angular/material/dialog';
import { WithdrawSuccessComponent } from '../dialogs/withdraw-success/withdraw-success.component';

@Component({
  selector: 'app-withdraw-money-component',
  templateUrl: './withdraw-money-component.component.html',
  styleUrls: ['./withdraw-money-component.component.sass']
})
export class WithdrawMoneyComponentComponent implements OnInit {


  formWithdraw!:FormGroup;
  withdraw!:Withdraw;

  constructor(
    private messageService:MessageService,
    private savingsAccountService:SavingsAccountService,
    private dialog:MatDialog) { }

  ngOnInit(): void {
    this.formWithdraw = new FormGroup({
      value : new FormControl('',[Validators.required]),
      terms: new FormControl('', [Validators.required])
    })
  }

  public confirmWithdraw(){
    console.log(Number(this.formWithdraw.get('value')!.value))
    if(Number(this.formWithdraw.get('value')!.value) < 10){ 
      this.messageService.addMessage('O valor do saque presica ser no minimo R$ 10,00!','warning');
      return;
    }else if(Number(this.formWithdraw.get('value')!.value) > 1000){
      this.messageService.addMessage('O saldo atual e insulficiente para esta operação!','error');
      return;
    }

    this.withdraw= this.formWithdraw.value;
    let account  = new Account();
    account = {id:1}
    this.withdraw.account = account;
    
    this.savingsAccountService.withDrawMoney(this.withdraw).subscribe((resp)=>{
      this.openDialogWithdrawSuccess(resp);
    })
    
  }

  //OPen withdraw operation success for show informations
  openDialogWithdrawSuccess(withdraw:Withdraw){
    const dialogRef = this.dialog.open(WithdrawSuccessComponent,{
      data:withdraw
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

}
