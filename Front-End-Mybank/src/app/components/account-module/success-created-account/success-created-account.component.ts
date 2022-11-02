import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SavingsAccount } from 'src/app/model/SavingsAccount';
import { SavingsAccountService } from 'src/app/services/savings-account.service';

@Component({
  selector: 'app-success-created-account',
  templateUrl: './success-created-account.component.html',
  styleUrls: ['./success-created-account.component.sass']
})
export class SuccessCreatedAccountComponent implements OnInit {

  account!:SavingsAccount;

  constructor(private savingsAccountService:SavingsAccountService,
    private router:Router) { }

  ngOnInit(): void {

    if(!this.account){
      this.router.navigate(['']);
    }

    this.account = this.savingsAccountService.getAccountModel();
   
  }

}
