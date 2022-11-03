import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdsRowComponent } from './components/account-module/ads-row/ads-row.component';
import { MyAccountComponent } from './components/account-module/my-account/my-account.component';
import { NewAccountComponent } from './components/account-module/new-account/new-account.component';
import { SuccessCreatedAccountComponent } from './components/account-module/success-created-account/success-created-account.component';
import { AuthFormComponent } from './pages/auth-form/auth-form.component';
import { HomeComponent } from './pages/home/home.component';

const routes: Routes = [
  {path:'', component:HomeComponent},
  {path:'new-account',component:NewAccountComponent},
  {path:'account-created',component:SuccessCreatedAccountComponent},
  {path:'auth',component:AuthFormComponent},
  {path:'myaccount',component:AdsRowComponent},
  {path:'myaccount',component:MyAccountComponent,children:[
  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
