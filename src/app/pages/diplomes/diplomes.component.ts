import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';
import { IgxGridComponent, Transaction } from 'igniteui-angular';
import { Subscription } from 'rxjs';
import { GridService } from 'src/app/services/grid-Service/grid-service.service';
import { LoaderService } from 'src/app/services/loader-service/loader-service.service';
import { IPaginatorResourceStrings, IGridResourceStrings, changei18n, IgxExcelExporterService, IgxExcelExporterOptions } from "igniteui-angular"; // Enable translation of the Igx-Grid Words
import { ConfirmBoxInitializer, DialogLayoutDisplay } from '@costlydeveloper/ngx-awesome-popup';
import { GridConfiguration } from 'src/app/models/GridConfiguration.interface';
import { DiplomeType } from 'src/app/models/entities-diplomes/diplome-type.interface';



declare var $:any;
declare var bootstrap:any;


@Component({
  selector: 'app-diplomes',
  templateUrl: './diplomes.component.html',
  styleUrls: ['./diplomes.component.scss'],
  host:{
    class:"position-relative col-12 d-flex flex-row m-0 p-0 mobileMinHeight"
  }
})
export class DiplomesComponent implements OnInit, OnDestroy, AfterViewInit {

  @ViewChild("Grid", {read : IgxGridComponent, static: true}) public Grid?: IgxGridComponent;
  transactionSub$ ?: Subscription; 

