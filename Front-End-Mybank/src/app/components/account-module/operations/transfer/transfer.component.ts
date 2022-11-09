import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { StepperOrientation } from '@angular/material/stepper';
import { map, Observable } from 'rxjs';
import { Account } from 'src/app/model/Account';
import { PhysicalPerson } from 'src/app/model/PhysicalPerson';
import { TranferModel } from 'src/app/model/TransferModel';
import { PhysicalPersonService } from 'src/app/services/physical-person.service';

@Component({
  selector: 'app-transfer',
  templateUrl: './transfer.component.html',
  styleUrls: ['./transfer.component.sass']
})
export class TransferComponent implements OnInit {

  hideCheckBox=true;

  stepperOrientation!:Observable<StepperOrientation>;

  physicalPersonReturned!:PhysicalPerson;
  tranferModel!:TranferModel;

  formTransfer!:FormGroup;
  confirmeForm!:FormGroup;

  listPersons!:Array<any>;

  constructor(
    private physicalPersonService:PhysicalPersonService,
    breakpointObserver: BreakpointObserver
    ) { 
      this.stepperOrientation = breakpointObserver
      .observe('(min-width: 600px)')
      .pipe(map(({matches}) => (matches ? 'horizontal' : 'vertical')));
    }

  ngOnInit(): void {



    this.formTransfer = new FormGroup({
      agencia: new FormControl('',[Validators.required]),
      conta: new FormControl('',[Validators.required]),
      digito: new FormControl('',[Validators.required]),
      value: new FormControl('',[Validators.required])
    });

    this.confirmeForm = new FormGroup({
      confirme : new FormControl('',[Validators.required])
    })
  }

  //Find Person by name 
  public searchPersonByName(event:any){
   const name = event.target.value

   if(!name){
    return;
   }
    
   this.physicalPersonService.findPersonByName(name).subscribe((resp)=>{
    if(resp.length ==  0){
      this.listPersons = [];
      return;
    }
    
    this.listPersons = resp;
   },error =>{
    this.listPersons = [];
   })

  }

  //Find Person by id if user choose search by name
  public findPersonById(id:any){
    
    this.physicalPersonService.findPersonByid(id).subscribe((resp)=>{
     
     this.formTransfer.get('agencia')?.setValue(resp.account?.agencia);
     this.formTransfer.get('conta')?.setValue(resp.account?.conta);
     this.formTransfer.get('digito')?.setValue(resp.account?.digito);

      this.physicalPersonReturned = resp;

    },error=>{
      console.log(error);
    })
  }

  //Confirme tranfer in backEnd
  public confirmTranfer(){

    this.tranferModel ={
      destino:this.physicalPersonReturned.account as Account,
      origem:this.physicalPersonReturned.account as Account,
      value:this.formTransfer.get('value')?.value
    }
    console.log(this.tranferModel); 
  }

  public findPersonByAccount(){
    if(this.hideCheckBox){
      console.log("pegou")
    }
  }

}
