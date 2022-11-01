import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NewAccountComponent } from './components/account-module/new-account/new-account.component';
import { SuccessCreatedAccountComponent } from './components/account-module/success-created-account/success-created-account.component';
import { HomeComponent } from './pages/home/home.component';

const routes: Routes = [
  {path:'', component:HomeComponent},
  {path:'new-account',component:NewAccountComponent},
  {path:'account-created',component:SuccessCreatedAccountComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
