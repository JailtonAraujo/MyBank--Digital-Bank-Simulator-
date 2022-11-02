import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AddressService } from 'src/app/services/address.service';
import { MessageService } from 'src/app/services/message.service';
import { PhysicalPerson } from 'src/app/model/PhysicalPerson';
import { PhysicalPersonService } from 'src/app/services/physical-person.service';
import { SavingsAccountService } from 'src/app/services/savings-account.service';
import { Router } from '@angular/router';
import { LoadingService } from 'src/app/services/loading.service';

@Component({
  selector: 'app-new-account',
  templateUrl: './new-account.component.html',
  styleUrls: ['./new-account.component.sass']
})
export class NewAccountComponent implements OnInit {

  hide=true;

  formTerms!:FormGroup;
  formAdress!:FormGroup;
  formPerson!:FormGroup;

  physicalPerson!:PhysicalPerson;

  constructor(
    private addressService:AddressService,
    private messageService:MessageService,
    private physicalPersonService:PhysicalPersonService,
    private savingsAccountService:SavingsAccountService,
    private router:Router,
    private loadingService:LoadingService) { }

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
      birthDate :new FormControl('',[Validators.required]),
      password: new FormControl('',[Validators.required])
    })

  }

  public serachAddress(event: Event) {
    const value = (event.target as HTMLInputElement).value;

    this.formAdress.get("uf")?.setValue("...");
    this.formAdress.get("city")?.setValue("...");

      this.addressService.searchAddress(value).subscribe((data) => {
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


  public async handlerRegisterPerson(){

    if(this.getAge(this.formPerson.get('birthDate')?.value) < 18 ){
      this.messageService.addMessage('É necessario ter no minino 18 anos para abrir uma conta!','warning');
      return;
    }

    this.physicalPerson = this.formPerson.value;
    this.physicalPerson.addressClass = this.formAdress.value;

    this.loadingService.isLoading(true);

    this.physicalPersonService.createdNewSavingsAccount(this.physicalPerson).subscribe((resp)=>{

      this.savingsAccountService.setAccountModel(resp);
      this.loadingService.isLoading(false);

      this.router.navigate(['account-created']);

    },error =>{
      this.messageService.addMessage(`${error.message}`,'error');
      this.loadingService.isLoading(false);
    })

  }



  public getAge(dateString:string) {
    const today = new Date();
    const birthDate = new Date(dateString);
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    
    //This conditional is for verify ploblems like leap year
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    
    return age;
}


}
