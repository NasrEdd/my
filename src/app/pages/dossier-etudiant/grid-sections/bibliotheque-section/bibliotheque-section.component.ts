import { Component, OnInit, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { IgxGridComponent, TransactionType } from 'igniteui-angular';
import { createToolTips } from 'src/app/Classes/Helpers';
import { GridConfiguration } from 'src/app/models/GridConfiguration.interface';
import { v4 as uuid4 } from 'uuid';

declare var bootstrap:any, $:any;

@Component({
  selector: 'app-bibliotheque-section',
  templateUrl: './bibliotheque-section.component.html',
  styleUrls: ['./bibliotheque-section.component.scss']
})
export class BibliothequeSectionComponent implements OnInit {

  @ViewChild("GridBiblio", {read : IgxGridComponent}) public gridBiblio?: IgxGridComponent;
  @Input('configuration') configuration ?: GridConfiguration<any>;
  @Output('edittedEmitter') edittedEmitter : EventEmitter<any[]> = new EventEmitter<any[]>();
  @Output('createdEmitter') createdEmitter : EventEmitter<any[]> = new EventEmitter<any[]>();
  @Output('deletedEmitter') deletedEmitter : EventEmitter<any[]> = new EventEmitter<any[]>();
  

  constructor() { }

  ngOnInit(): void {
    createToolTips();
  }

  addRow(){
    let newObject : any ={ EtdPrg_Id: uuid4() };
    this.configuration?.transactions?.push({ id: newObject.EtdPrg_Id, type: TransactionType.ADD, newValue: newObject });
    this.gridBiblio?.reflow();
    this.configuration?.data.push(newObject)
    this.edittedEmitter.next(this.configuration?.data)
  }

  deleteRows(){
    let selectedRows = this.gridBiblio?.selectedRows;
    if( selectedRows&&selectedRows.length ){
      selectedRows?.forEach(row=>{ 
        let deletedProg :any = { EtdPrg_Id : row };
        this.gridBiblio?.deleteRow(row);
        this.configuration?.transactions?.push({ id: deletedProg.EtdPrg_Id, type: TransactionType.DELETE, newValue: deletedProg });
      })
      this.deletedEmitter.next(this.configuration?.data)
    }
  }

  rowEditDone( event:any){
    if(event.newValue){
      const newValue = event.newValue;
      this.configuration?.transactions?.push({ id: newValue.EtdPrg_Id, type: TransactionType.UPDATE, newValue: newValue });
      this.gridBiblio?.reflow();
      this.edittedEmitter.next(this.configuration?.data)
    }
  }


  /**
 * Used to open modal of : Grid columns hiding menu
 */
  toggleGridColumnsModal(){
    var myModal = new bootstrap.Modal(document.getElementById("biblioHidingMenu"), {});
    myModal.toggle();
  }

  

}
