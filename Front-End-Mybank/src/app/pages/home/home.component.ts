import { Component, OnInit } from '@angular/core';
import { MessageService } from 'src/app/services/message.service';
import { PhysicalPersonService } from 'src/app/services/physical-person.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent implements OnInit {

  cpfOrCnpjplaceholder = "Digite seu CPF";
  chackBoxActiveted = false;
  brMaskProps = {};
  messageErro = '';

  personModel = {
    cpfOrCnpj: ""
  }

  constructor(
    private messageService: MessageService,
    private physicalPersonService: PhysicalPersonService) { }

  ngOnInit(): void {
    this.brMaskProps = { mask: '000.000.000-00', len: 14, type: 'num' };
  }

  //change placeholder and change mask to cpf or cnpj at the InputCpfOrCnpj   
  public changePlaceholderAndMaskInputCpfOrCnpj() {
    this.cpfOrCnpjplaceholder = this.chackBoxActiveted ? "Digite seu CPF" : "Digite seu CNPJ";
    this.chackBoxActiveted = this.chackBoxActiveted ? false : true;
    let input = document.getElementById('cpf-or-cnpj') as HTMLInputElement;
    input.value = "";
    this.brMaskProps = this.chackBoxActiveted ? { mask: '00.000.000/0000-00', len: 18, type: 'num' } : { mask: '000.000.000-00', len: 14, type: 'num' };
    this.personModel.cpfOrCnpj = '';
  }

  public submitFormVerifyCpfOrCnpj() {
    if (this.chackBoxActiveted === true) {
      this.messageService.addMessage('Opções de conta juridica estão em manutenção!', 'warning');
      return;
    }

    this.physicalPersonService.verifyIfExistsCpf(this.personModel.cpfOrCnpj).subscribe((resp) => {

      this.messageService.addMessage('OK','success');

    }, error => {
      error.status == 406 ? this.messageService.addMessage('CPF já existente!', 'error') : this.messageService.addMessage('Opps...Ocorreu um erro inesperado, tente mais tarde', 'error')
    })

  }

}
