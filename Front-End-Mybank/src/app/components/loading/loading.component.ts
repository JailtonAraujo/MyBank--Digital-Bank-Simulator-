import { Component, OnInit } from '@angular/core';
import { LoadingService } from 'src/app/services/loading.service';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.sass']
})
export class LoadingComponent implements OnInit {

  loading!:Boolean;

  constructor(private loadingService:LoadingService) { }

  ngOnInit(): void {
    this.loadingService.Loading.subscribe(loading => this.loading = loading);
  }

}
