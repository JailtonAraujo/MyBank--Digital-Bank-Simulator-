import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { PublicModuleModule } from './public-module/public-module.module';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './pages/home/home.component';
import { AccountModuleModule } from './components/account-module/account-module.module';


import { LoadingComponent } from './components/loading/loading.component';
import { ReportDialogComponent } from './components/report-dialog/report-dialog.component';
import { AuthFormComponent } from './pages/auth-form/auth-form.component';



@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    HomeComponent,
    LoadingComponent,
    ReportDialogComponent,
    AuthFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    PublicModuleModule,
    AccountModuleModule
  ],
  exports:[
  ],

  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
