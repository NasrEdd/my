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
import { DocAdminisType } from 'src/app/models/entities-docs-admini/document-administratif-type.interface';


declare var $:any;
declare var bootstrap:any;

@Component({
  selector: 'app-documents-administratifs',
  templateUrl: './documents-administratifs.component.html',
  styleUrls: ['./documents-administratifs.component.scss'],
  host:{
    class:"position-relative col-12 d-flex flex-row m-0 p-0 mobileMinHeight"
  }
})
export class DocumentsAdministratifsComponent implements OnInit, OnDestroy, AfterViewInit {

  @ViewChild("Grid", {read : IgxGridComponent, static: true}) public Grid?: IgxGridComponent;
  transactionSub$ ?: Subscription; 

  // Paramétrage des colonnes de la grille
  gridConfig :GridConfiguration<DocAdminisType> ={ 
    data:[],
    primaryKey:'DocTypDem_ID',
    transactions: [],
    apiSet:{
      create: "../api/INS_DocTypeDemande/PostMultipleINS_DocTypeDemandeAPI",
      delete: "../api/INS_DocTypeDemande/DeleteMultipleINS_DocTypeDemandeAPI",
      update: "../api/INS_DocTypeDemande/PutMultipleINS_DocTypeDemandeAPI"
    },
    creatHandler: ()=>{},// no  add here
    deleteHandler:()=>null,// no  delete here
    edittedHandler: ()=>null,
    columns:[
      { field : 'DocTypDem_ID', header: 'ID', dataType: 'string', groupable: false, draggable: false, visible: false, sortable: false, resizable: false, filterable:false, editable:false, searchable:false, allowHide:false, width: '' },
      { field : 'DocDemande_ID', header: 'DocDemande_ID', dataType: 'string', groupable: false, draggable: false, visible: false, sortable: false, resizable: false, filterable:false, editable:false, searchable:false, allowHide:false, width: '' },
      { field : 'DocTyp_Id', header: 'DocTyp_Id', dataType: 'string', groupable: false, draggable: false, visible: false, sortable: false, resizable: false, filterable:false, editable:false, searchable:false, allowHide:false, width: '' },
      { field : 'Etd_Id', header: 'Etd_Id', dataType: 'string', groupable: false, draggable: false, visible: false, sortable: false, resizable: false, filterable:false, editable:false, searchable:false, allowHide:false, width: '' },
      { field : 'Fac_Nom', header: 'DOCSADMIN.GRIDHEADERS.FAC', dataType: 'string', groupable: true, draggable: true, visible: true, sortable: true, resizable: true, filterable: true, editable:false, searchable:true, allowHide:true, width: ''},
      { field : 'Etd_Matricule', header: 'DOCSADMIN.GRIDHEADERS.MATR', dataType: 'string', groupable: true, draggable: true, visible: true, sortable: true, resizable: true, filterable: true, editable: false, searchable:true, allowHide:true, width: ''},
      { field : 'Pers_Prenom', header: 'DOCSADMIN.GRIDHEADERS.PRENOM', dataType: 'string', groupable: true, draggable: true, visible: true, sortable: true, resizable: true, filterable: true, editable:true, searchable:true, allowHide:true, width: ''},
      { field : 'Pers_Nom', header: 'DOCSADMIN.GRIDHEADERS.NOM', dataType: 'string', groupable: true, draggable: true, visible: true, sortable: true, resizable: true, filterable: true, editable:true, searchable:true, allowHide:true, width: ''},
      { field : 'DocDemande_Num', header: 'DOCSADMIN.GRIDHEADERS.NDEMANDE', dataType: 'string', groupable: true, draggable: true, visible: true, sortable: true, resizable: true, filterable: true, editable:false, searchable:true, allowHide:true, width: ''},
      { field : 'Dem_Date', header: 'DOCSADMIN.GRIDHEADERS.DATE', dataType: 'date', groupable: true, draggable: true, visible: true, sortable: true, resizable: true, filterable: true, editable:true, searchable:true, allowHide:true, width: '', /* #Todo ; , format: "dd/MM/yyyy" */},
      { field : 'DocTyp_Nom', header: 'DOCSADMIN.GRIDHEADERS.DOC', dataType: 'string', groupable: true, draggable: true, visible: true, sortable: true, resizable: true, filterable: true, editable:false, searchable:true, allowHide:true, width: ''},
      { field : 'DocEtatDemande_Nom', header: 'DOCSADMIN.GRIDHEADERS.ETAT', dataType: 'string', groupable: true, draggable: true, visible: true, sortable: true, resizable: true, filterable: true, editable:false, searchable:true, allowHide:true, width: ''},
      { field : 'INS_DocDemande', header: 'INS_DocDemande', dataType: 'object', groupable: false, draggable: false, visible: false, sortable: false, resizable: false, filterable:false, editable:false, searchable:false, allowHide:false, width: '' },
      { field : 'INS_DocTypeDemande', header: 'INS_DocTypeDemande', dataType: 'object', groupable: false, draggable: false, visible: false, sortable: false, resizable: false, filterable:false, editable:false, searchable:false, allowHide:false, width: '' },
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
    this.translate.get('DOCSADMIN.TITLE').toPromise().then(title=>{
      this.title.setTitle(title) // set page title
      this.gridservice.currentPageSubject.next(title)
    });
    this.gridservice.canSearch = false;
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
      this.translate.get('DOCSADMIN.TITLE').toPromise().then(title=>this.title.setTitle(title) );// set page title
      this.setIgxRessourceStrings();
    })
  }

  ngOnDestroy(){
    this.loader.loaderDialogEmitter.emit( {isOpen: true});
    this.transactionSub$?.unsubscribe()
    this.gridservice.resetBtns();
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

  toggleGridColumnsModal(){
    var myModal = new bootstrap.Modal(document.getElementById('GridColumnsModal'), {});
    myModal.toggle();
  }
  
  handleRowSelection( event :any){
    alert("rows Selected")
  }


}
