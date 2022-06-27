import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { Tuteur as TuteurType } from 'src/app/models/entities-dossier-etudiant/tuteur.interface';
import { GridConfiguration } from 'src/app/models/GridConfiguration.interface';
import { IgxGridComponent, TransactionType } from 'igniteui-angular';
import { v4 as uuid4 } from 'uuid';
import { createToolTips } from 'src/app/Classes/Helpers';

declare var bootstrap:any, $:any;


@Component({
  selector: 'app-tuteur-section',
  templateUrl: './tuteur-section.component.html',
  styleUrls: ['./tuteur-section.component.scss']
})
export class TuteurSectionComponent implements OnInit {

  @ViewChild("GridTuteur", {read : IgxGridComponent}) public GridTuteur?: IgxGridComponent;
  @Input('configuration') configuration ?: GridConfiguration<TuteurType>;
  @Output('edittedEmitter') edittedEmitter : EventEmitter<TuteurType[]> = new EventEmitter<TuteurType[]>();
  @Output('createdEmitter') createdEmitter : EventEmitter<TuteurType[]> = new EventEmitter<TuteurType[]>();
  @Output('deletedEmitter') deletedEmitter : EventEmitter<TuteurType[]> = new EventEmitter<TuteurType[]>();


  constructor() { 
  }

  ngOnInit(): void {
    createToolTips();
  }

  addRow(){
    let newObject : TuteurType ={ Ttr_Id: uuid4() };
    this.configuration?.transactions?.push({ id: newObject.Ttr_Id, type: TransactionType.ADD, newValue: newObject });
    this.GridTuteur?.reflow();
    this.configuration?.data.push(newObject)
    this.edittedEmitter.next(this.configuration?.data)
  }

  deleteRows(){
    let selectedRows = this.GridTuteur?.selectedRows;
    if( selectedRows&&selectedRows.length ){
      selectedRows?.forEach(row=> {
        let deletedProg :TuteurType = { Ttr_Id : row };
        this.GridTuteur?.deleteRow(row)
        this.configuration?.transactions?.push({ id: deletedProg.Ttr_Id, type: TransactionType.DELETE, newValue: deletedProg });
      })
      this.deletedEmitter.next(this.configuration?.data)
    }
  }

  rowEditDone( event:any){
    if(event.newValue){
      const newValue = event.newValue;
      this.configuration?.transactions?.push({ id: newValue.Ttr_Id, type: TransactionType.UPDATE, newValue: newValue });
      this.GridTuteur?.reflow();
      this.edittedEmitter.next(this.configuration?.data)
    }
  }


  /**
 * Used to open modal of : Grid columns hiding menu
 */
  toggleGridColumnsModal(){
    var myModal = new bootstrap.Modal(document.getElementById("TuteurHidingMenu"), {});
    myModal.toggle();
  }

  


}
