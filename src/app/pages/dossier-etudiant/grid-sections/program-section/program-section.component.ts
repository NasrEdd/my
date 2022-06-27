import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { IgxGridComponent, TransactionType } from 'igniteui-angular';
import { createToolTips } from 'src/app/Classes/Helpers';
import { Program as ProgramType } from 'src/app/models/entities-dossier-etudiant/program.interface';
import { GridConfiguration } from 'src/app/models/GridConfiguration.interface';
import { v4 as uuid4 } from 'uuid';

declare var bootstrap:any, $:any;

@Component({
  selector: 'app-program-section',
  templateUrl: './program-section.component.html',
  styleUrls: ['./program-section.component.scss']
})
export class ProgramSectionComponent implements OnInit {

  @ViewChild("GridProgram", {read : IgxGridComponent}) public gridProgram?: IgxGridComponent;
  @Input('configuration') configuration ?: GridConfiguration<ProgramType>;
  @Output('edittedEmitter') edittedEmitter : EventEmitter<ProgramType[]> = new EventEmitter<ProgramType[]>();
  @Output('createdEmitter') createdEmitter : EventEmitter<ProgramType[]> = new EventEmitter<ProgramType[]>();
  @Output('deletedEmitter') deletedEmitter : EventEmitter<ProgramType[]> = new EventEmitter<ProgramType[]>();

  

  constructor() { 
  }

  ngOnInit(): void {
    createToolTips();
  }


  addRow(){
    let newObject : ProgramType ={ EtdPrg_Id: uuid4() };
    this.configuration?.transactions?.push({ id: newObject.EtdPrg_Id, type: TransactionType.ADD, newValue: newObject });
    this.gridProgram?.reflow();
    this.configuration?.data.push(newObject)
    this.edittedEmitter.next(this.configuration?.data)
  }

  deleteRows(){
    let selectedRows = this.gridProgram?.selectedRows;
    if( selectedRows&&selectedRows.length ){
      selectedRows?.forEach(row=>{ 
        let deletedProg :ProgramType = { EtdPrg_Id : row };
        this.gridProgram?.deleteRow(row);
        this.configuration?.transactions?.push({ id: deletedProg.EtdPrg_Id, type: TransactionType.DELETE, newValue: deletedProg });
      })
      this.deletedEmitter.next(this.configuration?.data)
    }
  }

  rowEditDone( event:any){
    if(event.newValue){
      const newValue = event.newValue;
      this.configuration?.transactions?.push({ id: newValue.EtdPrg_Id, type: TransactionType.UPDATE, newValue: newValue });
      this.gridProgram?.reflow();
      this.edittedEmitter.next(this.configuration?.data)
    }
  }


  /**
 * Used to open modal of : Grid columns hiding menu
 */
  toggleGridColumnsModal(){
    var myModal = new bootstrap.Modal(document.getElementById("ProgHidingMenu"), {});
    myModal.toggle();
  }

}
