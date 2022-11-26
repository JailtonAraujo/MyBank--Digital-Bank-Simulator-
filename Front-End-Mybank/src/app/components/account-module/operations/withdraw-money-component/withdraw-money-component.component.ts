import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Account } from 'src/app/model/Account';
import { Withdraw } from 'src/app/model/Withdraw';
import { MessageService } from 'src/app/services/message.service';
import { SavingsAccountService } from 'src/app/services/savings-account.service';
import { MatDialog } from '@angular/material/dialog';
import { WithdrawSuccessComponent } from '../../dialogs/withdraw-success/withdraw-success.component';
import { Store } from '@ngrx/store';
import { map } from 'rxjs';
import { Isaldo, subtrairSaldo } from 'src/app/store/saldoReducer';
import { Auth } from 'src/app/model/Auth';

@Component({
  selector: 'app-withdraw-money-component',
  templateUrl: './withdraw-money-component.component.html',
  styleUrls: ['./withdraw-money-component.component.sass']
})
export class WithdrawMoneyComponentComponent implements OnInit {


  formWithdraw!:FormGroup;
  private withdrawModel!:Withdraw;

  CurrentAccount!:Account;

  Saldo!:Number;

  constructor(
    private messageService:MessageService,
    private savingsAccountService:SavingsAccountService,
    private dialog:MatDialog,
    private saldoReducer:Store<{saldoReducer:Isaldo}>,
    private authReducer:Store<{authReducer:Auth}>) { }

  ngOnInit(): void {


    this.saldoReducer.subscribe((saldo)=>{
        this.Saldo= Number(saldo.saldoReducer.value)
    })

    this.authReducer.subscribe((auth)=>{
     this.savingsAccountService.getCurrentAccount(Number(auth.authReducer.accountId)).subscribe((resp)=>{
      this.CurrentAccount = resp;
     })
    })

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
    }else if(Number(this.formWithdraw.get('value')!.value) > this.Saldo){
      this.messageService.addMessage('O saldo atual e insulficiente para esta operação!','error');
      return;
    }

    this.withdrawModel= this.formWithdraw.value;
    this.withdrawModel.account = this.CurrentAccount

    this.savingsAccountService.withDrawMoney(this.withdrawModel).subscribe((resp)=>{
     
      this.withdrawModel.date = resp.date;
      this.withdrawModel.id = resp.id;

      this.saldoReducer.dispatch(subtrairSaldo({payload:Number(this.formWithdraw.get('value')!.value)}));

      this.openDialogWithdrawSuccess(this.withdrawModel);
      
    },error=>{
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
