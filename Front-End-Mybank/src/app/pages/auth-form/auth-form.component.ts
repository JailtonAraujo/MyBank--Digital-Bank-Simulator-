import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SavingsAccount } from 'src/app/model/SavingsAccount';
import { SavingsAccountService } from 'src/app/services/savings-account.service';

@Component({
  selector: 'app-auth-form',
  templateUrl: './auth-form.component.html',
  styleUrls: ['./auth-form.component.sass']
})
export class AuthFormComponent implements OnInit {

  hide = true;
  account!:SavingsAccount;

  formAccount!:FormGroup;

  constructor(
    private savingsAccountService:SavingsAccountService,
    private router:Router) { }

  ngOnInit(): void {
    this.account = this.savingsAccountService.getAccountModel();

    if(!this.account){
      this.router.navigate(['']);
    }

    this.formAccount = new FormGroup({
      agencia: new FormControl(this.account ? this.account.agencia : '',[Validators.required]),
      conta: new FormControl(this.account ? this.account.conta : '', [Validators.required]),
      digito: new FormControl(this.account ? this.account.digito : '',[Validators.required]),
      password: new FormControl('',[Validators.required])
    })
  }

  public authenticate(){
    console.log(this.formAccount.value);
  }

}
