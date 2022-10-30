import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent implements OnInit {

  cpfOrCnpjplaceholder = "Digite seu CPF"
  chackBoxActiveted = false;

  constructor() { }

  ngOnInit(): void {
  }

  public changeInputCpfOrCnpjPlaceholder(){
    this.cpfOrCnpjplaceholder = this.chackBoxActiveted ? "Digite seu CPF" : "Digite seu CNPJ";
    this.chackBoxActiveted = this.chackBoxActiveted ? false : true;
    let input = document.getElementById('cpf-or-cnpj') as HTMLInputElement;
    input.value = ""
    
  }

}
