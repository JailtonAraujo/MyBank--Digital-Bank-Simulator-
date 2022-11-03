import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header-myaccount',
  templateUrl: './header-myaccount.component.html',
  styleUrls: ['./header-myaccount.component.sass']
})
export class HeaderMyaccountComponent implements OnInit {

  hide=true;

  constructor() { }

  ngOnInit(): void {
  }

}
