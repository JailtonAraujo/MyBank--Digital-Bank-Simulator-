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
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { RequestsInterceptor } from './guards/requests.interceptor';
import { StoreModule } from '@ngrx/store';
import { saldoReducer } from './store/saldoReducer';
import { authReducer } from './store/authReducer';



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
    AccountModuleModule,
    StoreModule.forRoot({
      saldoReducer:saldoReducer,
      authReducer:authReducer,
    })
  ],
  exports:[
  ],

  providers: [
    {
      provide:HTTP_INTERCEPTORS,
      useClass:RequestsInterceptor,
      multi:true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
