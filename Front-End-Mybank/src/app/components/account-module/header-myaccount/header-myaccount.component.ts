import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { SavingsAccountService } from 'src/app/services/savings-account.service';

@Component({
  selector: 'app-header-myaccount',
  templateUrl: './header-myaccount.component.html',
  styleUrls: ['./header-myaccount.component.sass']
})
export class HeaderMyaccountComponent implements OnInit {

  saldo!:Number;
  nameUser!:String;

  hide=true;
  isOpen=false
  classList=['links']

  constructor(private savingsAccountService:SavingsAccountService, 
    private authService:AuthService,
    private router:Router) { }

  ngOnInit(): void {

    const accountId = JSON.parse(String(localStorage.getItem('authMyBank'))).accountId;
    this.nameUser = JSON.parse(String(localStorage.getItem('authMyBank'))).name;

    this.savingsAccountService.getSaldoAccountById(Number(accountId)).subscribe((resp)=>{
      this.saldo = Number(resp.toFixed(2));
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

}
