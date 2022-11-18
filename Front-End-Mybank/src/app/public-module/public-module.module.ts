import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

//Materia modules
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatStepperModule} from '@angular/material/stepper';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatDialogModule} from '@angular/material/dialog';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatTabsModule} from '@angular/material/tabs';
import {MatTableModule} from '@angular/material/table';


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
  MatFormFieldModule,
  MatDatepickerModule,
  MatProgressSpinnerModule,
  MatDialogModule,
  MatAutocompleteModule,
  MatTabsModule,
  MatTableModule,
  
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
    MatNativeDateModule,
  
    
  ],
  exports: [
    AngularMaterialModules,
    BrMaskerModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatNativeDateModule

  ]
})
export class PublicModuleModule { }
