import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatStepperModule} from '@angular/material/stepper';
import {MatFormFieldModule} from '@angular/material/form-field';

import { BrMaskerModule } from 'br-mask';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';


const AngularMaterialModules = [
  MatMenuModule,
  MatButtonModule,
  MatInputModule,
  MatIconModule,
  MatCheckboxModule,
  MatSnackBarModule,
  MatStepperModule,
  MatFormFieldModule
]



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    AngularMaterialModules,
    BrMaskerModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatStepperModule,
    MatFormFieldModule
    
  ],
  exports: [
    AngularMaterialModules,
    BrMaskerModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ]
})
export class PublicModuleModule { }
