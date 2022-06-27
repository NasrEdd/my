import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { Moyenrecrutem as MoyenrecrutemType } from 'src/app/models/entities-dossier-etudiant/moyenrecrutem.interface';
import { GridConfiguration } from 'src/app/models/GridConfiguration.interface';
import { IgxGridComponent, TransactionType } from 'igniteui-angular';
import { v4 as uuid4 } from 'uuid';
import { createToolTips } from 'src/app/Classes/Helpers';

declare var bootstrap:any, $:any;


@Component({
  selector: 'app-moyenrecutem-section',
  templateUrl: './moyenrecutem-section.component.html',
  styleUrls: ['./moyenrecutem-section.component.scss']
})
export class MoyenrecutemSectionComponent implements OnInit {


  @ViewChild("GridMoyensrecrutem", {read : IgxGridComponent}) public GridMoyensrecrutem?: IgxGridComponent;
  @Input('configuration') configuration ?: GridConfiguration<MoyenrecrutemType>;
  @Output('edittedEmitter') edittedEmitter : EventEmitter<MoyenrecrutemType[]> = new EventEmitter<MoyenrecrutemType[]>();


  constructor() { 
  }

  ngOnInit(): void {
    createToolTips();
  }

  rowEditDone( event:any){
    if(event.newValue){
      const newValue = event.newValue;
      this.configuration?.transactions?.push({ id: newValue.EtdForm_Id, type: TransactionType.UPDATE, newValue: newValue });
      this.GridMoyensrecrutem?.reflow();
      this.edittedEmitter.next(this.configuration?.data)
    }
  }

  


}
