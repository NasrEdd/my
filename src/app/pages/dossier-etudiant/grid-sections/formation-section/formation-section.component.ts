import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { Formation as FormationType } from 'src/app/models/entities-dossier-etudiant/formation.interface';
import { GridConfiguration } from 'src/app/models/GridConfiguration.interface';
import { IgxGridComponent, TransactionType } from 'igniteui-angular';
import { v4 as uuid4 } from 'uuid';
import { IgxGridCellComponent } from 'igniteui-angular/lib/grids/cell.component';
import { createToolTips } from 'src/app/Classes/Helpers';

declare var bootstrap:any, $:any;

@Component({
  selector: 'app-formation-section',
  templateUrl: './formation-section.component.html',
  styleUrls: ['./formation-section.component.scss']
})
export class FormationSectionComponent implements OnInit {

  @ViewChild("GridFormation", {read : IgxGridComponent}) public GridFormation?: IgxGridComponent;
  @Input('configuration') configuration ?: GridConfiguration<FormationType>;
  @Input('countriesArr') countriesArr ?: any[];
  @Output('edittedEmitter') edittedEmitter : EventEmitter<FormationType[]> = new EventEmitter<FormationType[]>();
  @Output('createdEmitter') createdEmitter : EventEmitter<FormationType[]> = new EventEmitter<FormationType[]>();
  @Output('deletedEmitter') deletedEmitter : EventEmitter<FormationType[]> = new EventEmitter<FormationType[]>();



  constructor() { 
  }

  ngOnInit(): void {
    createToolTips();
  }

  addRow(){
    let newObject : FormationType ={ EtdForm_Id: uuid4() };
    this.configuration?.transactions?.push({ id: newObject.EtdForm_Id, type: TransactionType.ADD, newValue: newObject });
    this.GridFormation?.reflow();
    this.configuration?.data.push(newObject)
    this.edittedEmitter.next(this.configuration?.data)
  }

  deleteRows(){
    let selectedRows = this.GridFormation?.selectedRows;
    if( selectedRows&&selectedRows.length ){
      selectedRows?.forEach(row=> {
        let deletedProg :FormationType = { EtdForm_Id : row };
        this.GridFormation?.deleteRow(row) 
        this.configuration?.transactions?.push({ id: deletedProg.EtdForm_Id, type: TransactionType.DELETE, newValue: deletedProg });
      })
      this.deletedEmitter.next(this.configuration?.data)
    }
  }

  rowEditDone( event:any){
    if(event.newValue){
      const newValue = event.newValue;
      this.configuration?.transactions?.push({ id: newValue.EtdForm_Id, type: TransactionType.UPDATE, newValue: newValue });
      this.GridFormation?.reflow();
      this.edittedEmitter.next(this.configuration?.data)
    }
  }
  
  handlePaysChange( event :any, cell :IgxGridCellComponent){
    cell.update(event.countryId);
  }

  /**
 * Used to open modal of : Grid columns hiding menu
 */
  toggleGridColumnsModal(){
    var myModal = new bootstrap.Modal(document.getElementById("FormatHidingMenu"), {});
    myModal.toggle();
  }

  

}
