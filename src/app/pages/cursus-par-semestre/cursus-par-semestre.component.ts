import { AfterViewInit, Component, HostListener, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';
import { IgxGridComponent, IgxTransactionService, Transaction, TransactionType, IgxExcelExporterService, IgxExcelExporterOptions } from 'igniteui-angular';
import { Subscription } from 'rxjs';
import { GridService } from 'src/app/services/grid-Service/grid-service.service';
import { LoaderService } from 'src/app/services/loader-service/loader-service.service';
import { Association as AssociationType } from 'src/app/models/entities-cursus-par-semestre/association.interface';

import {
  DialogLayoutDisplay,
  ConfirmBoxInitializer
} from '@costlydeveloper/ngx-awesome-popup';
import { IPaginatorResourceStrings, IGridResourceStrings, changei18n } from "igniteui-angular"; // Enable translation of the Igx-Grid Words
import { CursusParSem_MainGrid as mainData, CursusParSem_RightGrid as semestersImportedData } from "src/app/pages/TestingData";
import { GridConfiguration } from 'src/app/models/GridConfiguration.interface';
import { canComponentDeactivate } from 'src/app/guards/leaving-confirmation/leaving-confirmation.guard';

declare var $:any;
declare var bootstrap:any;

@Component({
  selector: 'app-cursus-par-semestre',
  templateUrl: './cursus-par-semestre.component.html',
  styleUrls: ['./cursus-par-semestre.component.scss'],
  providers: [ IgxTransactionService], 
  host:{
    class:"position-relative col-12 d-flex flex-row m-0 p-0 mobileMinHeight"
  }
})
export class CursusParSemestreComponent implements OnInit, OnDestroy, canComponentDeactivate, AfterViewInit {

  @ViewChild("StudentsGrid", {read : IgxGridComponent, static: true}) public studentsGride?: IgxGridComponent;
  public transactions: Transaction[] = [];


  // Paramétrage des colonnes de la grille
  gridConfig :GridConfiguration<AssociationType> = {
    primaryKey: 'EtdSpecSms_Id',
    data:[],
    apiSet:{
      create: '',
      update: '',
      delete: ''
    },
    creatHandler: ()=>undefined,
    edittedHandler: ()=>undefined,
    deleteHandler: ()=>undefined,
    columns: [
    { header: 'CURSUSPARSEM.GRIDHEADERS.GRP1.TITLE', resizable:true, sortable:true, filterable:true, collapsible:true, Columns: [
      { header: "EtdSpecSms_Id", field: "EtdSpecSms_Id", dataType: "string", visible: false, allowHide: false },
      { header: "EtdPrg_Id", field: "EtdPrg_Id", dataType: "string", visible: false, allowHide: false },
      { field : 'Etd_Matricule', header: 'CURSUSPARSEM.GRIDHEADERS.GRP1.MATR', dataType: 'string', groupable: true, draggable: true, visible: true, sortable: true, resizable: true, filterable: true, editable: false, searchable:true, visibleWhenCollapsed:true, allowHide: false, width: ''},
      { field : 'Etd_Matricule', header: 'CURSUSPARSEM.GRIDHEADERS.GRP1.MATR', dataType: 'string', groupable: true, draggable: true, visible: true, sortable: true, resizable: true, filterable: true, editable: false, searchable:true, visibleWhenCollapsed:false, allowHide: true, width: ''},
      { field : 'Pers_Nom', header: 'CURSUSPARSEM.GRIDHEADERS.GRP1.NOM', dataType: 'string', groupable: true, draggable: true, visible: true, sortable: true, resizable: true, filterable: true, editable:false, searchable:true,  visibleWhenCollapsed:false, allowHide:true, width: ''},
      { field : 'Pers_Prenom', header: 'CURSUSPARSEM.GRIDHEADERS.GRP1.PRENOM', dataType: 'string', groupable: true, draggable: true, visible: true, sortable: true, resizable: true, filterable: true, editable:false, searchable:true, visibleWhenCollapsed:false, allowHide:true, width: ''},
    ]},
    {  header: 'CURSUSPARSEM.GRIDHEADERS.GRP2.TITLE', resizable:true, sortable:true, filterable:true, collapsible:true, Columns: [
      { field : 'Prg_Code', header: 'CURSUSPARSEM.GRIDHEADERS.GRP2.PROG_CODE', dataType: 'string', groupable: true, draggable: true, visible: true, sortable: true, resizable: true, filterable: true, editable:false, searchable:true, visibleWhenCollapsed:true, allowHide: true, width: ''},
      { field : 'Prg_Code', header: 'CURSUSPARSEM.GRIDHEADERS.GRP2.PROG_CODE', dataType: 'string', groupable: true, draggable: true, visible: true, sortable: true, resizable: true, filterable: true, editable:false, searchable:true, visibleWhenCollapsed:false, allowHide: true,  width: ''},
      { field : 'Prg_Nom', header: 'CURSUSPARSEM.GRIDHEADERS.GRP2.PROG_NOM', dataType: 'string', groupable: true, draggable: true, visible: true, sortable: true, resizable: true, filterable: true, editable:false, searchable:true, visibleWhenCollapsed:false, allowHide: true, width: ''},
      { field : 'Fac_Nom', header: 'CURSUSPARSEM.GRIDHEADERS.GRP2.FAC', dataType: 'string', groupable: true, draggable: true, visible: true, sortable: true, resizable: true, filterable: true, editable:false, searchable:true, visibleWhenCollapsed:false, allowHide: true, width: ''},
      { field : 'AdmPrg_Code', header: 'CURSUSPARSEM.GRIDHEADERS.GRP2.ADMPROGCODE', dataType: 'string', groupable: true, draggable: true, visible: false, sortable: true, resizable: true, filterable: true, editable:false, searchable:true, visibleWhenCollapsed:false, allowHide: true, width: ''},
      { field : 'AdmPrg_Nom', header: 'CURSUSPARSEM.GRIDHEADERS.GRP2.ADMPROGNOM', dataType: 'string', groupable: true, draggable: true, visible: false, sortable: true, resizable: true, filterable: true, editable:false, searchable:true, visibleWhenCollapsed:false, allowHide: true, width: ''}
    ]},
    { header: 'CURSUSPARSEM.GRIDHEADERS.GRP3.TITLE', resizable:true, sortable:true, filterable:true, collapsible:true, Columns: [
      { field : 'Spec_Name', header: 'CURSUSPARSEM.GRIDHEADERS.GRP3.SPECIALITE', dataType: 'string', groupable: true, draggable: true, visible: true, sortable: true, resizable: true, filterable: true, editable:false, searchable:true, visibleWhenCollapsed:true, allowHide:false, width: ''},
      { field : 'Spec_Name', header: 'CURSUSPARSEM.GRIDHEADERS.GRP3.SPECIALITE', dataType: 'string', groupable: true, draggable: true, visible: true, sortable: true, resizable: true, filterable: true, editable:false, searchable:true, visibleWhenCollapsed:false, allowHide:true, width: ''},
      { field: "Niv_Id", header: "Niv_Id", dataType: "string", visible: false, allowHide: false },
      { field : 'Niv_Nom', header: 'CURSUSPARSEM.GRIDHEADERS.GRP3.NIVEAU', dataType: 'string', groupable: true, draggable: true, visible: true, sortable: true, resizable: true, filterable: true, editable:false, searchable:true, visibleWhenCollapsed:false, allowHide: true, width: ''},
      { field : 'Sms_Nom', header: 'CURSUSPARSEM.GRIDHEADERS.GRP3.SEM', dataType: 'number', groupable: true, draggable: true, visible: true, sortable: true, resizable: true, filterable: true, editable:false, searchable:true, visibleWhenCollapsed:false, allowHide: true, width: ''},
      { field : 'Sess_Nom', header: 'CURSUSPARSEM.GRIDHEADERS.GRP3.PERIODE', dataType: 'string', groupable: true, draggable: true, visible: true, sortable: true, resizable: true, filterable: true, editable:false, searchable:true, visibleWhenCollapsed:false, allowHide: true, width: ''},
      { field: "Ann_Id", header: "Ann_Id", dataType: "string", visible: false, allowHide: false },
      { field : 'Ann_Nom', header: 'CURSUSPARSEM.GRIDHEADERS.GRP3.ANNEE', dataType: 'string', groupable: true, draggable: true, visible: true, sortable: true, resizable: true, filterable: true, editable:false, searchable:true, visibleWhenCollapsed:false, allowHide: true, width: ''},
      { field : 'EtdSpecSms_Moyenne', header: 'CURSUSPARSEM.GRIDHEADERS.GRP3.MOYENNE', dataType: 'number', groupable: true, draggable: true, visible: true, sortable: true, resizable: true, filterable: true, editable:false, searchable:true, visibleWhenCollapsed:false, allowHide: true, width: ''},
      { field : 'EtdSpecSms_Validation', header: 'CURSUSPARSEM.GRIDHEADERS.GRP3.VALIDE', dataType: 'bool', groupable: true, draggable: true, visible: true, sortable: true, resizable: true, filterable: true, editable:false, searchable:true, visibleWhenCollapsed:false, allowHide: true, width: ''},
      { field : 'ProgEtdStatu_Nom', header: 'CURSUSPARSEM.GRIDHEADERS.GRP3.STAT', dataType: 'string', groupable: true, draggable: true, visible: true, sortable: true, resizable: true, filterable: true, editable:false, searchable:true, visibleWhenCollapsed:false, allowHide:true, width: ''},
      { field : 'EtdSpecSms_Remarque', header: 'CURSUSPARSEM.GRIDHEADERS.GRP3.REMARQ', dataType: 'string', groupable: true, draggable: true, visible: true, sortable: true, resizable: true, filterable: true, editable:false, searchable:true, visibleWhenCollapsed:false, allowHide:true, width: ''},
      { field : 'SpecSmsSess_Id', header: 'SpecSmsSess_Id', dataType: 'string', groupable: false, draggable: false, visible: false, sortable: false, resizable: false, filterable: false, editable:false, searchable:false, visibleWhenCollapsed:false, allowHide:false, width: ''},
      { field : 'ProgEtdStatu_Id', header: 'ProgEtdStatu_Id', dataType: 'string', groupable: false, draggable: false, visible: false, sortable: false, resizable: false, filterable: false, editable:false, searchable:false, visibleWhenCollapsed:false, allowHide:false, width: ''},
      { field : 'GrpSpecSmsSess_Id', header: 'GrpSpecSmsSess_Id', dataType: 'string', groupable: false, draggable: false, visible: false, sortable: false, resizable: false, filterable: false, editable:false, searchable:false, visibleWhenCollapsed:false, allowHide:false, width: ''},
      { field : 'Spec_Id', header: 'Spec_Id', dataType: 'string', groupable: false, draggable: false, visible: false, sortable: false, resizable: false, filterable: false, editable:false, searchable:false, visibleWhenCollapsed:false, allowHide:false, width: ''},
    ]}
  ]};


  transactionSub$ ?: Subscription; 
  langSubsc$ ?: Subscription; 
  undoSubsc$ ?: Subscription; 
  redoSubsc$ ?: Subscription; 
  saveSubc$ ?: Subscription; 
  langSubc$ ?: Subscription; 

  newPkIdCounter :number =1;

  modeAssociation : boolean=false;
  semestersData : any[] = [];

  // Ressource strings to translate igx-grid words globally from layout : 
  private gridRessourceStrings : IGridResourceStrings = {
    igx_grid_groupByArea_message: ""
  }
  private paginatorResourceStrings: IPaginatorResourceStrings = {
    igx_paginator_label: "",
    igx_paginator_pager_text: "",
  };

  gridHeight ?:number;

  constructor( 
    private loader: LoaderService, 
    public gridservice :GridService, 
    public translate: TranslateService, 
    private title:Title, 
    private excelExportService: IgxExcelExporterService) {
    this.translate.get('CURSUSPARSEM.TITLE').toPromise().then(title=>{
      this.title.setTitle(title) // set page title
      this.gridservice.currentPageSubject.next(title)
    });
  }


  ngOnInit(): void {
    $(document).ready( ()=>{
      // delete next Lines later
      this.semestersData = semestersImportedData;
      this.loader.loaderDialogEmitter.emit( {isOpen: false});
    })
    this.setIgxRessourceStrings();
  }

  ngAfterViewInit():void{
    this.transactions = this.studentsGride?.transactions.getAggregatedChanges(true)!;
    this.transactionSub$ = this.studentsGride?.transactions.onStateUpdate?.subscribe(() => {
      this.transactions = this.studentsGride?.transactions.getAggregatedChanges(true)!;
      this.gridservice.canRedo = this.studentsGride?.transactions.canRedo!;
      this.gridservice.canUndo = this.studentsGride?.transactions.canUndo! ;
      this.gridservice.canSave = this.transactions.length>0;
    });
    this.undoSubsc$ = this.gridservice.undoSubject.subscribe(e=>{this.studentsGride?.transactions.undo(); });
    this.redoSubsc$ = this.gridservice.redoSubject.subscribe(e=>{this.studentsGride?.transactions.redo(); });
    this.saveSubc$ = this.gridservice.saveSubject.subscribe(e=>{ 
      alert("SaveClicked");
      console.log(".getAggregatedChanges(true): ", this.studentsGride?.transactions.getAggregatedChanges(true))
    });
    this.langSubc$ = this.translate.onLangChange.subscribe( val=>{
      this.translate.get('CURSUSPARSEM.TITLE').toPromise().then(title=>this.title.setTitle(title) );// set page title
      this.setIgxRessourceStrings();
    })
  }

  ngOnDestroy(){
    this.loader.loaderDialogEmitter.emit( {isOpen: true});
    this.transactionSub$?.unsubscribe()
    this.langSubsc$?.unsubscribe();
    this.undoSubsc$?.unsubscribe();
    this.redoSubsc$?.unsubscribe();
    this.saveSubc$?.unsubscribe();
    this.langSubc$?.unsubscribe();
    this.gridservice.resetBtns();
  }

  

  async confirmLeaving(){
    if( this.studentsGride && this.studentsGride!.transactions.getAggregatedChanges(true).length > 0 ){
      const confirmBox = new ConfirmBoxInitializer();
      await this.translate.get("MODALCONFIRM.LEAVING_MSGS").toPromise().then(e=>{
        confirmBox.setTitle( e.headerTitle );
        confirmBox.setMessage(e.bodyText);
        confirmBox.setButtonLabels( e.confirmBtnText, e.closeBtnText);
        confirmBox.setConfig({
          LayoutType: DialogLayoutDisplay.WARNING // SUCCESS | INFO | NONE | DANGER | WARNING
        });
      })
      let promise: Promise<boolean> = new  Promise<boolean>((resolve, reject)=>{
        const subscription = confirmBox.openConfirmBox$().subscribe(resp => {
          resolve( resp.Success )
          subscription.unsubscribe();
        });
      })
      let result:boolean = await promise;
      return result
    }
    return true;
  }

  
  @HostListener('window:beforeunload', ['$event'])
  public async handleReloadAction(event:any) {
    if( (this.studentsGride!=undefined && this.studentsGride!.transactions.getAggregatedChanges(true).length > 0) ){
      event.preventDefault();
      await this.translate.get("MODALCONFIRM.LEAVING_MSGS").toPromise().then(msg=>{ 
        event.returnValue = true;// Gecko, WebKit, Chrome <34
      })
    }
    event.preventDefault();
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

  async GetData(){
    /*
      TO cancel a request have a look at :  https://stackoverflow.com/questions/36490926/how-to-cancel-a-httprequest-in-angular-2 
    */
      let confirmDataClear :boolean = await this.clearData(); 
      if( ! confirmDataClear )
        return;
      var loaderSubscrition:any;
      let dataPromise : Promise <any[]> = new Promise <any[]>( resolve=>{
        let timeOutThing : any ;
        this.loader.loaderDialogEmitter.emit({ isOpen: true, isCancelable: true});  // open loader
        loaderSubscrition = this.loader.loaderCancelEmitter.subscribe( (val :any)=>{ 
          clearTimeout(timeOutThing);
          console.log( " Request Canceled ! data : ",val ); 
          resolve([]);
        });
        timeOutThing = setTimeout( ()=>{
          loaderSubscrition.unsubscribe();
          resolve(mainData);
          }, 900)
      })
  
      this.gridConfig.data= await dataPromise ;
      this.newPkIdCounter = this.gridConfig.data.length+1;
      loaderSubscrition?.unsubscribe();
      this.loader.loaderDialogEmitter.emit({ isOpen: false }); // close loader
  }

  async clearData(){
    if( this.studentsGride && this.studentsGride!.transactions.getAggregatedChanges(true).length > 0 ){
      const confirmBox = new ConfirmBoxInitializer();
      // Choose layout color type
      confirmBox.setConfig({
          LayoutType: DialogLayoutDisplay.WARNING // SUCCESS | INFO | NONE | DANGER | WARNING
      });
      await this.translate.get("MODALCONFIRM.CLEARDATA_MSGS").toPromise().then(e=>{
        confirmBox.setTitle(e.headerTitle);
        confirmBox.setMessage(e.bodyText);
        confirmBox.setButtonLabels( e.confirmBtnText, e.closeBtnText);
      })
      let promise: Promise<boolean> = new  Promise<boolean>((resolve, reject)=>{
        const subscription = confirmBox.openConfirmBox$().subscribe(resp => {
          resolve(resp.Success);
          subscription.unsubscribe();
        });
      })
      let result:boolean = await promise;
      if(result == false) return false;
    }

    this.studentsGride?.deselectAllRows();
    this.studentsGride?.transactions.clear();
    this.gridConfig.data=[];
    return true;
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
    this.excelExportService.export( this.studentsGride, excelOptions);
    this.loader.loaderDialogEmitter.emit({ isOpen: false});
  }

  /**
     * Used to open modal of : Grid columns hiding menu
     */
  toggleGridColumnsModal(){
    var myModal = new bootstrap.Modal(document.getElementById('GridColumnsModal'), {});
    myModal.toggle();
  }


  deleteRows(){
    this.studentsGride?.selectedRows.forEach(rowNum=>{
      const deleteTransaction: Transaction = {
        id: rowNum,
        type: TransactionType.DELETE,
        newValue: null
      };
      let deletedItem : AssociationType|null = this.studentsGride?.transactions.getAggregatedValue( rowNum, true);
      if( deletedItem!=null )
        this.studentsGride?.transactions.add( deleteTransaction, deletedItem); 
      else
        this.studentsGride?.transactions.add( deleteTransaction, this.getItemByid(rowNum) ); 
    })
    this.studentsGride?.deselectAllRows();
    this.studentsGride?.reflow();
  }

  private getItemByid( id: string):AssociationType|undefined{
    for( let i=0; i< this.gridConfig.data.length; i++)
      if( this.gridConfig.data[i].EtdSpecSms_Id==id )
      return this.gridConfig.data[i];
    return undefined;
  }


  handleRowSelection( event :any){
  }
  

  

  addRows( rows :any[]){
    this.loader.loaderDialogEmitter.emit({ isOpen: true});
    let proimse = new Promise<void>(resolve=>{
      for( let row of rows){
        this.studentsGride?.transactions.add({ id: row.EtdSpecSms_Id, type: TransactionType.ADD, newValue: row })
      }
    }).then(()=>{
    this.loader.loaderDialogEmitter.emit({ isOpen: false});
    })
  }


  openAssociationMode(){
    this.loader.loaderDialogEmitter.emit({ isOpen: true});
    $('#collapsingSearchArea').removeClass('show');
    this.modeAssociation = true;
  }
  closeAssociationMode(event:any){
    this.modeAssociation = false;
    this.loader.loaderDialogEmitter.emit({ isOpen: false});
  }

}
