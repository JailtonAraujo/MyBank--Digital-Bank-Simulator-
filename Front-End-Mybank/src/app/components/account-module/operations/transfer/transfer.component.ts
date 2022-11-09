import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { StepperOrientation } from '@angular/material/stepper';
import { map, Observable } from 'rxjs';
import { PhysicalPersonService } from 'src/app/services/physical-person.service';

@Component({
  selector: 'app-transfer',
  templateUrl: './transfer.component.html',
  styleUrls: ['./transfer.component.sass']
})
export class TransferComponent implements OnInit {

  stepperOrientation!:Observable<StepperOrientation>;

  formTransfer!:FormGroup;
  confirmeForm!:FormGroup;

  listPersons?:Array<any>;

  transfModel:any;

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

  public searchPerson(event:any){
   const name = event.target.value

   if(!name){
    return;
   }
    
   this.physicalPersonService.findUserByName(name).subscribe((resp)=>{
    if(resp.length ==  0){
      this.listPersons = [];
      return;
    }
    this.listPersons = resp;
   },error =>{
    this.listPersons = [];
   })

  }

  public findPersonById(id:any){
    console.log(id)
  }

}
