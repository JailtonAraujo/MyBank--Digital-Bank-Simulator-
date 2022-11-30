import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AddressService } from 'src/app/services/address.service';
import { MessageService } from 'src/app/services/message.service';
import { PhysicalPerson } from 'src/app/model/PhysicalPerson';
import { PhysicalPersonService } from 'src/app/services/physical-person.service';
import { SavingsAccountService } from 'src/app/services/savings-account.service';
import { Router } from '@angular/router';
import { LoadingService } from 'src/app/services/loading.service';
import {BreakpointObserver} from '@angular/cdk/layout';
import {StepperOrientation} from '@angular/material/stepper';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { Auth } from 'src/app/model/Auth';
import { setAuth } from 'src/app/store/authReducer';

@Component({
  selector: 'app-new-account',
  templateUrl: './new-account.component.html',
  styleUrls: ['./new-account.component.sass']
})
export class NewAccountComponent implements OnInit {

  hide=true;
  stepperOrientation!: Observable<StepperOrientation>;

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
    private loadingService:LoadingService,
    breakpointObserver: BreakpointObserver,
    private authReducer:Store<{authReducer:Auth}>
    ) { 
      this.stepperOrientation = breakpointObserver
      .observe('(min-width: 600px)')
      .pipe(map(({matches}) => (matches ? 'horizontal' : 'vertical')));
    }

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


  public handlerRegisterPerson(){

    if(this.getAge(this.formPerson.get('birthDate')?.value) < 18 ){
      this.messageService.addMessage('É necessario ter no minino 18 anos para abrir uma conta!','warning');
      return;
    }

    this.physicalPerson = this.formPerson.value;
    this.physicalPerson.address = this.formAdress.value;

    this.loadingService.isLoading(true);

    this.physicalPersonService.createdNewSavingsAccount(this.physicalPerson).subscribe((resp)=>{

      this.authReducer.dispatch(setAuth({payload:resp}));

      this.savingsAccountService.getCurrentAccount(Number(resp.accountId)).subscribe((resp)=>{

        this.savingsAccountService.setAccountModel(resp);

        this.router.navigate(['account-created']);

        this.loadingService.isLoading(false);
      })

      

    },error =>{
      if(error.error.message.includes('CPF already exists')){
        this.messageService.addMessage(`CPF já existente!`,'error');
      }
      console.log(error);
      this.loadingService.isLoading(false);
    })

  }


  //Get age in the Data received
  //http://horadecodar.com.br/2022/09/15/como-calcular-a-idade-por-meio-da-data-de-nascimento-com-javascript/
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
