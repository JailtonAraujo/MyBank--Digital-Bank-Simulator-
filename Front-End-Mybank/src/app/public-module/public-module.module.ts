import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';

import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

const AngularMaterialModules = [
  MatMenuModule,
  MatButtonModule,
  MatInputModule,
  MatIconModule,
  MatCheckboxModule
]


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    AngularMaterialModules,


  ],
  exports: [
    AngularMaterialModules,
  ]
})
export class PublicModuleModule { }
