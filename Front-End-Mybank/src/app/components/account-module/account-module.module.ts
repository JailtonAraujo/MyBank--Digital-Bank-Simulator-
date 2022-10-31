import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewAccountComponent } from './new-account/new-account.component';



@NgModule({
  declarations: [
    NewAccountComponent
  ],
  imports: [
    CommonModule
  ],
  exports:[
    NewAccountComponent
  ]
})
export class AccountModuleModule { }
