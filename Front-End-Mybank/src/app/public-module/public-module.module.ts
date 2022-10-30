import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import {MatSnackBarModule} from '@angular/material/snack-bar';

import { BrMaskerModule } from 'br-mask';

const AngularMaterialModules = [
  MatMenuModule,
  MatButtonModule,
  MatInputModule,
  MatIconModule,
  MatCheckboxModule,
  MatSnackBarModule
]



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    AngularMaterialModules,
    BrMaskerModule
  ],
  exports: [
    AngularMaterialModules,
    BrMaskerModule
  ]
})
export class PublicModuleModule { }
