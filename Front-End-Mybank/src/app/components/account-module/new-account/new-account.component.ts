import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-new-account',
  templateUrl: './new-account.component.html',
  styleUrls: ['./new-account.component.sass']
})
export class NewAccountComponent implements OnInit {

  constructor() { }

  formTerms!:FormGroup;
  formAdress!:FormGroup;

  ngOnInit(): void {
    this.formTerms =  new FormGroup({
      terms : new FormControl('')
    });

    this.formAdress = new FormGroup({
      id : new FormControl('',[Validators.required]),
      uf : new FormControl('',[Validators.required]),
      cep : new FormControl('',[Validators.required]),
      city : new FormControl('',[Validators.required]),
      street : new FormControl('',[Validators.required]),
      number : new FormControl('',[Validators.required])
    })
  }


}
