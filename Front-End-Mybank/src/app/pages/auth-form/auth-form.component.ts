import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SavingsAccount } from 'src/app/model/SavingsAccount';
import { AuthService } from 'src/app/services/auth.service';
import { MessageService } from 'src/app/services/message.service';
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
    private authService:AuthService,
    private messageService:MessageService,
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

    const auth ={
      username: this.formAccount.get('agencia')?.value+this.formAccount.get('conta')?.value+this.formAccount.get('digito')?.value,
      password:this.formAccount.get('password')?.value
    }
    //if success login set auth object in localStorage
    this.authService.login(auth).subscribe((resp)=>{
      localStorage.setItem('authMyBank',JSON.stringify(resp));
      
      this.messageService.addMessage(`Bem vindo ${resp.name}!`,'success');

      this.router.navigate(['/myaccount'])
    },error=>{
      if(error.status == 403){
        this.messageService.addMessage('Informações de conta ou senha incorreta!','error');
      }else{
      this.messageService.addMessage('opss, algo aconteceu, por favor tente mais tarde!','warning');
    }
    console.log(error);
    })
  }

}
