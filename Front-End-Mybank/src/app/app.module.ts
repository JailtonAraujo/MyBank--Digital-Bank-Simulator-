import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { PublicModuleModule } from './public-module/public-module.module';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    PublicModuleModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
