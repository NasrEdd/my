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
import { CursusParNiveauEntity as CursusParNiveauEntityType } from 'src/app/models/entities-cursus-par-niveau/cursusParNiveau.interface';


declare var $:any;
declare var bootstrap:any;

@Component({
  selector: 'app-cursus-par-niveau',
  templateUrl: './cursus-par-niveau.component.html',
  styleUrls: ['./cursus-par-niveau.component.scss'],
  host:{
    class:"position-relative col-12 d-flex flex-row m-0 p-0 mobileMinHeight"
  }
})
export class CursusParNiveauComponent implements OnInit, OnDestroy, AfterViewInit {

  @ViewChild("StudentsGrid", {read : IgxGridComponent, static: true}) public studentsGride?: IgxGridComponent;
  transactionSub$ ?: Subscription; 

  // Paramétrage des colonnes de la grille
  gridConfig :GridConfiguration<CursusParNiveauEntityType> = {
    data:[],
    primaryKey: "EtdSpecAnn_Id",
    apiSet:{
      create:"../api/ACD_EtudiantSpecialiteAnnee/PostMultipleACD_EtudiantSpecialiteAnneeAPI",
      delete: "../api/ACD_EtudiantSpecialiteAnnee/DeleteMultipleACD_EtudiantSpecialiteAnneeAPI",
      update:"../api/ACD_EtudiantSpecialiteAnnee/PutMultipleACD_EtudiantSpecialiteAnneeAPI"
    },
    transactions:[],
    creatHandler: ()=>{},
    deleteHandler:()=>null,
    edittedHandler: ()=>null,
    columns:[
      { field : 'EtdSpecAnn_Id', header: 'ID', dataType: 'string', groupable: false, draggable: false, visible: false, sortable: false, resizable: false, filterable:false, editable:false, searchable:false, allowHide:false, width: '' },
      { field : 'SpecAnn_Id', header: 'SpecAnn_Id', dataType: 'string', groupable: false, draggable: false, visible: false, sortable: false, resizable: false, filterable:false, editable:false, searchable:false, allowHide:false, width: '' },
      { field : 'FacExt_Id', header: 'FacExt_Id', dataType: 'string', groupable: false, draggable: false, visible: false, sortable: false, resizable: false, filterable:false, editable:false, searchable:false, allowHide:false, width: '' },
      { field : 'Etd_Matricule', header: 'CURSUSPARNIV.GRIDHEADERS.MATR', dataType: 'string', groupable: true, draggable: true, visible: true, sortable: true, resizable: true, filterable: true, editable: false, searchable:true, allowHide:true, width: ''},
      { field : 'Pers_Nom', header: 'CURSUSPARNIV.GRIDHEADERS.NOM', dataType: 'string', groupable: true, draggable: true, visible: true, sortable: true, resizable: true, filterable: true, editable:false, searchable:true, allowHide:true,  width: ''},
      { field : 'Pers_Prenom', header: 'CURSUSPARNIV.GRIDHEADERS.PRENOM', dataType: 'string', groupable: true, draggable: true, visible: true, sortable: true, resizable: true, filterable: true, editable:false, searchable:true, allowHide:true, width: ''},
      { field : 'Prg_Nom', header: 'CURSUSPARNIV.GRIDHEADERS.PROGNOM', dataType: 'string', groupable: true, draggable: true, visible: false, sortable: true, resizable: true, filterable: true, editable:false, searchable:true, allowHide:true, width: ''},
      { field : 'Prg_Code', header: 'CURSUSPARNIV.GRIDHEADERS.PROGCODE', dataType: 'string', groupable: true, draggable: true, visible: true, sortable: true, resizable: true, filterable: true, editable:false, searchable:true, allowHide:true, width: ''},
      { field : 'progAdm', header: 'CURSUSPARNIV.GRIDHEADERS.PROGADM', dataType: 'string', groupable: true, draggable: true, visible: false, sortable: true, resizable: true, filterable: true, editable:false, searchable:true, allowHide:true, width: ''},
      { field : 'Spec_Name', header: 'CURSUSPARNIV.GRIDHEADERS.SPECIALITY', dataType: 'string', groupable: true, draggable: true, visible: true, sortable: true, resizable: true, filterable: true, editable:false, searchable:true, allowHide:true, width: ''},
      
      { field : 'Niv_Nom', header: 'CURSUSPARNIV.GRIDHEADERS.NIVEAU', dataType: 'string', groupable: true, draggable: true, visible: true, sortable: true, resizable: true, filterable: true, editable:false, searchable:true, allowHide:true, width: ''},
      { field : 'Niv_Id', header: 'Niv_Id', dataType: 'string', groupable: false, draggable: false, visible: false, sortable: false, resizable: false, filterable:false, editable:false, searchable:false, allowHide:false, width: '' },
      
      { field : 'Ann_Nom', header: 'CURSUSPARNIV.GRIDHEADERS.ANNEE', dataType: 'string', groupable: true, draggable: true, visible: true, sortable: true, resizable: true, filterable: true, editable:false, searchable:true, allowHide:true, width: ''},
      { field : 'Ann_Id', header: 'Ann_Id', dataType: 'string', groupable: false, draggable: false, visible: false, sortable: false, resizable: false, filterable:false, editable:false, searchable:false, allowHide:false, width: '' },
      
      { field : 'EtdAnnStatu_Id', header: 'CURSUSPARNIV.GRIDHEADERS.STATUTANNU', dataType: 'string', groupable: true, draggable: true, visible: true, sortable: true, resizable: true, filterable: true, editable:false, searchable:true, allowHide:true, width: '', /*formatter: EtdAnnStatuFormatter*/},
      //{ field : 'EtdAnnStatu_Id', header: 'EtdAnnStatu_Id', dataType: 'string', groupable: false, draggable: false, visible: false, sortable: false, resizable: false, filterable:false, editable:false, searchable:false, allowHide:false, width: '' },
      
      { field : 'ModInsc_Nom', header: 'CURSUSPARNIV.GRIDHEADERS.MODEINSC', dataType: 'string', groupable: true, draggable: true, visible: true, sortable: true, resizable: true, filterable: true, editable:true, searchable:true, allowHide:true, width: ''},
      { field : 'ModInsc_Id', header: 'ModInsc_Id', dataType: 'string', groupable: false, draggable: false, visible: false, sortable: false, resizable: false, filterable:false, editable:false, searchable:false, allowHide:false, width: '' },
      
      { field : 'EtdSpecAnn_Moyenne', header: 'CURSUSPARNIV.GRIDHEADERS.MOYEN', dataType: 'number', groupable: true, draggable: true, visible: false, sortable: true, resizable: true, filterable: true, editable:false, searchable:true, allowHide:true, width: ''},
      { field : 'EtdSpecAnn_MoyenneCustom', header: 'CURSUSPARNIV.GRIDHEADERS.MOYENRECALC', dataType: 'number', groupable: true, draggable: true, visible: false, sortable: true, resizable: true, filterable: true, editable:false, searchable:true, allowHide:true, width: ''},
      { field : 'EtdSpecAnn_AutreModPaiement', header: 'CURSUSPARNIV.GRIDHEADERS.AUTREMODPAIE', dataType: 'string', groupable: true, draggable: true, visible: false, sortable: true, resizable: true, filterable: true, editable:false, searchable:true, allowHide:true, width: ''},

      { field : 'Mtn_Nom', header: 'CURSUSPARNIV.GRIDHEADERS.MENTION', dataType: 'string', groupable: true, draggable: true, visible: false, sortable: true, resizable: true, filterable: true, editable:false, searchable:true, allowHide:true, width: ''},
      { field : 'Mtn_Id', header: 'Mtn_Id', dataType: 'string', groupable: false, draggable: false, visible: false, sortable: false, resizable: false, filterable:false, editable:false, searchable:false, allowHide:false, width: '', /*formatter: formatMtnCombo,  */ },

      { field : 'DecJury_Id', header: 'CURSUSPARNIV.GRIDHEADERS.JURYDEC', dataType: 'string', groupable: true, draggable: true, visible: false, sortable: true, resizable: true, filterable: true, editable:false, searchable:true, allowHide:true, width: '', /*formatter: formatJuryCombo,*/ },
      { field : 'EtdSpecAnn_Remarque', header: 'CURSUSPARNIV.GRIDHEADERS.REMARQ', dataType: 'string', groupable: true, draggable: true, visible: false, sortable: true, resizable: true, filterable: true, editable:true, searchable:true, allowHide:true, width: ''},
      
      { field : 'Ses_Id', header: 'Ses_Id', dataType: 'string', groupable: false, draggable: false, visible: false, sortable: false, resizable: false, filterable:false, editable:false, searchable:false, allowHide:false, width: '' },
      { field : 'SesUserName', header: 'SesUserName', dataType: 'string', groupable: false, draggable: false, visible: false, sortable: false, resizable: false, filterable:false, editable:false, searchable:false, allowHide:false, width: '' },
      { field : 'EtdtSpcAnn_TimeStamp', header: 'EtdtSpcAnn_TimeStamp', dataType: 'date', groupable: false, draggable: false, visible: false, sortable: false, resizable: false, filterable:false, editable:false, searchable:false, allowHide:false, width: '', /* format: "dd/MM/yyyy",  */ },
      
      //{ field : 'FacExt_Id', header: 'FacExt_Id', dataType: 'string', groupable: false, draggable: false, visible: false, sortable: false, resizable: false, filterable:false, editable:false, searchable:false, allowHide:false, width: '', /* formatter: formatfactextCombo, */ },

      { field : 'EtdPrg_Id', header: 'EtdPrg_Id', dataType: 'string', groupable: false, draggable: false, visible: false, sortable: false, resizable: false, filterable:false, editable:false, searchable:false, allowHide:false, width: '' },
      { field : 'EtdSpecAnn_QuitPaie', header: 'EtdSpecAnn_QuitPaie', dataType: 'boolean', groupable: false, draggable: false, visible: false, sortable: false, resizable: false, filterable:false, editable:false, searchable:false, allowHide:false, width: '' },
      { field : 'EtdSpecAnn_QuitBib', header: 'EtdSpecAnn_QuitBib', dataType: 'boolean', groupable: false, draggable: false, visible: false, sortable: false, resizable: false, filterable:false, editable:false, searchable:false, allowHide:false, width: '' },
      { field : 'EtdSpecAnn_QuitLog', header: 'EtdSpecAnn_QuitLog', dataType: 'boolean', groupable: false, draggable: false, visible: false, sortable: false, resizable: false, filterable:false, editable:false, searchable:false, allowHide:false, width: '' },
      { field : 'EtdSpecAnn_QuitRespons', header: 'EtdSpecAnn_QuitRespons', dataType: 'boolean', groupable: false, draggable: false, visible: false, sortable: false, resizable: false, filterable:false, editable:false, searchable:false, allowHide:false, width: '' },
      { field : 'EtdSpecAnn_DecsManuel', header: 'EtdSpecAnn_DecsManuel', dataType: 'boolean', groupable: false, draggable: false, visible: false, sortable: false, resizable: false, filterable:false, editable:false, searchable:false, allowHide:false, width: '' },
      { field : 'EtdSpecAnn_QuitControle', header: 'EtdSpecAnn_QuitControle', dataType: 'boolean', groupable: false, draggable: false, visible: false, sortable: false, resizable: false, filterable:false, editable:false, searchable:false, allowHide:false, width: '' },


      { field : 'quitus', header: 'CURSUSPARNIV.GRIDHEADERS.QUITUS', dataType: 'bool', groupable: true, draggable: true, visible: true, sortable: true, resizable: true, filterable: true, editable:false, searchable:true, allowHide:true, width: '',
        formatter: function (val:any, record:any) {
          var retour = "<div style=\"display:flex\">"; //
          if (record.EtdSpecAnn_QuitPaie == true) {
              retour += "<div style='background-color: #78f378; text-align:center;color: white;font-weight: bold; margin:1%;padding:1%;'>Paie.</div>";
          }
          else { retour += "<div style='background-color: red; text-align:center;color: white;font-weight: bold; margin:1%;padding:1%;'>Paie.</div>" };
          if (record.EtdSpecAnn_QuitBib == true) {
              retour += "<div style='background-color: #78f378; text-align:center;color: white;font-weight: bold; margin:1%;padding:1%;'>Bib.</div>";
          }
          else { retour += "<div style='background-color: red; text-align:center;color: white;font-weight: bold; margin:1%;padding:1%;'>Bib.</div>" };
          if (record.EtdSpecAnn_QuitLog == true) {
              retour += "<div style='background-color: #78f378; text-align:center;color: white;font-weight: bold; margin:1%;padding:1%;'>Log.</div>";
          }
          else { retour += "<div style='background-color: red; text-align:center;color: white;font-weight: bold; margin:1%;padding:1%;'>Log.</div>" };
          if (record.EtdSpecAnn_QuitControle == true) {
              retour += "<div style='background-color: #78f378; text-align:center;color: white;font-weight: bold; margin:1%;padding:1%;'>Control.</div>";
          }
          else { retour += "<div style='background-color: red; text-align:center;color: white;font-weight: bold; margin:1%;padding:1%;'>Control.</div>" };
          retour += "</div>";
          return retour;}, /*unbound: true, / / this ^parameter */
      },
      { field : 'EtdSpecAnn_FlagMaj', header: 'CURSUSPARNIV.GRIDHEADERS.FLAG', dataType: 'string', groupable: true, draggable: true, visible: true, sortable: true, resizable: true, filterable: true, editable:false, searchable:true, allowHide:true, width: '',
        formatter: function (val:any) {
          if (val == null || val == false)
              return "<div style='text-align:center;'><img width='20' height='20' src= '../Images/flag.jpg' title='Les notes ne sont pas à jour.'/></div>";
          else return "";
        },
      },
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
    this.translate.get('CURSUSPARNIV.TITLE').toPromise().then(title=>{
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
    this.gridConfig.transactions = this.studentsGride?.transactions.getAggregatedChanges(true)!;
    this.transactionSub$ = this.studentsGride?.transactions.onStateUpdate?.subscribe(() => {
      this.gridConfig.transactions = this.studentsGride?.transactions.getAggregatedChanges(true)!;
      this.gridservice.canRedo = this.studentsGride?.transactions.canRedo!;
      this.gridservice.canUndo = this.studentsGride?.transactions.canUndo! ;
    });
    this.langSubc$ = this.translate.onLangChange.subscribe( val=>{
      this.translate.get('CURSUSPARNIV.TITLE').toPromise().then(title=>this.title.setTitle(title) );// set page title
      this.setIgxRessourceStrings();
    })
  }

  ngOnDestroy(){
    this.loader.loaderDialogEmitter.emit( {isOpen: true});
    this.transactionSub$?.unsubscribe()
    this.langSubc$?.unsubscribe();
  }

  GetData(){
  }

  clearData(){

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
    this.excelExportService.export( this.studentsGride, excelOptions);
    this.loader.loaderDialogEmitter.emit({ isOpen: false});
  }

  toggleGridColumnsModal(){
    var myModal = new bootstrap.Modal(document.getElementById('GridColumnsModal'), {});
    myModal.toggle();
  }

  handleRowSelection( event :any){
    alert("rows Selected")
  }


}
