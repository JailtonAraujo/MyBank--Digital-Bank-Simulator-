import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewAccountComponent } from './new-account/new-account.component';
import { PublicModuleModule } from 'src/app/public-module/public-module.module';
import { SuccessCreatedAccountComponent } from './success-created-account/success-created-account.component';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { AdsRowComponent } from './ads-row/ads-row.component';
import { MyAccountComponent } from './my-account/my-account.component';
import { HeaderMyaccountComponent } from './header-myaccount/header-myaccount.component';


@NgModule({
  declarations: [
    NewAccountComponent,
    SuccessCreatedAccountComponent,
    AdsRowComponent,
    MyAccountComponent,
    HeaderMyaccountComponent,
  ],
  imports: [
    CommonModule,
    PublicModuleModule,
    AppRoutingModule
  ],
  exports:[
    NewAccountComponent
  ]
})
export class AccountModuleModule { }
