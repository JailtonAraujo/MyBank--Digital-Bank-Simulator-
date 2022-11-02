import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-report-dialog',
  templateUrl: './report-dialog.component.html',
  styleUrls: ['./report-dialog.component.sass']
})
export class ReportDialogComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data:any,
    private router:Router
  ) { }

  ngOnInit(): void {

    if(!this.data){
      this.router.navigate(['']);
    }

    let iframe = document.getElementById('iframe-pdf') as HTMLIFrameElement;
    iframe.src = this.data
  }

}
