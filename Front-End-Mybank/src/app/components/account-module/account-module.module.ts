import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewAccountComponent } from './new-account/new-account.component';
import { PublicModuleModule } from 'src/app/public-module/public-module.module';
import { SuccessCreatedAccountComponent } from './success-created-account/success-created-account.component';
import { AppRoutingModule } from 'src/app/app-routing.module';


@NgModule({
  declarations: [
    NewAccountComponent,
    SuccessCreatedAccountComponent,
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
