import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { StepperOrientation } from '@angular/material/stepper';
import { map, Observable } from 'rxjs';
import { Account } from 'src/app/model/Account';
import { PhysicalPerson } from 'src/app/model/PhysicalPerson';
import { TranferModel } from 'src/app/model/TransferModel';
import { LoadingService } from 'src/app/services/loading.service';
import { MessageService } from 'src/app/services/message.service';
import { PhysicalPersonService } from 'src/app/services/physical-person.service';
import { SavingsAccountService } from 'src/app/services/savings-account.service';
import { TransferSuccessComponent } from '../../dialogs/transfer-success/transfer-success.component';


@Component({
  selector: 'app-transfer',
  templateUrl: './transfer.component.html',
  styleUrls: ['./transfer.component.sass']
})
export class TransferComponent implements OnInit {

  //components variables
  hideCheckBox=true;
  stepperOrientation!:Observable<StepperOrientation>;
  loading:boolean = false;

  //Models
  physicalPersonReturned!:PhysicalPerson;
  tranferModel!:TranferModel;
  listPersons!:Array<any>;

  //forms
  formTransfer!:FormGroup;
  confirmeForm!:FormGroup;


  constructor(
    private physicalPersonService:PhysicalPersonService,
    private messageService:MessageService,
    private savingsAccountService:SavingsAccountService,
    private loadingService:LoadingService,
    private dialog:MatDialog,
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
   const name = event.target.value;

   if(!name){
    return;
    //message(Nome obrigatorio para efetuar busca)
   }
    
    this.loading = true;

   this.physicalPersonService.findPersonByName(name).subscribe((resp)=>{
    if(resp.length ==  0){
      this.listPersons = [];
      return;
    }
    
    this.listPersons = resp;
    this.loading = false;
    
   },error =>{
    this.listPersons = [];
    console.log(error);
    this.loading = false;
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

  //Find person by account if user choose insert account informations manually
  public findPersonByAccount(){
    if(this.hideCheckBox){
      
      const account:Account = {
        agencia:this.formTransfer.get('agencia')?.value,
        conta:this.formTransfer.get('conta')?.value,
        digito:this.formTransfer.get('digito')?.value
      };

      this.physicalPersonService.findPersonByAccount(account).subscribe((resp)=>{
        this.physicalPersonReturned = resp;
      },error=>{
        console.log(error);
      })

    }
  }

  //Confirme tranfer
  public confirmTranfer(){

   let accountDestino:Account = this.physicalPersonReturned.account as Account;
   accountDestino.person = {
    name:this.physicalPersonReturned.name,
    cpf:this.physicalPersonReturned.cpf,
    lastname:this.physicalPersonReturned.lastname,
    password:""
   };


    this.tranferModel ={
      accountDestino,
      accountOrigem:{id:1},
      value:this.formTransfer.get('value')?.value
    }


    this.loadingService.isLoading(true);
     
    this.savingsAccountService.transfer(this.tranferModel).subscribe((res)=>{
      
      //setting Id of the transfer that was confirmed
      this.tranferModel.id =res.id;

      //sendind transfer full for component TranferSuccessDialog
      this.openTransferDialog(this.tranferModel);

      this.loadingService.isLoading(false);
    },error =>{
      console.log(error);
      this.loadingService.isLoading(false);
    })
  }



  public openTransferDialog(transfer:TranferModel){
    const dialogRef = this.dialog.open(TransferSuccessComponent,{
      data:transfer,
    })
  }

}