  // Paramétrage des colonnes de la grille
  gridConfig :GridConfiguration<DiplomeType> = {
    data:[],
    primaryKey:'EtdCycle_Id',
    transactions: [],
    apiSet:{
      create: "../api/ACD_EtudiantCycleAPI",
      delete: "../api/ACD_EtudiantCycleAPI",
      update: "../api/ACD_EtudiantCycleAPI"
    },
    creatHandler: ()=>{},// no  add here
    deleteHandler:()=>null,// no  delete here
    edittedHandler: ()=>null,
    columns:[
      { field : 'EtdCycle_Id', header: 'ID', dataType: 'string', groupable: false, draggable: false, visible: false, sortable: false, resizable: false, filterable:false, editable:false, searchable:false, allowHide:false, width: '' },
      { field : 'Pers_Id', header: 'Pers_Id', dataType: 'string', groupable: false, draggable: false, visible: false, sortable: false, resizable: false, filterable:false, editable:false, searchable:false, allowHide:false, width: '' },
      { field : 'Etd_Id', header: 'Etd_Id', dataType: 'string', groupable: false, draggable: false, visible: false, sortable: false, resizable: false, filterable:false, editable:false, searchable:false, allowHide:false, width: '' },
      { field : 'Cycle_Id', header: 'Cycle_Id', dataType: 'string', groupable: false, draggable: false, visible: false, sortable: false, resizable: false, filterable:false, editable:false, searchable:false, allowHide:false, width: '' },
      { field : 'Ann_Id', header: 'Ann_Id', dataType: 'string', groupable: false, draggable: false, visible: false, sortable: false, resizable: false, filterable:false, editable:false, searchable:false, allowHide:false, width: '' },
      { field : 'Fac_Id', header: 'Fac_Id', dataType: 'string', groupable: false, draggable: false, visible: false, sortable: false, resizable: false, filterable:false, editable:false, searchable:false, allowHide:false, width: '' },
      { field : 'Mtn_Id', header: 'Mtn_Id', dataType: 'string', groupable: false, draggable: false, visible: false, sortable: false, resizable: false, filterable:false, editable:false, searchable:false, allowHide:false, width: '' },
      { field : 'PersAdm_Id', header: 'PersAdm_Id', dataType: 'string', groupable: false, draggable: false, visible: false, sortable: false, resizable: false, filterable:false, editable:false, searchable:false, allowHide:false, width: '' },
      { field : 'Prg_Id', header: 'Prg_Id', dataType: 'string', groupable: false, draggable: false, visible: false, sortable: false, resizable: false, filterable:false, editable:false, searchable:false, allowHide:false, width: '' },
      { field : 'Ses_Id', header: 'Ses_Id', dataType: 'string', groupable: false, draggable: false, visible: false, sortable: false, resizable: false, filterable:false, editable:false, searchable:false, allowHide:false, width: '' },
      { field : 'Spec_Id', header: 'Spec_Id', dataType: 'string', groupable: false, draggable: false, visible: false, sortable: false, resizable: false, filterable:false, editable:false, searchable:false, allowHide:false, width: '' },
      

      { field : 'Etd_Matricule', header: 'DIPLOMES.GRIDHEADERS.MATR', dataType: 'string', groupable: true, draggable: true, visible: true, sortable: true, resizable: true, filterable: true, editable: false, searchable:true, allowHide:true, width: ''},
      { field : 'Pers_Prenom', header: 'DIPLOMES.GRIDHEADERS.PRENOM', dataType: 'string', groupable: true, draggable: true, visible: true, sortable: true, resizable: true, filterable: true, editable:false, searchable:true, allowHide:true, width: ''},
      { field : 'Pers_Nom', header: 'DIPLOMES.GRIDHEADERS.NOM', dataType: 'string', groupable: true, draggable: true, visible: true, sortable: true, resizable: true, filterable: true, editable:false, searchable:true, allowHide:true, width: ''},
      { field : 'Pers_DateNaissance', header: 'DIPLOMES.GRIDHEADERS.DATENAISS', dataType: 'date', groupable: true, draggable: true, visible: true, sortable: true, resizable: true, filterable: true, editable:false, searchable:true, allowHide:true, width: '', /* #Todo : format: "dd/MM/yyyy"  */},
      { field : 'Crd_LieuDeNaissance', header: 'DIPLOMES.GRIDHEADERS.LIEUNAISS', dataType: 'string', groupable: true, draggable: true, visible: false, sortable: true, resizable: true, filterable: true, editable:false, searchable:true, allowHide:true, width: ''},
      { field : 'Pers_CINOUPASS', header: 'DIPLOMES.GRIDHEADERS.CINOUPASS', dataType: 'string', groupable: false, draggable: true, visible: false, sortable: true, resizable: true, filterable: true, editable:false, searchable:true, allowHide:true, width: ''},
      { field : 'Prg_Nom', header: 'DIPLOMES.GRIDHEADERS.PROGRAM', dataType: 'string', groupable: true, draggable: true, visible: true, sortable: true, resizable: true, filterable: true, editable:false, searchable:true, allowHide:true, width: ''},
      { field : 'Spec_Name', header: 'DIPLOMES.GRIDHEADERS.SPECIALITY', dataType: 'string', groupable: true, draggable: true, visible: true, sortable: true, resizable: true, filterable: true, editable:false, searchable:true, allowHide:true, width: ''},
      //{ field : 'Option_Name', header: 'DIPLOMES.GRIDHEADERS.OPTION', dataType: 'string', groupable: true, draggable: true, visible: true, sortable: true, resizable: true, filterable: true, editable:false, searchable:true, allowHide:true, width: ''},
      { field : 'Fac_Nom', header: 'DIPLOMES.GRIDHEADERS.FACULTY', dataType: 'string', groupable: true, draggable: true, visible: true, sortable: true, resizable: true, filterable: true, editable:false, searchable:true, allowHide:true, width: ''},
      { field : 'Cycle_Nom', header: 'DIPLOMES.GRIDHEADERS.CYCLE', dataType: 'string', groupable: true, draggable: true, visible: true, sortable: true, resizable: true, filterable: true, editable:false, searchable:true, allowHide:true, width: ''},
      { field : 'Ann_Nom', header: 'DIPLOMES.GRIDHEADERS.ANNEE', dataType: 'string', groupable: true, draggable: true, visible: true, sortable: true, resizable: true, filterable: true, editable:false, searchable:true, allowHide:true, width: ''},
      //{ field : 'EstNouveauDiplome', header: 'DIPLOMES.GRIDHEADERS.NEWDIPL', dataType: 'string', groupable: true, draggable: true, visible: true, sortable: true, resizable: true, filterable: true, editable:false, searchable:true, allowHide:true, width: ''},
      { field : 'EtdCycle_NumDiplome', header: 'DIPLOMES.GRIDHEADERS.NUMDIPL', dataType: 'string', groupable: false, draggable: false, visible: true, sortable: true, resizable: true, filterable: true, editable:false, searchable:true, allowHide:true, width: ''},
      { field : 'EtdCycle_Session', header: 'DIPLOMES.GRIDHEADERS.SESSION', dataType: 'string', groupable: true, draggable: true, visible: true, sortable: true, resizable: true, filterable: true, editable:false, searchable:true, allowHide:true, width: ''},
      { field : 'Mtn_Nom', header: 'DIPLOMES.GRIDHEADERS.MENTION', dataType: 'string', groupable: true, draggable: true, visible: true, sortable: true, resizable: true, filterable: true, editable:false, searchable:true, allowHide:true, width: ''},
      { field : 'EtdCycle_EstDiplome', header: 'DIPLOMES.GRIDHEADERS.ESTDILP', dataType: 'boolean', groupable: true, draggable: true, visible: true, sortable: true, resizable: true, filterable: true, editable:false, searchable:true, allowHide:false, width: ''},

      // champs arabes
      { field : 'ARPers_Prenom', header: 'DIPLOMES.GRIDHEADERS.PRENOM_AR', dataType: 'string', groupable: true, draggable: true, visible: true, sortable: true, resizable: true, filterable: true, editable:false, searchable:true, allowHide:true, width: ''},
      { field : 'ARPers_Nom', header: 'DIPLOMES.GRIDHEADERS.NOM_AR', dataType: 'string', groupable: true, draggable: true, visible: true, sortable: true, resizable: true, filterable: true, editable:false, searchable:true, allowHide:true, width: ''},
      { field : 'ARCrd_LieuNaissance', header: 'DIPLOMES.GRIDHEADERS.LIEUNAISS_AR', dataType: 'string', groupable: true, draggable: true, visible: true, sortable: true, resizable: true, filterable: true, editable:false, searchable:true, allowHide:true, width: ''},
      
      { field : 'ARSpec_Name', header: 'DIPLOMES.GRIDHEADERS.SPECIALITY_AR', dataType: 'string', groupable: true, draggable: true, visible: true, sortable: true, resizable: true, filterable: true, editable:false, searchable:true, allowHide:true, width: ''},
      { field : 'AROption_Name', header: 'DIPLOMES.GRIDHEADERS.FACULTY_AR', dataType: 'date', groupable: true, draggable: true, visible: true, sortable: true, resizable: true, filterable: true, editable:false, searchable:true, allowHide:true, width: ''},
      //{ field : 'ARAnn_Nom', header: 'عام', dataType: 'string', groupable: true, draggable: true, visible: true, sortable: true, resizable: true, filterable: true, editable:false, searchable:true, allowHide:true, width: ''},
      

      { field : 'ArEtdCycle_Session', header: 'DIPLOMES.GRIDHEADERS.ANNEE_AR', dataType: 'string', groupable: true, draggable: true, visible: true, sortable: true, resizable: true, filterable: true, editable:false, searchable:true, allowHide:true, width: ''},
      { field : 'ARMtn_Nom', header: 'DIPLOMES.GRIDHEADERS.MENTION_AR', dataType: 'string', groupable: true, draggable: true, visible: true, sortable: true, resizable: true, filterable: true, editable:false, searchable:true, allowHide:true, width: ''},


      // autres champs
      { field : 'Dlb_Date', header: 'Dlb_Date', dataType: 'string', groupable: false, draggable: false, visible: false, sortable: false, resizable: false, filterable:false, editable:false, searchable:false, allowHide:false, width: '' },
      { field : 'EtdCycle_Moyenne', header: 'DIPLOMES.GRIDHEADERS.MOYENNE', dataType: 'number', groupable: true, draggable: true, visible: false, sortable: true, resizable: true, filterable:true, editable:false, searchable:true, allowHide:true, width: '' },
      { field : 'EtdCycle_Remarque', header: 'DIPLOMES.GRIDHEADERS.REMARQ', dataType: 'string', groupable: false, draggable: false, visible: false, sortable: false, resizable: false, filterable:false, editable:false, searchable:false, allowHide:false, width: '' },
      { field : 'EtdCycle_ValidManuelle', header: 'DIPLOMES.GRIDHEADERS.VALIDMANUEL', dataType: 'boolean', groupable: true, draggable: true, visible: false, sortable: true, resizable: true, filterable:true, editable:false, searchable:false, allowHide:true, width: '' },
      { field : 'EtdCycle_Valide', header: 'EtdCycle_Valide', dataType: 'string', groupable: false, draggable: false, visible: false, sortable: false, resizable: false, filterable:false, editable:false, searchable:false, allowHide:false, width: '' },
      { field : 'EtdCycle_VisaBib', header: 'EtdCycle_VisaBib', dataType: 'string', groupable: false, draggable: false, visible: false, sortable: false, resizable: false, filterable:false, editable:false, searchable:false, allowHide:false, width: '' },
      { field : 'EtdCycle_VisaControl', header: 'EtdCycle_VisaControl', dataType: 'string', groupable: false, draggable: false, visible: false, sortable: false, resizable: false, filterable:false, editable:false, searchable:false, allowHide:false, width: '' },
      { field : 'EtdCycle_VisaLog', header: 'EtdCycle_VisaLog', dataType: 'string', groupable: false, draggable: false, visible: false, sortable: false, resizable: false, filterable:false, editable:false, searchable:false, allowHide:false, width: '' },
      { field : 'EtdCycle_VisaPaie', header: 'EtdCycle_VisaPaie', dataType: 'string', groupable: false, draggable: false, visible: false, sortable: false, resizable: false, filterable:false, editable:false, searchable:false, allowHide:false, width: '' },
      { field : 'EtdCycle_VisaRespons', header: 'EtdCycle_VisaRespons', dataType: 'string', groupable: false, draggable: false, visible: false, sortable: false, resizable: false, filterable:false, editable:false, searchable:false, allowHide:false, width: '' },
      { field : 'EtdtCycl_TimeStamp', header: 'EtdtCycl_TimeStamp', dataType: 'string', groupable: false, draggable: false, visible: false, sortable: false, resizable: false, filterable:false, editable:false, searchable:false, allowHide:false, width: '' },
      { field : 'Spec_Option', header: 'Spec_Option', dataType: 'string', groupable: false, draggable: false, visible: false, sortable: false, resizable: false, filterable:false, editable:false, searchable:false, allowHide:false, width: '' },
      { field : 'Nation_Nom', header: 'DIPLOMES.GRIDHEADERS.NATIONALITE', dataType: 'string', groupable: true, draggable: true, visible: false, sortable: true, resizable: true, filterable:true, editable:false, searchable:false, allowHide:true, width: '' },
    ]
  };

