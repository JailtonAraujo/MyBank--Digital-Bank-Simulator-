import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Account } from 'src/app/model/Account';
import { Withdraw } from 'src/app/model/Withdraw';
import { MessageService } from 'src/app/services/message.service';
import { SavingsAccountService } from 'src/app/services/savings-account.service';
import { MatDialog } from '@angular/material/dialog';
import { WithdrawSuccessComponent } from '../../dialogs/withdraw-success/withdraw-success.component';

@Component({
  selector: 'app-withdraw-money-component',
  templateUrl: './withdraw-money-component.component.html',
  styleUrls: ['./withdraw-money-component.component.sass']
})
export class WithdrawMoneyComponentComponent implements OnInit {


  formWithdraw!:FormGroup;
  private withdrawModel!:Withdraw;

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

  //does all validations and Confirm the withdraw operation 
  public confirmWithdraw(){
   
    if(Number(this.formWithdraw.get('value')!.value) < 10){ 
      this.messageService.addMessage('O valor do saque presica ser no minimo R$ 10,00!','warning');
      return;
    }else if(Number(this.formWithdraw.get('value')!.value) > 1000){
      this.messageService.addMessage('O saldo atual e insulficiente para esta operação!','error');
      return;
    }

    this.withdrawModel= this.formWithdraw.value;
    let account  = new Account();
    account = {id:1,agencia:1308,conta:1234567,digito:2}
    this.withdrawModel.account = account;
    
    this.savingsAccountService.withDrawMoney(this.withdrawModel).subscribe((resp)=>{
     
      this.withdrawModel.date = resp.date;
      this.withdrawModel.id = resp.id;
      this.openDialogWithdrawSuccess(this.withdrawModel);
      
    },erro=>{
      this.messageService.addMessage('Opps...Um erro inesperado ocerreu, tente mais tarde!','error');
    })
    
  }

  //OPen withdraw operation success for show informations and withdraw operation certificate
  openDialogWithdrawSuccess(withdraw:Withdraw){
    const dialogRef = this.dialog.open(WithdrawSuccessComponent,{
      data:withdraw
    });

    
  }

}
