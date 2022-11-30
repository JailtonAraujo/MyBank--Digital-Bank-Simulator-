import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AuthService } from 'src/app/services/auth.service';
import { SavingsAccountService } from 'src/app/services/savings-account.service';
import { Isaldo, setSaldo } from 'src/app/store/saldoReducer';
import { map } from 'rxjs/operators'

import { Auth } from 'src/app/model/Auth';

@Component({
  selector: 'app-header-myaccount',
  templateUrl: './header-myaccount.component.html',
  styleUrls: ['./header-myaccount.component.sass']
})
export class HeaderMyaccountComponent implements OnInit {

  hide=true;
  isOpen=false
  classList=['links']

  accountId = 0;

  constructor(private savingsAccountService:SavingsAccountService, 
    private authService:AuthService,
    private router:Router,
    private store:Store<{saldoReducer:Isaldo}>,
    private authReducer:Store<{authReducer:Auth}>
    ) { }

    saldo$ = this.store.select('saldoReducer').pipe(
      map(e=> e.value)
    );

    user$ = this.authReducer.select('authReducer').pipe(map(e => e));

  ngOnInit(): void {

    let accountId=0;

    this.user$.subscribe((e)=>{accountId = Number(e.accountId)})

    this.accountId = accountId;

    this.savingsAccountService.getSaldoAccountById(Number(accountId)).subscribe((resp)=>{
     this.store.dispatch(setSaldo({payload:Number(resp.toFixed(2))}));
    })
  }

  public openAndCloseMenu(){
   this.classList = this.isOpen ? ['links'] : ['links','open'];
   this.isOpen = this.isOpen ? false : true
  }

  public logout(){
    this.authService.logout();
    this.router.navigate(['/']);
  }

  refreshSaldo(){

    this.hide = !this.hide;

    this.savingsAccountService.getSaldoAccountById(Number(this.accountId)).subscribe((resp)=>{
      this.store.dispatch(setSaldo({payload:Number(resp.toFixed(2))}));
     })
  }

}
