import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';



const Modules = [
  MatMenuModule,
  MatButtonModule,
  MatInputModule,
  MatIconModule
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    Modules
  ],
  exports:[
    Modules
  ]
})
export class PublicModuleModule { }
