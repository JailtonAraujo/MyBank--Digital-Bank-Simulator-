import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ObjectPagination } from 'src/app/model/ObjectPagination';


@Component({
  selector: 'app-tbl-historic',
  templateUrl: './tbl-historic.component.html',
  styleUrls: ['./tbl-historic.component.sass']
})
export class TblHistoricComponent implements OnInit {

  @Output() offset = new EventEmitter<Number>();

  @Input() displaycolun:string [] = [];
  @Input() elementData:any[] = [];

  @Input() totalItens:number=0;
  @Input() totalPages!:number;


  columnsToDisplay!: string[];

  constructor() { }

  ngOnInit(): void {
    this.columnsToDisplay = this.displaycolun.slice();
  }

  public nextPage(event:any){
    this.offset.emit(event.pageIndex*10);
  }
 

}
