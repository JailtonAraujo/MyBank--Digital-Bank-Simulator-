import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Withdraw } from 'src/app/model/Withdraw';
import { MessageService } from 'src/app/services/message.service';

@Component({
  selector: 'app-withdraw-money-component',
  templateUrl: './withdraw-money-component.component.html',
  styleUrls: ['./withdraw-money-component.component.sass']
})
export class WithdrawMoneyComponentComponent implements OnInit {


  formWithdraw!:FormGroup;
  withdraw!:Withdraw;

  constructor(private messageService:MessageService) { }

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

    this.messageService.addMessage('OK','success');
    this.withdraw= this.formWithdraw.value;
    console.log(this.withdraw)
    
  }

}
