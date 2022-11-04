import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header-myaccount',
  templateUrl: './header-myaccount.component.html',
  styleUrls: ['./header-myaccount.component.sass']
})
export class HeaderMyaccountComponent implements OnInit {

  hide=true;
  isOpen=false
  classList=['links']

  constructor() { }

  ngOnInit(): void {
  }

  public openAndCloseMenu(){
   this.classList = this.isOpen ? ['links'] : ['links','open'];
   this.isOpen = this.isOpen ? false : true
  }

}
