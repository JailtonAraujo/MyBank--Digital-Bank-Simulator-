import { Component, OnInit } from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import { MessageService } from 'src/app/services/message.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent implements OnInit {

  cpfOrCnpjplaceholder = "Digite seu CPF";
  chackBoxActiveted = false;
  brMaskProps = {};

  constructor(private _snackBar:MatSnackBar,private messageService:MessageService) { }

  ngOnInit(): void {
    this.brMaskProps={mask:'000.000.000-00', len:14,type:'num'};
  }

  public changePlaceholderAndMaskInputCpfOrCnpj(){
    this.cpfOrCnpjplaceholder = this.chackBoxActiveted ? "Digite seu CPF" : "Digite seu CNPJ";
    this.chackBoxActiveted = this.chackBoxActiveted ? false : true;
    let input = document.getElementById('cpf-or-cnpj') as HTMLInputElement;
    input.value = "";
    this.brMaskProps = this.chackBoxActiveted ? {mask:'00.000.000/0000-00', len:18,type:'num'} : {mask:'000.000.000-00', len:14,type:'num'};
  }

  public submitFormVerifyCpfOrCnpj(){
    if(this.chackBoxActiveted===true){
     //this._snackBar.open('Opções de conta juridica estão em manutenção!', 'Close',{duration:4000, horizontalPosition:'end',verticalPosition:'top',panelClass:'snakBarClass'});
     this.messageService.addMessage('Opções de conta juridica estão em manutenção!','warning');
      return;
    }

    this.messageService.addMessage('Ok!','success');

  }

}
