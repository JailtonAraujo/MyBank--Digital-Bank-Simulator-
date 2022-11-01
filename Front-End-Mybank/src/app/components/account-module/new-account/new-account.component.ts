import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AddressService } from 'src/app/services/address.service';
import { MessageService } from 'src/app/services/message.service';
import { PhysicalPerson } from 'src/app/model/PhysicalPerson';

@Component({
  selector: 'app-new-account',
  templateUrl: './new-account.component.html',
  styleUrls: ['./new-account.component.sass']
})
export class NewAccountComponent implements OnInit {

  constructor(
    private addressService:AddressService,
    private messageService:MessageService) { }

  formTerms!:FormGroup;
  formAdress!:FormGroup;
  formPerson!:FormGroup;

  physicalPerson!:PhysicalPerson;

  ngOnInit(): void {
    this.formTerms =  new FormGroup({
      acepteTerms : new FormControl('',[Validators.required])
    });

    this.formAdress = new FormGroup({
      uf : new FormControl('',[Validators.required]),
      cep : new FormControl('',[Validators.required]),
      city : new FormControl('',[Validators.required]),
      street : new FormControl('',[Validators.required]),
      number : new FormControl('',[Validators.required])
    });

    this.formPerson = new FormGroup({
      name: new FormControl('',[Validators.required]),
      lastname: new FormControl('',[Validators.required]),
      cpf: new FormControl('',[Validators.required]),
      birthDate :new FormControl('',[Validators.required])
    })

  }

  public async serachAddress(event: Event) {
    const value = (event.target as HTMLInputElement).value;

    this.formAdress.get("uf")?.setValue("...");
    this.formAdress.get("city")?.setValue("...");

    await this.addressService.searchAddress(value).subscribe((data) => {
      this.formAdress.get("uf")?.setValue(data.uf);
      this.formAdress.get("city")?.setValue(data.localidade);
      
      if(data.erro){
        this.messageService.addMessage('CEP não encontrado!','error');
      }

    },error=>{
      this.formAdress.get("uf")?.setValue("");
      this.formAdress.get("city")?.setValue("");
      this.messageService.addMessage('CEP inválido!','error');
    });
  }


  public handlerRegisterPerson(){
    this.physicalPerson = this.formPerson.value;
    this.physicalPerson.addressClass = this.formAdress.value

    console.log(this.physicalPerson)
  }


}