  langSubc$ ?: Subscription; 

  // Ressource strings to translate igx-grid words globally from layout : 
  private gridRessourceStrings : IGridResourceStrings = {
    igx_grid_groupByArea_message: ""
  }
  private paginatorResourceStrings: IPaginatorResourceStrings = {
    igx_paginator_label: "",
    igx_paginator_pager_text: "",
  };


  constructor( 
    private loader: LoaderService, 
    public gridservice :GridService, 
    public translate: TranslateService, 
    private title:Title,
    private excelExportService: IgxExcelExporterService) {
    this.translate.get('DIPLOMES.TITLE').toPromise().then(title=>{
      this.title.setTitle(title)// set page title
      this.gridservice.currentPageSubject.next(title)
    });
  }
  
  ngOnInit(): void {
    $(document).ready( ()=>{
      this.loader.loaderDialogEmitter.emit( {isOpen: false}); 
    })
    this.setIgxRessourceStrings();
  }

  ngAfterViewInit(): void {
    this.gridConfig.transactions = this.Grid?.transactions.getAggregatedChanges(true)!;
    this.transactionSub$ = this.Grid?.transactions.onStateUpdate?.subscribe(() => {
      this.gridConfig.transactions = this.Grid?.transactions.getAggregatedChanges(true)!;
      this.gridservice.canRedo = this.Grid?.transactions.canRedo!;
      this.gridservice.canUndo = this.Grid?.transactions.canUndo! ;
    });
    this.langSubc$ = this.translate.onLangChange.subscribe( val=>{
      this.translate.get('DIPLOMES.TITLE').toPromise().then(title=>this.title.setTitle(title) );// set page title
      this.setIgxRessourceStrings();
    })
  }
  
