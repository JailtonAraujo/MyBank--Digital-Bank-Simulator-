import { Component, OnInit } from '@angular/core';
import { PhysicalAccount } from 'src/app/model/PhysicalAccount';

@Component({
  selector: 'app-success-created-account',
  templateUrl: './success-created-account.component.html',
  styleUrls: ['./success-created-account.component.sass']
})
export class SuccessCreatedAccountComponent implements OnInit {

  physicalAccount!:PhysicalAccount;

  constructor() { }

  ngOnInit(): void {
  }

}
