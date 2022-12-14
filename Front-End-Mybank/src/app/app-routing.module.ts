import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdsRowComponent } from './components/account-module/ads-row/ads-row.component';
import { MyAccountComponent } from './components/account-module/my-account/my-account.component';
import { NewAccountComponent } from './components/account-module/new-account/new-account.component';
import { SuccessCreatedAccountComponent } from './components/account-module/success-created-account/success-created-account.component';
import { WithdrawMoneyComponentComponent } from './components/account-module/operations/withdraw-money-component/withdraw-money-component.component';
import { AuthFormComponent } from './pages/auth-form/auth-form.component';
import { HomeComponent } from './pages/home/home.component';
import { TransferComponent } from './components/account-module/operations/transfer/transfer.component';
import { HistoricAccountComponent } from './components/account-module/historic-account/historic-account.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {path:'', component:HomeComponent},
  {path:'new-account',component:NewAccountComponent},
  {path:'account-created',component:SuccessCreatedAccountComponent},
  {path:'auth',component:AuthFormComponent},
  {path:'myaccount',component:AdsRowComponent,canActivate:[AuthGuard]},
  {path:'myaccount',component:MyAccountComponent,canActivate:[AuthGuard],children:[
    {path:'withdraw',component:WithdrawMoneyComponentComponent},
    {path:"trasnfer",component:TransferComponent},
    {path:"historic",component:HistoricAccountComponent}
  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{useHash:true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