  ngOnDestroy(){
    this.loader.loaderDialogEmitter.emit( {isOpen: true});
    this.transactionSub$?.unsubscribe();
    this.langSubc$?.unsubscribe();
  }

  private setIgxRessourceStrings(){
    this.translate.get('GRIDSTRINGS').toPromise().then( e=>{
      this.gridRessourceStrings.igx_grid_groupByArea_message = e.GROUPINGAREA.AREAMSG;
      this.gridRessourceStrings.igx_grid_row_edit_btn_done = e.GRID.EDITBTNDONE ;
      this.gridRessourceStrings.igx_grid_row_edit_btn_cancel = e.GRID.EDITBTNCANCEL ;
      this.gridRessourceStrings.igx_grid_filter = e.GRID.FILTERKEYWORD;
      this.gridRessourceStrings.igx_grid_filter_row_close = e.GRID.FILTERROWCLOSE;
      this.gridRessourceStrings.igx_grid_filter_row_reset = e.GRID.FILTERROWRESET;
      this.gridRessourceStrings.igx_grid_filter_row_placeholder = e.GRID.FILTERINPTPLACEHOLDER;
      changei18n(this.gridRessourceStrings);
    })
    this.translate.get('PAGINATIONSTRINGS').toPromise().then( e=>{
      this.paginatorResourceStrings.igx_paginator_label = e.PAGINATORLABEL;
      this.paginatorResourceStrings.igx_paginator_pager_text = e.PAGERTEXT;
      changei18n(this.paginatorResourceStrings);
    })
  }

  async generateExcel(){
    if(!this.gridConfig.data.length){
      const confirmBox = new ConfirmBoxInitializer();
      // Choose layout color type
      confirmBox.setConfig({
          LayoutType: DialogLayoutDisplay.INFO // SUCCESS | INFO | NONE | DANGER | WARNING
      });
      await this.translate.get("MODALCONFIRM.NODATATOEXPORT").toPromise().then(e=>{
        confirmBox.setTitle(e.headerTitle);
        confirmBox.setMessage(e.bodyText);
        confirmBox.setButtonLabels( e.closeBtnText ); 
        confirmBox.openConfirmBox$();
      })
      return;
    }
    this.loader.loaderDialogEmitter.emit({ isOpen: true});
    let excelOptions = new IgxExcelExporterOptions( this.title.getTitle()+'-'+(new Date()).toDateString() );
    this.excelExportService.export( this.Grid, excelOptions);
    this.loader.loaderDialogEmitter.emit({ isOpen: false});
  }

  GetData(){
  }

  clearData(){
  }

  handleRowSelection( event :any){
    alert("rows Selected")
  }

  toggleGridColumnsModal(){
    var myModal = new bootstrap.Modal(document.getElementById('GridColumnsModal'), {});
    myModal.toggle();
  }

}
