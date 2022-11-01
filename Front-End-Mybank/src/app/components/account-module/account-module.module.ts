import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewAccountComponent } from './new-account/new-account.component';
import { PublicModuleModule } from 'src/app/public-module/public-module.module';


@NgModule({
  declarations: [
    NewAccountComponent,
  ],
  imports: [
    CommonModule,
    PublicModuleModule
  ],
  exports:[
    NewAccountComponent
  ]
})
export class AccountModuleModule { }
