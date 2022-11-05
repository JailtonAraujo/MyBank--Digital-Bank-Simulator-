import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Withdraw } from 'src/app/model/Withdraw';


@Component({
  selector: 'app-withdraw-success',
  templateUrl: './withdraw-success.component.html',
  styleUrls: ['./withdraw-success.component.sass']
})
export class WithdrawSuccessComponent implements OnInit {

  withdraw!:Withdraw;

  constructor( @Inject(MAT_DIALOG_DATA) public data:Withdraw,
 ) { }

  ngOnInit(): void {
    this.withdraw = this.data;
  }

}
