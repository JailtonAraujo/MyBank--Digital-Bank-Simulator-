import { Injectable } from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor(private _snackBar:MatSnackBar) { }

  public addMessage(message:string, state:string){
    this._snackBar.open(message,'Close',{duration:4000,verticalPosition:'top',horizontalPosition:'end',panelClass:state})
  }

}
