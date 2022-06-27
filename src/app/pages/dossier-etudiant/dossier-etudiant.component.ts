import { Component, OnInit, ViewChild, ChangeDetectorRef, AfterViewInit, OnDestroy, HostListener } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';
import { SplitterType, IgxGridComponent, Transaction, IgxTransactionService, TransactionType, IgxSplitterPaneComponent, IgxExcelExporterService, IgxExcelExporterOptions, IGridResourceStrings } from 'igniteui-angular';
import { Subscription } from 'rxjs';
import { GridService } from 'src/app/services/grid-Service/grid-service.service';
import { Etudiant as EtudiantType } from '../../models/entities-dossier-etudiant/etudiant.interface'
import { Etudiants } from '../TestingData';
import { LoaderService } from 'src/app/services/loader-service/loader-service.service';
import {
  DialogLayoutDisplay,
  ConfirmBoxInitializer
} from '@costlydeveloper/ngx-awesome-popup';
import { MyIndexedDbDataService } from 'src/app/services/myIndexedDbDataService/my-indexed-db-data-service.service';
import { IPaginatorResourceStrings, changei18n } from "igniteui-angular"; // Enable translation of the Igx-Grid Words
import { GridConfiguration } from 'src/app/models/GridConfiguration.interface';
import { v4 as uuid4 } from 'uuid';
import { Program as ProgramType } from 'src/app/models/entities-dossier-etudiant/program.interface';
import { Formation as FormationType } from 'src/app/models/entities-dossier-etudiant/formation.interface';
import { Tuteur  as TuteurType} from 'src/app/models/entities-dossier-etudiant/tuteur.interface';
import { Moyenrecrutem as MoyenrecrutemType } from 'src/app/models/entities-dossier-etudiant/moyenrecrutem.interface';
import { canComponentDeactivate } from 'src/app/guards/leaving-confirmation/leaving-confirmation.guard';
import { IgxGridCellComponent } from 'igniteui-angular/lib/grids/cell.component';

declare var bootstrap:any;
declare var $:any;

@Component({
  selector: 'app-dossier-etudiant',
  styleUrls: ['./dossier-etudiant.component.scss'],
  templateUrl: './dossier-etudiant.component.html',
  providers: [ IgxTransactionService]
})
export class DossierEtudiantComponent implements OnInit, AfterViewInit, OnDestroy, canComponentDeactivate {

  SplitterType :SplitterType = SplitterType.Vertical; // To set the window splitter on vertical mode
  @ViewChild("StudentsGrid", {read : IgxGridComponent, static: true}) public studentsGride?: IgxGridComponent;
  @ViewChild("splitterPane2", {read : IgxSplitterPaneComponent, static: true}) public splitterPane2?: IgxSplitterPaneComponent;


  viewTrakingIndex ?:number; // used to track selected student in the grid view's data [0,n-1]
  pkTrackingIndex ?: string; // used to track the selected student in DataSource(Transaction layer) using PK:string
  currentStudent ?: EtudiantType; // student being shown on the form 

  backUpPhotos ?: any = {} ; // Backup photos array 
  photoType ?:string; // used to pass down selected photo Type

  // Paramétrage des colonnes de la grille
  gridConfig : GridConfiguration<EtudiantType> = {
    height: undefined,
    transactions :[],
    primaryKey : 'Etd_Id',
    apiSet:{
      create : '../api/ACD_Etudiant/PostMultipleACD_EtudiantAPI',
      delete: '/api/ACD_Etudiant/DeleteMultipleACD_EtudiantAPI',
      update: '../api/ACD_Etudiant/PutMultipleACD_EtudiantAPI'
    },
    data:[],
    columns: [
    { field : 'Etd_Id', header: 'ID', dataType: 'string', visible: false, sortable: false, resizable: false, filterable:false, editable:false, searchable:false, allowHide: false, width: ''},
    { field : 'Crd_Id', header: 'Crd_Id', dataType: 'string', visible: false, sortable: false, resizable: false, filterable:false, editable:false, searchable:false, allowHide: false, width: ''},
    { field : 'Pers_Id', header: 'Pers_Id', dataType: 'string', visible: false, sortable: false, resizable: false, filterable:false, editable:false, searchable:false, allowHide: false, width: ''},
    { field : 'PersTyp_Id', header: 'PersTyp_Id', dataType: 'string', visible: false, sortable: false, resizable: false, filterable:false, editable:false, searchable:false, allowHide: false, width: ''},
    { field : 'PersRecrut_Id', header: 'PersRecrut_Id', dataType: 'string', visible: false, sortable: false, resizable: false, filterable:false, editable:false, searchable:false, allowHide: false, width: ''},
    
    { field : 'Pers_Photo', header: 'Photo', dataType: 'string', visible: false, sortable: false, resizable: true, filterable:false, editable:false, searchable:false, allowHide: false, width: ''},
    { field : 'Etd_Matricule', header: 'DOSSIERETUDIANT.GRIDHEADERS.MATR', dataType: 'string', visible: true, sortable: true, resizable: true, filterable: true, editable: false, searchable:true, allowHide: false, width: '10%'},
    { field : 'Pers_Nom', header: 'DOSSIERETUDIANT.GRIDHEADERS.NOM', dataType: 'string', visible: true, sortable: true, resizable: true, filterable: true, editable:true, searchable:true, allowHide: true, width: '15%'},
    { field : 'Pers_Prenom', header: 'DOSSIERETUDIANT.GRIDHEADERS.PRENOM', dataType: 'string', visible: true, sortable: true, resizable: true, filterable: true, editable:true, searchable:true, allowHide: true, width: '15%'},
    
    { field : 'Sexe_Id', header: 'Sexe_Id', dataType: 'string', visible: false, sortable: false, resizable: false, filterable:false, editable:false, searchable:false, allowHide: false, width: ''},
    { field : 'Sexe_Nom', header: 'DOSSIERETUDIANT.GRIDHEADERS.SEXE', dataType: 'string', visible: true, sortable: true, resizable: true, filterable: true, editable:true, searchable:true, allowHide: true, width: '15%', formatter: this.SexeFormatter.bind(this)},
    
    { field : 'Pers_CinouPass', header: 'DOSSIERETUDIANT.GRIDHEADERS.CINOUPASS', dataType: 'string', visible: true, sortable: true, resizable: true, filterable: true, editable:true, searchable:true, allowHide: true, width: '15%'},
    { field : 'Pays_Id', header: 'Pays_Id', dataType: 'string', visible: false, sortable: false, resizable: false, filterable:false, editable:false, searchable:false, allowHide: false, width: ''},
    { field : 'Pays_Nom', header: 'DOSSIERETUDIANT.GRIDHEADERS.PAYS', dataType: 'string', visible: true, sortable: true, resizable: true, filterable: true, editable:true, searchable:true, allowHide: true, width: '12%', formatter: this.PaysFormatter.bind(this)},
    { field : 'Nation_Id', header: 'DOSSIERETUDIANT.GRIDHEADERS.NATIONALITE', dataType: 'string', visible: true, sortable: true, resizable: true, filterable: true, editable:true, searchable:true, allowHide: true, width: '15%', formatter: this.NationalityFormatter.bind(this)},
    
    { field : 'Pers_DateNaissance', header: 'DOSSIERETUDIANT.GRIDHEADERS.DATENAISS', dataType: 'date', formatter: this.dateNaissFormatter, visible: false, sortable: true, resizable: true, filterable: true, editable:true, searchable:true, allowHide: true, width: '15%'},
    { field : 'Crd_LieuDeNaissance', header: 'DOSSIERETUDIANT.GRIDHEADERS.LIEUNAISS', dataType: 'string', visible: false, sortable: true, resizable: true, filterable: true, editable:true, searchable:true, allowHide: false, width: '15%'},


    { field : 'Crd_AdrLigne1', header: 'DOSSIERETUDIANT.GRIDHEADERS.ADRLIGNE1', dataType: 'string', visible: false, sortable: false, resizable: false, filterable:false, editable:false, searchable:false, allowHide: false, width: ''},
    { field : 'Crd_AdrLigne2', header: 'DOSSIERETUDIANT.GRIDHEADERS.ADRLIGNE2', dataType: 'string', visible: false, sortable: false, resizable: false, filterable:false, editable:false, searchable:false, allowHide: false, width: ''},
    { field : 'Pers_Remarque', header: 'DOSSIERETUDIANT.GRIDHEADERS.REMARQ', dataType: 'string', visible: false, sortable: false, resizable: false, filterable:false, editable:false, searchable:false, allowHide: true, width: ''},
    { field : 'Crd_CodePostal', header: 'DOSSIERETUDIANT.GRIDHEADERS.POSTALCODE', dataType: 'number', visible: false, sortable: false, resizable: false, filterable:false, editable:false, searchable:false, allowHide: true, width: ''},
    { field : 'Crd_Ville', header: 'DOSSIERETUDIANT.GRIDHEADERS.VILLE', dataType: 'string', visible: false, sortable: false, resizable: false, filterable:false, editable:false, searchable:false, allowHide: true, width: ''},

    { field : 'Crd_TelFixe1', header: 'DOSSIERETUDIANT.GRIDHEADERS.TELFIX1', dataType: 'number', visible: false, sortable: false, resizable: false, filterable:false, editable:false, searchable:false, allowHide: false, width: ''},
    { field : 'Crd_TelFixe2', header: 'DOSSIERETUDIANT.GRIDHEADERS.TELFIX2', dataType: 'number', visible: false, sortable: false, resizable: false, filterable:false, editable:false, searchable:false, allowHide: false, width: ''},
    { field : 'Crd_Cell1', header: 'DOSSIERETUDIANT.GRIDHEADERS.GSM1', dataType: 'number', visible: false, sortable: false, resizable: true, filterable:true, editable:false, searchable: true, allowHide: true, width: ''},
    { field : 'Crd_Cell2', header: 'DOSSIERETUDIANT.GRIDHEADERS.GSM2', dataType: 'number', visible: false, sortable: false, resizable: true, filterable:true, editable:false, searchable: true, allowHide: true, width: ''},
    { field : 'Crd_AdessCouriel1', header: 'DOSSIERETUDIANT.GRIDHEADERS.EMAIL1', dataType: 'string', visible: false, sortable: false, resizable: true, filterable:true, editable:false, searchable:true, allowHide: true, width: ''},
    { field : 'Crd_AdessCouriel2', header: 'DOSSIERETUDIANT.GRIDHEADERS.EMAIL2', dataType: 'string', visible: false, sortable: false, resizable: true, filterable:true, editable:false, searchable:true, allowHide: true, width: ''},

    { field : 'Ttr1_Id', header: 'Tuteur 1', dataType: 'string', visible: false, sortable: false, resizable: false, filterable:false, editable:false, searchable:false, allowHide: false, width: ''},
    { field : 'LienTtr1Etd_Id', header: 'Lien Tuteur 1', dataType: 'string', visible: false, sortable: false, resizable: false, filterable:false, editable:false, searchable:false, allowHide: false, width: ''},
    { field : 'Ttr2_Id', header: 'Tuteur 2', dataType: 'string', visible: false, sortable: false, resizable: false, filterable:false, editable:false, searchable:false, allowHide: false, width: ''},
    { field : 'LienTtr2Etd_Id', header: 'Lien Tuteur 2', dataType: 'string', visible: false, sortable: false, resizable: false, filterable:false, editable:false, searchable:false, allowHide: false, width: ''},
    { field : 'Crd_Compliement', header: 'Compliement', dataType: 'string', visible: false, sortable: false, resizable: false, filterable:false, editable:false, searchable:false, allowHide: false, width: ''},

    { field : 'Ses_Id', header: 'Ses_Id', dataType: 'string', visible: false, sortable: false, resizable: false, filterable:false, editable:false, searchable:false, allowHide: false, width: ''},
    { field : 'SesUserName', header: 'SesUserName', dataType: 'string', visible: false, sortable: false, resizable: false, filterable:false, editable:false, searchable:false, allowHide: false, width: ''},
    { field : 'ACD_EtudiantFormation', header: 'Formations', dataType: 'object', visible: false, sortable: false, resizable: false, filterable:false, editable:true, searchable:false, allowHide: false, width: ''},
    { field : 'ACD_EtudiantProgramme', header: 'Programmes', dataType: 'object', visible: false, sortable: false, resizable: false, filterable:false, editable:true, searchable:false, allowHide: false, width: ''},
    { field : 'ACD_EtudiantTuteur', header: 'Programmes', dataType: 'object', visible: false, sortable: false, resizable: false, filterable:false, editable:true, searchable:false, allowHide: false, width: ''},
    { field : 'ACD_EtudiantMoyenrecrutem', header: 'Programmes', dataType: 'object', visible: false, sortable: false, resizable: false, filterable:false, editable:true, searchable:false, allowHide: false, width: ''},
    { field : 'INS_Demande', header: 'Demande', dataType: 'object', visible: false, sortable: false, resizable: false, filterable:false, editable:false, searchable:false, allowHide: false, width: ''},
  ],
  edittedHandler :(any)=>{},
  creatHandler :(any)=>{},
  deleteHandler :(any)=>{}
  };

  programGridConfig : GridConfiguration<ProgramType> = {
    primaryKey: 'EtdPrg_Id',
    transactions: undefined,
    apiSet: {
      create:  "../api/ACD_EtudiantProgramme/PostMultipleACD_EtudiantProgrammeAPI",
      delete: "../api/ACD_EtudiantProgramme/DeleteMultipleACD_EtudiantProgrammeAPI",
      update: "../api/ACD_EtudiantProgramme/PutMultipleACD_EtudiantProgrammeAPI",
    },
    columns:[
      { field : 'ACD_Programme', header: 'ACD_Programme', dataType: 'object', visible: false, sortable: false, resizable: false, filterable:false, editable:false, searchable:false, allowHide: false, width: ''},
      { field : 'EtdPrg_Remarque', header: 'Remarque', dataType: 'string', visible: false, sortable: false, resizable: false, filterable:false, editable:false, searchable:false, allowHide: false, width: ''},
      { field : 'ProgEtdStatu_Id', header: "DOSSIERETUDIANT.FORM.PROGRAMSECTION.GRID.SITUATIONETU", dataType: 'string', visible: false, sortable: true, resizable: false, filterable:true, editable:false, searchable:true, allowHide: true, width: ''},
      { field : 'EtdPrg_Id', header: "EtdPrg_Id", dataType: 'string', visible: false, sortable: false, resizable: false, filterable:false, editable:false, searchable:false, allowHide: false, width: ''},
      { field : 'Etd_Id', header: "Etd_Id", dataType: 'string', visible: false, sortable: false, resizable: false, filterable:false, editable:false, searchable:false, allowHide: false, width: ''},
      { field : 'Prg_Id', header: "DOSSIERETUDIANT.FORM.PROGRAMSECTION.GRID.PROG", dataType: 'string', visible: true, sortable: false, resizable: true, filterable:false, editable:true, searchable:false, allowHide: true, width: ''}, // formatter = formatPrgEnum
      { field : 'AdmTyp_Id', header: "DOSSIERETUDIANT.FORM.PROGRAMSECTION.GRID.ADMISSIONTYPE", dataType: 'string', visible: true, sortable: true, resizable: true, filterable:false, editable:true, searchable:false, allowHide: true, width: ''}, // formatter = formatAdmTypEnum
      { field : 'EtdPrg_DateAdmmission', header: "DOSSIERETUDIANT.FORM.PROGRAMSECTION.GRID.ADMISSIONDATE", dataType: 'date', visible: true, sortable: true, resizable: true, filterable:false, editable:true, searchable:false, allowHide: true, width: ''}, // formatter = format: "dd/MM/yyyy"
      { field : 'EtdPrg_DateInscription', header: "DOSSIERETUDIANT.FORM.PROGRAMSECTION.GRID.INSCRDATE", dataType: 'date', visible: true, sortable: true, resizable: true, filterable:false, editable:true, searchable:false, allowHide: true, width: ''}, // formatter = format: "dd/MM/yyyy"
      { field : 'GrpAdm_Id', header: "DOSSIERETUDIANT.FORM.PROGRAMSECTION.GRID.INSCRGRP", dataType: 'string', visible: true, sortable: true, resizable: true, filterable:false, editable:true, searchable:false, allowHide: true, width: ''}, // formatter = formatGrpAdmEnum
      { field : 'PrgTyp_Id', header: "DOSSIERETUDIANT.FORM.PROGRAMSECTION.GRID.PROGTYPE", dataType: 'string', visible: true, sortable: true, resizable: true, filterable:false, editable:true, searchable:false, allowHide: true, width: ''}, // formatter = formatTypeProgEnum
      { field : 'EtdPrg_NumInscription', header: "DOSSIERETUDIANT.FORM.PROGRAMSECTION.GRID.INSCRNUM", dataType: 'string', visible: true, sortable: true, resizable: true, filterable:true, editable:true, searchable:false, allowHide: true, width: ''}, // 
      { field : 'Niv_Id', header: "DOSSIERETUDIANT.FORM.PROGRAMSECTION.GRID.ADMISSIONLEVEL", dataType: 'string', visible: true, sortable: true, resizable: true, filterable:false, editable:true, searchable:false, allowHide: true, width: ''}, // formatNivEnum
      { field : 'Spec_Id', header: "DOSSIERETUDIANT.FORM.PROGRAMSECTION.GRID.ADMISSIONFIL", dataType: 'string', visible: true, sortable: true, resizable: true, filterable:false, editable:true, searchable:false, allowHide: true, width: ''}, // formatSpecEnum
      { field : 'Ann_Id', header: "DOSSIERETUDIANT.FORM.PROGRAMSECTION.GRID.ADMISSIONYEAR", dataType: 'string', visible: true, sortable: true, resizable: true, filterable:false, editable:false, searchable:false, allowHide: true, width: ''}, // formatAnnEnum
      { field : 'Ses_Id', header: "Ses_Id", dataType: 'string', visible: false, sortable: false, resizable: false, filterable:false, editable:false, searchable:false, allowHide: false, width: ''},
      { field : 'SesUserName', header: "SesUserName", dataType: 'string', visible: false, sortable: false, resizable: false, filterable:false, editable:false, searchable:false, allowHide: false, width: ''},
    ],
    data : [],
    edittedHandler : ( newPrograms :ProgramType[] )=> {
      let editTransaction : Transaction = {
        id: this.currentStudent?.Etd_Id,
        type: TransactionType.UPDATE,
        newValue: { 'ACD_EtudiantProgramme': newPrograms, 'programTransactions': this.programGridConfig.transactions },
      }
      let modifiedItem : EtudiantType|null = this.studentsGride?.transactions.getAggregatedValue( this.pkTrackingIndex, true);
      if( modifiedItem!=null )
        this.studentsGride?.transactions.add( editTransaction, modifiedItem); 
      else
        this.studentsGride?.transactions.add( editTransaction, this.getItemByid(this.pkTrackingIndex!) ); 
      this.currentStudent = this.studentsGride?.transactions.getAggregatedValue( this.pkTrackingIndex, true)
      if(this.currentStudent != undefined)
        this.programGridConfig.data = this.currentStudent?.ACD_EtudiantProgramme? this.currentStudent!.ACD_EtudiantProgramme.map(x => Object.assign({}, x)): []   ;
      else
        this.programGridConfig.data= [];
    },
    creatHandler : ( newPrograms :ProgramType[] )=> {
      let editTransaction : Transaction = {
        id: this.currentStudent?.Etd_Id,
        type: TransactionType.UPDATE,
        newValue: { 'ACD_EtudiantProgramme': newPrograms, 'programTransactions': this.programGridConfig.transactions },
      }
      let modifiedItem : EtudiantType|null = this.studentsGride?.transactions.getAggregatedValue( this.pkTrackingIndex, true);
      if( modifiedItem!=null )
        this.studentsGride?.transactions.add( editTransaction, modifiedItem); 
      else
        this.studentsGride?.transactions.add( editTransaction, this.getItemByid(this.pkTrackingIndex!) ); 
      this.currentStudent = this.studentsGride?.transactions.getAggregatedValue( this.pkTrackingIndex, true)
      if(this.currentStudent != undefined)
        this.programGridConfig.data = this.currentStudent?.ACD_EtudiantProgramme? this.currentStudent!.ACD_EtudiantProgramme.map(x => Object.assign({}, x)): []   ;
      else
        this.programGridConfig.data= [];
    },
    deleteHandler : ( newPrograms :ProgramType[] )=> {
      let editTransaction : Transaction = {
        id: this.currentStudent?.Etd_Id,
        type: TransactionType.UPDATE,
        newValue: { 'ACD_EtudiantProgramme': newPrograms, 'programTransactions': this.programGridConfig.transactions },
      }
      let modifiedItem : EtudiantType|null = this.studentsGride?.transactions.getAggregatedValue( this.pkTrackingIndex, true);
      if( modifiedItem!=null )
        this.studentsGride?.transactions.add( editTransaction, modifiedItem); 
      else
        this.studentsGride?.transactions.add( editTransaction, this.getItemByid(this.pkTrackingIndex!) ); 
      this.currentStudent = this.studentsGride?.transactions.getAggregatedValue( this.pkTrackingIndex, true)
      if(this.currentStudent != undefined)
        this.programGridConfig.data = this.currentStudent?.ACD_EtudiantProgramme? this.currentStudent!.ACD_EtudiantProgramme.map(x => Object.assign({}, x)): []   ;
      else
        this.programGridConfig.data= [];
    }
  }

  formationGridConfig : GridConfiguration<FormationType> = {
    primaryKey: 'EtdForm_Id',
    transactions:undefined,
    apiSet: {
      create:  "../api/ACD_EtudiantFormation/PostMultipleACD_EtudiantFormationAPI",
      delete: "../api/ACD_EtudiantFormation/DeleteMultipleACD_EtudiantFormationAPI",
      update: "../api/ACD_EtudiantFormation/PutMultipleACD_EtudiantFormationAPI",
    },
    columns:[
      { field : 'Dpl_Id', header: 'DOSSIERETUDIANT.FORM.FORMATIONSECTION.NOMDILOM', dataType: 'string', visible: true, sortable: true, resizable: true, filterable:false, editable:true, searchable:false, allowHide: false, width: ''}, // formatter: formatDplFrmCombo 
      { field : 'EtdForm_NumeroDiplome', header: 'DOSSIERETUDIANT.FORM.FORMATIONSECTION.NUMDILOM', dataType: 'string', visible: false, sortable: true, resizable: true, filterable:false, editable:true, searchable:false, allowHide: true, width: ''},  
      { field : 'NivFrm_Id', header: 'DOSSIERETUDIANT.FORM.FORMATIONSECTION.NIVFORMA', dataType: 'string', visible: true, sortable: true, resizable: true, filterable:true, editable:true, searchable:false, allowHide: true, width: ''},  //formatter: formatNivFrmCombo
      { field : 'EtdForm_NomFormation', header: 'DOSSIERETUDIANT.FORM.FORMATIONSECTION.NOMFORMA', dataType: 'string', visible: true, sortable: true, resizable: true, filterable:true, editable:true, searchable:false, allowHide: true, width: ''},  
      { field : 'EtdForm_Moyenne', header: 'DOSSIERETUDIANT.FORM.FORMATIONSECTION.MOYEN', dataType: 'number', visible: true, sortable: true, resizable: true, filterable:true, editable:true, searchable:false, allowHide: true, width: ''},  
      { field : 'Mtn_Id', header: 'DOSSIERETUDIANT.FORM.FORMATIONSECTION.MENTION', dataType: 'string', visible: false, sortable: true, resizable: true, filterable:true, editable:true, searchable:false, allowHide: true, width: ''},  // formatter: formatMtnCombo
      { field : 'EtdForm_Institution', header: 'DOSSIERETUDIANT.FORM.FORMATIONSECTION.INSTNOM', dataType: 'string', visible: false, sortable: true, resizable: true, filterable:true, editable:true, searchable:false, allowHide: true, width: ''}, 
      { field : 'EtdForm_DateObtention', header: 'DOSSIERETUDIANT.FORM.FORMATIONSECTION.DATEOBTEN', dataType: 'date', visible: true, sortable: true, resizable: true, filterable:true, editable:true, searchable:false, allowHide: true, width: ''}, 
      { field : 'EtdForm_BaseAdmission', header: 'DOSSIERETUDIANT.FORM.FORMATIONSECTION.BASEADMIS', dataType: 'boolean', visible: true, sortable: true, resizable: true, filterable:true, editable:true, searchable:false, allowHide: true, width: ''}, 
      { field : 'EtdForm_Accredite', header: 'DOSSIERETUDIANT.FORM.FORMATIONSECTION.ACCRED', dataType: 'boolean', visible: true, sortable: true, resizable: true, filterable:true, editable:true, searchable:false, allowHide: true, width: ''}, 
      { field : 'Crd_AdrLigne1', header: 'DOSSIERETUDIANT.FORM.FORMATIONSECTION.ADDRL1', dataType: 'string', visible: false, sortable: true, resizable: true, filterable:true, editable:true, searchable:false, allowHide: true, width: ''}, 
      { field : 'Crd_Ville', header: 'DOSSIERETUDIANT.FORM.FORMATIONSECTION.VILLE', dataType: 'string', visible: false, sortable: true, resizable: true, filterable:true, editable:true, searchable:false, allowHide: true, width: ''}, 
      { field : 'Crd_Pays', header: 'DOSSIERETUDIANT.FORM.FORMATIONSECTION.PAYS', dataType: 'string', visible: true, sortable: true, resizable: true, filterable:true, editable:true, searchable:false, allowHide: true, width: ''}, 
      { field : 'Crd_TelFixe1', header: 'DOSSIERETUDIANT.FORM.FORMATIONSECTION.TEL1', dataType: 'number', visible: true, sortable: false, resizable: true, filterable:true, editable:true, searchable:false, allowHide: true, width: ''}, 
      { field : 'Crd_Cell1', header: 'DOSSIERETUDIANT.FORM.FORMATIONSECTION.GSM1', dataType: 'number', visible: false, sortable: false, resizable: true, filterable:true, editable:true, searchable:false, allowHide: true, width: ''}, 
      { field : 'Etd_Id', header: 'Etd_Id', dataType: 'string', visible: false, sortable: false, resizable: false, filterable:false, editable:false, searchable:false, allowHide: false, width: ''}, 
      { field : 'EtdForm_Id', header: 'EtdForm_Id', dataType: 'string', visible: false, sortable: false, resizable: false, filterable:false, editable:false, searchable:false, allowHide: false, width: ''}, 
      { field : 'Crd_Id', header: 'Crd_Id', dataType: 'string', visible: false, sortable: false, resizable: false, filterable:false, editable:false, searchable:false, allowHide: false, width: ''}, 
      { field : 'Ses_Id', header: 'Ses_Id', dataType: 'string', visible: false, sortable: false, resizable: false, filterable:false, editable:false, searchable:false, allowHide: false, width: ''}, 
      { field : 'SesUserName', header: 'SesUserName', dataType: 'string', visible: false, sortable: false, resizable: false, filterable:false, editable:false, searchable:false, allowHide: false, width: ''}, 
    ],
    data : [],
    edittedHandler : ( newFormations :FormationType[] )=> {
      let editTransaction : Transaction = {
        id: this.currentStudent?.Etd_Id,
        type: TransactionType.UPDATE,
        newValue: { 'ACD_EtudiantFormation': newFormations, 'formationTransactions': this.formationGridConfig.transactions },
      }
      let modifiedItem : EtudiantType|null = this.studentsGride?.transactions.getAggregatedValue( this.pkTrackingIndex, true);
      if( modifiedItem!=null )
        this.studentsGride?.transactions.add( editTransaction, modifiedItem); 
      else
        this.studentsGride?.transactions.add( editTransaction, this.getItemByid(this.pkTrackingIndex!) ); 
      this.currentStudent = this.studentsGride?.transactions.getAggregatedValue( this.pkTrackingIndex, true)
      if(this.currentStudent != undefined)
        this.formationGridConfig.data = this.currentStudent?.ACD_EtudiantFormation? this.currentStudent!.ACD_EtudiantFormation.map(x => Object.assign({}, x)):[]   ; // copies to prevent editing the original object
      else
        this.formationGridConfig.data = [];
    },
    creatHandler : ( newFormations :FormationType[] )=> {
      let editTransaction : Transaction = {
        id: this.currentStudent?.Etd_Id,
        type: TransactionType.UPDATE,
        newValue: { 'ACD_EtudiantFormation': newFormations, 'formationTransactions': this.formationGridConfig.transactions }
      }
      let modifiedItem : EtudiantType|null = this.studentsGride?.transactions.getAggregatedValue( this.pkTrackingIndex, true);
      if( modifiedItem!=null )
        this.studentsGride?.transactions.add( editTransaction, modifiedItem); 
      else
        this.studentsGride?.transactions.add( editTransaction, this.getItemByid(this.pkTrackingIndex!) ); 
      this.currentStudent = this.studentsGride?.transactions.getAggregatedValue( this.pkTrackingIndex, true)
      if(this.currentStudent != undefined)
        this.formationGridConfig.data = this.currentStudent?.ACD_EtudiantFormation? this.currentStudent!.ACD_EtudiantFormation.map(x => Object.assign({}, x)):[]   ; // copies to prevent editing the original object
      else
        this.formationGridConfig.data = [];
    },
    deleteHandler : ( newFormations :FormationType[] )=> {
      let editTransaction : Transaction = {
        id: this.currentStudent?.Etd_Id,
        type: TransactionType.UPDATE,
        newValue: { 'ACD_EtudiantFormation': newFormations, 'formationTransactions': this.formationGridConfig.transactions }
      }
      let modifiedItem : EtudiantType|null = this.studentsGride?.transactions.getAggregatedValue( this.pkTrackingIndex, true);
      if( modifiedItem!=null )
        this.studentsGride?.transactions.add( editTransaction, modifiedItem); 
      else
        this.studentsGride?.transactions.add( editTransaction, this.getItemByid(this.pkTrackingIndex!) ); 
      this.currentStudent = this.studentsGride?.transactions.getAggregatedValue( this.pkTrackingIndex, true)
      if(this.currentStudent != undefined)
        this.formationGridConfig.data = this.currentStudent?.ACD_EtudiantFormation? this.currentStudent!.ACD_EtudiantFormation.map(x => Object.assign({}, x)):[]   ; // copies to prevent editing the original object
      else
        this.formationGridConfig.data = [];
    }
  }

  tuteurGridConfig : GridConfiguration<TuteurType> = {
    primaryKey: 'Ttr_Id',
    transactions: undefined,
    apiSet: {
      create:  "../api/ACD_Tuteur/PostMultipleACD_TuteurAPI",
      delete: "../api/ACD_Tuteur/DeleteMultipleACD_TuteurAPI",
      update: "../api/ACD_Tuteur/PutMultipleACD_TuteurAPI",
    },
    columns:[
      { field : 'Ttr_Id', header: 'Tuteur ID', dataType: 'string', visible: false, sortable: false, resizable: false, filterable:false, editable:false, searchable:false, allowHide: false, width: ''},
      { field : 'Etd_Id', header: 'Etd_Id', dataType: 'string', visible: false, sortable: false, resizable: false, filterable:false, editable:false, searchable:false, allowHide: false, width: ''},  
      { field : 'LienTtrEtd_Id', header: 'DOSSIERETUDIANT.FORM.TUTEURSECTION.LINK', dataType: 'string', visible: true, sortable: false, resizable: true, filterable:false, editable:true, searchable:false, allowHide: true, width: ''}, // formatter: formatTtrEtdEnumCombo 
      { field : 'Pers_Nom', header: 'DOSSIERETUDIANT.FORM.TUTEURSECTION.NOM', dataType: 'string', visible: true, sortable: true, resizable: true, filterable:true, editable:true, searchable:false, allowHide: true, width: ''}, 
      { field : 'Pers_Prenom', header: 'DOSSIERETUDIANT.FORM.TUTEURSECTION.PRENOM', dataType: 'string', visible: true, sortable: true, resizable: true, filterable:true, editable:true, searchable:false, allowHide: true, width: ''}, 
      { field : 'Sex_Id', header: 'DOSSIERETUDIANT.FORM.TUTEURSECTION.SEXE', dataType: 'string', visible: false, sortable: true, resizable: true, filterable:false, editable:true, searchable:false, allowHide: true, width: ''},  // ormatter: formatSexeEnum,
      { field : 'Pers_CinouPass', header: 'DOSSIERETUDIANT.FORM.TUTEURSECTION.CINPASS', dataType: 'string', visible: true, sortable: true, resizable: true, filterable:true, editable:true, searchable:false, allowHide: false, width: ''}, 
      { field : 'Crd_AdessCouriel1', header: 'DOSSIERETUDIANT.FORM.TUTEURSECTION.EMAIL', dataType: 'string', visible: true, sortable: true, resizable: true, filterable:true, editable:true, searchable:false, allowHide: false, width: ''},  
      { field : 'Crd_AdrLigne1', header: 'DOSSIERETUDIANT.FORM.TUTEURSECTION.ADR', dataType: 'string', visible: true, sortable: false, resizable: true, filterable:true, editable:true, searchable:false, allowHide: false, width: ''},  
      { field : 'Crd_Cell1', header: 'DOSSIERETUDIANT.FORM.TUTEURSECTION.CEL1', dataType: 'number', visible: true, sortable: false, resizable: true, filterable:true, editable:true, searchable:false, allowHide: true, width: ''},  
      { field : 'Crd_Cell2', header: 'DOSSIERETUDIANT.FORM.TUTEURSECTION.CEL2', dataType: 'number', visible: true, sortable: false, resizable: true, filterable:true, editable:true, searchable:false, allowHide: true, width: ''},  
      { field : 'Crd_TelFixe1', header: 'DOSSIERETUDIANT.FORM.TUTEURSECTION.FIX1', dataType: 'number', visible: true, sortable: false, resizable: true, filterable:true, editable:true, searchable:false, allowHide: true, width: ''},  
      { field : 'Crd_TelFixe2', header: 'DOSSIERETUDIANT.FORM.TUTEURSECTION.FIX2', dataType: 'number', visible: true, sortable: false, resizable: true, filterable:true, editable:true, searchable:false, allowHide: true, width: ''},  
      { field : 'Ttr_Profession', header: 'DOSSIERETUDIANT.FORM.TUTEURSECTION.PROF', dataType: 'string', visible: true, sortable: false, resizable: true, filterable:true, editable:true, searchable:false, allowHide: true, width: ''},  
      { field : 'FonctionEnum_Id', header: 'DOSSIERETUDIANT.FORM.TUTEURSECTION.FONC', dataType: 'string', visible: true, sortable: false, resizable: true, filterable:true, editable:true, searchable:false, allowHide: true, width: ''},  // formatter: formatFonctionEnum
      { field : 'Pers_DateNaissance', header: 'DOSSIERETUDIANT.FORM.TUTEURSECTION.DATENAISS', dataType: 'date', visible: false, sortable: false, resizable: true, filterable:true, editable:false, searchable:false, allowHide: false, width: ''},  
      { field : 'Crd_Pays', header: 'DOSSIERETUDIANT.FORM.TUTEURSECTION.PAYS', dataType: 'string', visible: false, sortable: true, resizable: true, filterable:true, editable:false, searchable:false, allowHide: false, width: ''},  
      { field : 'Crd_Ville', header: 'DOSSIERETUDIANT.FORM.TUTEURSECTION.VILLE', dataType: 'string', visible: false, sortable: true, resizable: true, filterable:true, editable:false, searchable:false, allowHide: false, width: ''},  
      { field : 'Pers_Id', header: 'Pers_Id', dataType: 'string', visible: false, sortable: false, resizable: false, filterable:false, editable:false, searchable:false, allowHide: false, width: ''},  
      { field : 'Crd_Id', header: 'Crd_Id', dataType: 'string', visible: false, sortable: false, resizable: false, filterable:false, editable:false, searchable:false, allowHide: false, width: ''},  
      { field : 'PersTyp_Id', header: 'PersTyp_Id', dataType: 'string', visible: false, sortable: false, resizable: false, filterable:false, editable:false, searchable:false, allowHide: false, width: ''},  
      { field : 'Nation_Id', header: 'DOSSIERETUDIANT.FORM.TUTEURSECTION.NATION', dataType: 'string', visible: false, sortable: false, resizable: true, filterable:false, editable:false, searchable:false, allowHide: true, width: ''},   // formatter: formatNationEnum
      { field : 'SecteurEnum_Id', header: 'DOSSIERETUDIANT.FORM.TUTEURSECTION.SECTEUR', dataType: 'string', visible: false, sortable: false, resizable: true, filterable:false, editable:false, searchable:false, allowHide: true, width: ''},   //  formatter: formatSecteurEnum
      { field : 'EntrepEnum_Id', header: 'DOSSIERETUDIANT.FORM.TUTEURSECTION.ENTREP', dataType: 'string', visible: false, sortable: false, resizable: true, filterable:false, editable:false, searchable:false, allowHide: true, width: ''},   //   formatter: formatEntrepEnumCombo
      { field : 'Ses_Id', header: 'Ses_Id', dataType: 'string', visible: false, sortable: false, resizable: false, filterable:false, editable:false, searchable:false, allowHide: false, width: ''},  
      { field : 'SesUserName', header: 'SesUserName', dataType: 'string', visible: false, sortable: false, resizable: false, filterable:false, editable:false, searchable:false, allowHide: false, width: ''},
    ],
    data : [],
    edittedHandler : ( newTuteurs :TuteurType[] )=> {
      let editTransaction : Transaction = {
        id: this.currentStudent?.Etd_Id,
        type: TransactionType.UPDATE,
        newValue: { 'ACD_EtudiantTuteur': newTuteurs,  'tuteurTransactions': this.tuteurGridConfig.transactions }
      }
      let modifiedItem : EtudiantType|null = this.studentsGride?.transactions.getAggregatedValue( this.pkTrackingIndex, true);
      if( modifiedItem!=null )
        this.studentsGride?.transactions.add( editTransaction, modifiedItem); 
      else
        this.studentsGride?.transactions.add( editTransaction, this.getItemByid(this.pkTrackingIndex!) ); 
      this.currentStudent = this.studentsGride?.transactions.getAggregatedValue( this.pkTrackingIndex, true)
      if(this.currentStudent != undefined)
        this.tuteurGridConfig.data = this.currentStudent?.ACD_EtudiantTuteur? this.currentStudent!.ACD_EtudiantTuteur.map(x => Object.assign({}, x)):[]   ; // copies to prevent editing the original object
      else
        this.tuteurGridConfig.data = [];
    },
    creatHandler : ( newTuteurs :TuteurType[] )=> {
      let editTransaction : Transaction = {
        id: this.currentStudent?.Etd_Id,
        type: TransactionType.UPDATE,
        newValue: { 'ACD_EtudiantTuteur': newTuteurs,  'tuteurTransactions': this.tuteurGridConfig.transactions }
      }
      let modifiedItem : EtudiantType|null = this.studentsGride?.transactions.getAggregatedValue( this.pkTrackingIndex, true);
      if( modifiedItem!=null )
        this.studentsGride?.transactions.add( editTransaction, modifiedItem); 
      else
        this.studentsGride?.transactions.add( editTransaction, this.getItemByid(this.pkTrackingIndex!) ); 
      this.currentStudent = this.studentsGride?.transactions.getAggregatedValue( this.pkTrackingIndex, true)
      if(this.currentStudent != undefined)
        this.tuteurGridConfig.data = this.currentStudent?.ACD_EtudiantTuteur? this.currentStudent!.ACD_EtudiantTuteur.map(x => Object.assign({}, x)):[]   ; // copies to prevent editing the original object
      else
        this.tuteurGridConfig.data = [];
    },
    deleteHandler : ( newTuteurs :TuteurType[] )=> {
      let editTransaction : Transaction = {
        id: this.currentStudent?.Etd_Id,
        type: TransactionType.UPDATE,
        newValue: { 'ACD_EtudiantTuteur': newTuteurs,  'tuteurTransactions': this.tuteurGridConfig.transactions }
      }
      let modifiedItem : EtudiantType|null = this.studentsGride?.transactions.getAggregatedValue( this.pkTrackingIndex, true);
      if( modifiedItem!=null )
        this.studentsGride?.transactions.add( editTransaction, modifiedItem); 
      else
        this.studentsGride?.transactions.add( editTransaction, this.getItemByid(this.pkTrackingIndex!) ); 
      this.currentStudent = this.studentsGride?.transactions.getAggregatedValue( this.pkTrackingIndex, true)
      if(this.currentStudent != undefined)
        this.tuteurGridConfig.data = this.currentStudent?.ACD_EtudiantTuteur? this.currentStudent!.ACD_EtudiantTuteur.map(x => Object.assign({}, x)):[]   ; // copies to prevent editing the original object
      else
        this.tuteurGridConfig.data = [];
    }
  }

  moyenrecruGridConfig : GridConfiguration<MoyenrecrutemType> = {
    primaryKey: 'DemSup_Id',
    apiSet: {
      create:  "../api/",
      delete: "../api/",
      update: "../api/",
    },
    columns:[
      { field : 'DemSup_Id', header: 'DemSup_Id', dataType: 'string', visible: false, sortable: false, resizable: false, filterable:false, editable:false, searchable:false, allowHide: false, width: ''},
      { field : 'Sup_Id', header: 'Sup_Id', dataType: 'string', visible: false, sortable: false, resizable: false, filterable:false, editable:false, searchable:false, allowHide: false, width: ''},
      { field : 'Sup_Nom', header: 'DOSSIERETUDIANT.FORM.MOYENSECTION.SUPPORT', dataType: 'string', visible: true, sortable: true, resizable: true, filterable:true, editable:true, searchable:true, allowHide: false, width: ''},
    ],
    data : [],
    edittedHandler : ( newMoyens :MoyenrecrutemType[] )=> {
      let editTransaction : Transaction = {
        id: this.currentStudent?.Etd_Id,
        type: TransactionType.UPDATE,
        newValue: { 'ACD_EtudiantMoyenrecrutem': newMoyens, 'moyenrecrutTransactions': this.moyenrecruGridConfig.transactions },
      }
      let modifiedItem : EtudiantType|null = this.studentsGride?.transactions.getAggregatedValue( this.pkTrackingIndex, true);
      if( modifiedItem!=null )
        this.studentsGride?.transactions.add( editTransaction, modifiedItem); 
      else
        this.studentsGride?.transactions.add( editTransaction, this.getItemByid(this.pkTrackingIndex!) ); 
      this.currentStudent = this.studentsGride?.transactions.getAggregatedValue( this.pkTrackingIndex, true)
      if(this.currentStudent != undefined)
        this.moyenrecruGridConfig.data = this.currentStudent?.ACD_EtudiantMoyenrecrutem? this.currentStudent!.ACD_EtudiantMoyenrecrutem.map(x => Object.assign({}, x)):[]   ; // copies to prevent editing the original object
      else
        this.moyenrecruGridConfig.data = [];
    },
    creatHandler : ( any )=> {},
    deleteHandler : ( any )=> {}
  }

  semesterGridConfig : GridConfiguration<any> = {
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
    columns:[
      { header: "EtdSpecSms_Id", field: "EtdSpecSms_Id", dataType: "string", visible: false, allowHide: false },
      { field : 'Prg_Code', header: 'CURSUSPARSEM.GRIDHEADERS.GRP2.PROG_CODE', dataType: 'string', groupable: true, draggable: true, visible: false, sortable: true, resizable: true, filterable: true, editable:false, searchable:true, visibleWhenCollapsed:false, allowHide: true,  width: ''},
      { field : 'Prg_Nom', header: 'CURSUSPARSEM.GRIDHEADERS.GRP2.PROG_NOM', dataType: 'string', groupable: true, draggable: true, visible: false, sortable: true, resizable: true, filterable: true, editable:false, searchable:true, visibleWhenCollapsed:false, allowHide: true, width: ''},
      { field : 'Fac_Nom', header: 'CURSUSPARSEM.GRIDHEADERS.GRP2.FAC', dataType: 'string', groupable: true, draggable: true, visible: false, sortable: true, resizable: true, filterable: true, editable:false, searchable:true, visibleWhenCollapsed:false, allowHide: true, width: ''},
      { field : 'AdmPrg_Code', header: 'CURSUSPARSEM.GRIDHEADERS.GRP2.ADMPROGCODE', dataType: 'string', groupable: true, draggable: true, visible: false, sortable: true, resizable: true, filterable: true, editable:false, searchable:true, visibleWhenCollapsed:false, allowHide: true, width: ''},
      { field : 'AdmPrg_Nom', header: 'CURSUSPARSEM.GRIDHEADERS.GRP2.ADMPROGNOM', dataType: 'string', groupable: true, draggable: true, visible: false, sortable: true, resizable: true, filterable: true, editable:false, searchable:true, visibleWhenCollapsed:false, allowHide: true, width: ''},
      { field : 'Spec_Name', header: 'CURSUSPARSEM.GRIDHEADERS.GRP3.SPECIALITE', dataType: 'string', groupable: true, draggable: true, visible: true, sortable: true, resizable: true, filterable: true, editable:false, searchable:true, visibleWhenCollapsed:false, allowHide:true, width: ''},
      { field: "Niv_Id", header: "Niv_Id", dataType: "string", visible: false, allowHide: false },
      { field : 'Niv_Nom', header: 'CURSUSPARSEM.GRIDHEADERS.GRP3.NIVEAU', dataType: 'string', groupable: true, draggable: true, visible: true, sortable: true, resizable: true, filterable: true, editable:false, searchable:true, visibleWhenCollapsed:false, allowHide: true, width: ''},
      { field : 'Sms_Nom', header: 'CURSUSPARSEM.GRIDHEADERS.GRP3.SEM', dataType: 'number', groupable: true, draggable: true, visible: true, sortable: true, resizable: true, filterable: true, editable:false, searchable:true, visibleWhenCollapsed:false, allowHide: true, width: ''},
      { field : 'Sess_Nom', header: 'CURSUSPARSEM.GRIDHEADERS.GRP3.PERIODE', dataType: 'string', groupable: true, draggable: true, visible: false, sortable: true, resizable: true, filterable: true, editable:false, searchable:true, visibleWhenCollapsed:false, allowHide: true, width: ''},
      { field: "Ann_Id", header: "Ann_Id", dataType: "string", visible: false, allowHide: false },
      { field : 'Ann_Nom', header: 'CURSUSPARSEM.GRIDHEADERS.GRP3.ANNEE', dataType: 'string', groupable: true, draggable: true, visible: false, sortable: true, resizable: true, filterable: true, editable:false, searchable:true, visibleWhenCollapsed:false, allowHide: true, width: ''},
      { field : 'EtdSpecSms_Moyenne', header: 'CURSUSPARSEM.GRIDHEADERS.GRP3.MOYENNE', dataType: 'number', groupable: true, draggable: true, visible: true, sortable: true, resizable: true, filterable: true, editable:false, searchable:true, visibleWhenCollapsed:false, allowHide: true, width: ''},
      { field : 'EtdSpecSms_Validation', header: 'CURSUSPARSEM.GRIDHEADERS.GRP3.VALIDE', dataType: 'bool', groupable: true, draggable: true, visible: true, sortable: true, resizable: true, filterable: true, editable:false, searchable:true, visibleWhenCollapsed:false, allowHide: true, width: ''},
      { field : 'Nombre_abs', header: 'Nombre d\'absences', dataType: 'number', groupable: true, draggable: true, visible: true, sortable: true, resizable: true, filterable: true, editable:false, searchable:true, visibleWhenCollapsed:false, allowHide: true, width: ''},
      { field : 'bultinID', header: 'Bultin semesterial', dataType: 'bool', groupable: true, draggable: true, visible: true, sortable: true, resizable: true, filterable: true, editable:false, searchable:true, visibleWhenCollapsed:false, allowHide: true, width: ''},
      { field : 'ProgEtdStatu_Nom', header: 'CURSUSPARSEM.GRIDHEADERS.GRP3.STAT', dataType: 'string', groupable: true, draggable: true, visible: false, sortable: true, resizable: true, filterable: true, editable:false, searchable:true, visibleWhenCollapsed:false, allowHide:true, width: ''},
      { field : 'EtdSpecSms_Remarque', header: 'CURSUSPARSEM.GRIDHEADERS.GRP3.REMARQ', dataType: 'string', groupable: true, draggable: true, visible: false, sortable: true, resizable: true, filterable: true, editable:false, searchable:true, visibleWhenCollapsed:false, allowHide:true, width: ''},
      { field : 'SpecSmsSess_Id', header: 'SpecSmsSess_Id', dataType: 'string', groupable: false, draggable: false, visible: false, sortable: false, resizable: false, filterable: false, editable:false, searchable:false, visibleWhenCollapsed:false, allowHide:false, width: ''},
      { field : 'ProgEtdStatu_Id', header: 'ProgEtdStatu_Id', dataType: 'string', groupable: false, draggable: false, visible: false, sortable: false, resizable: false, filterable: false, editable:false, searchable:false, visibleWhenCollapsed:false, allowHide:false, width: ''},
      { field : 'GrpSpecSmsSess_Id', header: 'GrpSpecSmsSess_Id', dataType: 'string', groupable: false, draggable: false, visible: false, sortable: false, resizable: false, filterable: false, editable:false, searchable:false, visibleWhenCollapsed:false, allowHide:false, width: ''},
      { field : 'Spec_Id', header: 'Spec_Id', dataType: 'string', groupable: false, draggable: false, visible: false, sortable: false, resizable: false, filterable: false, editable:false, searchable:false, visibleWhenCollapsed:false, allowHide:false, width: ''},
    ]
  }

  notesGridConfig : GridConfiguration<any> ={
    primaryKey: 'Mat_Id',
    data:[],
    apiSet:{
      create: '',
      update: '',
      delete: ''
    },
    creatHandler: ()=>undefined,
    edittedHandler: ()=>undefined,
    deleteHandler: ()=>undefined,
    columns:[
      { header: "Mat_Id", field: "Mat_Id", dataType: "string", visible: false, allowHide: false },
      { field : 'Semestre', header: 'Semestre', dataType: 'string', groupable: true, draggable: true, visible: true, sortable: true, resizable: true, filterable: true, editable:false, searchable:true, visibleWhenCollapsed:false, allowHide: true, width: ''},
      { field : 'Matiere', header: 'Matière', dataType: 'string', groupable: true, draggable: true, visible: true, sortable: true, resizable: true, filterable: true, editable:false, searchable:true, visibleWhenCollapsed:false, allowHide: true, width: ''},
      { field : 'Note', header: 'Note', dataType: 'number', groupable: true, draggable: true, visible: true, sortable: true, resizable: true, filterable: true, editable:false, searchable:true, visibleWhenCollapsed:false, allowHide: true, width: ''},
    ]
  }

  biblioGridConfig : GridConfiguration<any> ={
    primaryKey: 'emprunt_Id',
    data:[],
    apiSet:{
      create: '',
      update: '',
      delete: ''
    },
    creatHandler: ()=>undefined,
    edittedHandler: ()=>undefined,
    deleteHandler: ()=>undefined,
    columns:[
      { header: "emprunt_Id", field: "emprunt_Id", dataType: "string", visible: false, allowHide: false },
      { field : 'Semestre', header: 'Semestre', dataType: 'string', groupable: true, draggable: true, visible: true, sortable: true, resizable: true, filterable: true, editable:false, searchable:true, visibleWhenCollapsed:false, allowHide: true, width: ''},
      { field : 'emprut_title', header: 'Titre de l\'oeuvre', dataType: 'string', groupable: false, draggable: false, visible: true, sortable: true, resizable: true, filterable: true, editable:false, searchable:true, visibleWhenCollapsed:false, allowHide: true, width: ''},
      { field : 'emprut_date', header: 'Date d\'emprunt', dataType: 'date', groupable: true, draggable: true, visible: true, sortable: true, resizable: true, filterable: true, editable:false, searchable:true, visibleWhenCollapsed:false, allowHide: true, width: ''},
    ]
  }
  
  absenceGridConfig : GridConfiguration<any> ={
    primaryKey: 'Id',
    data:[],
    apiSet:{
      create: '',
      update: '',
      delete: ''
    },
    creatHandler: ()=>undefined,
    edittedHandler: ()=>undefined,
    deleteHandler: ()=>undefined,
    columns:[
      { header: "id", field: "id", dataType: "string", visible: false, allowHide: false },
      { field : 'Semestre', header: 'Semestre', dataType: 'string', groupable: true, draggable: true, visible: true, sortable: true, resizable: true, filterable: true, editable:false, searchable:true, visibleWhenCollapsed:false, allowHide: true, width: ''},
      { field : 'Matiere', header: 'Matière', dataType: 'string', groupable: false, draggable: false, visible: true, sortable: true, resizable: true, filterable: true, editable:false, searchable:true, visibleWhenCollapsed:false, allowHide: true, width: ''},
      { field : 'nbr_heures', header: 'Nombre d\heures absentées', dataType: 'number', groupable: true, draggable: true, visible: true, sortable: true, resizable: true, filterable: true, editable:false, searchable:true, visibleWhenCollapsed:false, allowHide: true, width: ''},
    ]
  }

  // Subscriptions 
  undoSubc$ ?: Subscription; 
  redoSubc$ ?: Subscription; 
  saveSubc$ ?: Subscription; 
  langSubc$ ?: Subscription; 
  transactionSubsc$ ?:Subscription;



  formData : { 
    loaded :boolean, 
    gendersArr :any[], 
    gendersTranslations:{FEMME:string, HOMME:string, INDEFINI:string},
    countriesArr :any[], 
    countriesTranslations :{}, 
    nationalitiesArr :any[],
    nationalitiesTranslations :{}, 
    personalInfos:boolean, 
    programs:boolean, 
    formations:boolean, 
    tuteurs:boolean, 
    moyensRecrut:boolean,
    semestres:boolean,
    notes:boolean,
    biblio: boolean,
    paiement: boolean, 
    absence:boolean,
    DcocherTout: boolean
  } 
  = {
    loaded : false,
    personalInfos: true,
    programs: true,
    formations: true,
    tuteurs: true,
    moyensRecrut: true,
    semestres: false,
    notes: false,
    biblio: false,
    paiement: false, 
    absence:false,
    gendersArr : [],
    gendersTranslations: { HOMME: 'Homme', FEMME:'Femme', INDEFINI: 'Indéfini'},
    countriesArr : [],
    countriesTranslations :{}, 
    nationalitiesArr : [],
    nationalitiesTranslations :{},
    DcocherTout: true
  }

  // Ressource strings to translate igx-grid words globally from layout : 
  private paginatorResourceStrings: IPaginatorResourceStrings = {
    igx_paginator_label: "",
    igx_paginator_pager_text: "",
  };
  private gridResourceStrings: IGridResourceStrings = {
    igx_grid_row_edit_btn_done: "",
    igx_grid_row_edit_btn_cancel: "",
    igx_grid_filter: "",
    igx_grid_filter_row_close : "",
    igx_grid_filter_row_reset: "",
    igx_grid_filter_row_placeholder: "",
  }

  constructor(private cdr: ChangeDetectorRef, 
      public gridservice: GridService,
      public translate: TranslateService, 
      private title:Title, 
      private loader: LoaderService,
      private myIDBservice: MyIndexedDbDataService,
      private excelExportService: IgxExcelExporterService ) { 
    this.translate.get('DOSSIERETUDIANT.TITLE').toPromise().then(title=>this.title.setTitle(title) );// set page title
    for(let i=0; i<this.gridConfig.data.length; i++)
      this.backUpPhotos![ this.gridConfig.data[i]!.Etd_Id! ]= this.gridConfig.data[i].Pers_Photo!;
    
    // mobile view requires selecting the first row here, to keep the form visible
    if(this.gridConfig.data.length){
      this.pkTrackingIndex = this.gridConfig.data[0].Etd_Id;
      this.viewTrakingIndex = this.studentsGride?.getRowByKey(this.pkTrackingIndex)?.viewIndex;
      this.updateCurrentStudent( this.gridConfig.data[0] )
      this.viewTrakingIndex= 0;
    }else{
      this.pkTrackingIndex=undefined;
      this.viewTrakingIndex=undefined;
      this.currentStudent= undefined;
    }
    this.langSubc$ = this.translate.onLangChange.subscribe( val=>{
      this.translate.get('DOSSIERETUDIANT.TITLE').toPromise().then(title=>{
        this.title.setTitle(title) ;
        this.gridservice.currentPageSubject.next( title );
        this.translate.get('GENDERS').toPromise().then(GENDERS=>{ this.formData.gendersTranslations = GENDERS; this.studentsGride?.refreshGridState();});
        this.translate.get('NATIONALITIES').toPromise().then(NATIONALITIES=>{ this.formData.nationalitiesTranslations = NATIONALITIES; this.studentsGride?.refreshGridState();});
        this.translate.get('COUNTRIES').toPromise().then(COUNTRIES=>{ this.formData.countriesTranslations = COUNTRIES; this.studentsGride?.refreshGridState();});
      });// set page title
      this.setIgxRessourceStrings();
    })
  }

  ngOnInit(): void {
     
    // keep responsivity on resize event
    $(document).ready( ()=>{
      setTimeout( ()=>{ this.responsiveSplitter();this.resizingSplitter(); }, 200);
      $(window).on('resize', ()=>{
        this.responsiveSplitter();
        this.resizingSplitter();
      });
      this.loader.loaderDialogEmitter.emit({ isOpen:false }); // remove loading screen
      window.addEventListener('scroll', function() {
          if( window.innerWidth>430 ) return;
          if (window.scrollY > 50) {
            $('#formHeader').addClass('fixed-top');
            // add padding top to show content behind navbar
            let navbar_height = $('#formHeader').offsetHeight;
            document.body.style.paddingTop = navbar_height + 'px';
          } else {
            $('#formHeader').removeClass('fixed-top');
              // remove padding top from body
            document.body.style.paddingTop = '0';
          } 
      });
    })
    let selectFormsPromise : Promise<[ any, any, any]> = Promise.all([ 
      this.myIDBservice.getGendersTable(),
      this.myIDBservice.getCountriesTable(),
      this.myIDBservice.getNationalitiesTable()
    ])
    selectFormsPromise.then( (arrays :[any, any, any])=>{
      this.formData.gendersArr = arrays[0];
      this.formData.countriesArr = arrays[1];
      this.formData.nationalitiesArr = arrays[2];
      this.formData.loaded = true;
    })
    this.setIgxRessourceStrings();
  }

  // only way to select the first row when initialising
  ngAfterViewInit():void{
    this.gridConfig.transactions= this.studentsGride?.transactions.getAggregatedChanges(true)!;
    this.transactionSubsc$ = this.studentsGride?.transactions.onStateUpdate?.subscribe(() => {
      this.gridConfig.transactions = this.studentsGride?.transactions.getAggregatedChanges(true)!;
      this.gridservice.canRedo = this.studentsGride?.transactions.canRedo!;
      this.gridservice.canUndo = this.studentsGride?.transactions.canUndo! ;
      this.gridservice.canSave = this.gridConfig.transactions.length>0;
    });
    this.undoSubc$ = this.gridservice.undoSubject.subscribe(e=>{this.studentsGride?.transactions.undo(); this.updateCurrentStudent(); this.FillFormGrids(); });
    this.redoSubc$ = this.gridservice.redoSubject.subscribe(e=>{this.studentsGride?.transactions.redo(); this.updateCurrentStudent(); this.FillFormGrids(); });
    this.saveSubc$ = this.gridservice.saveSubject.subscribe(e=>{ 
      alert("SaveClicked");
      console.log(".getAggregatedChanges(true): ", this.studentsGride?.transactions.getAggregatedChanges(true))
    })

    setTimeout(()=>this.gridservice.currentPageSubject.next( this.title.getTitle() ),0);// timeOut 0 to avoid change after detection issue
    if( this.pkTrackingIndex != undefined ){
      this.studentsGride?.selectRows( [ this.pkTrackingIndex],true )  
      this.viewTrakingIndex = this.studentsGride?.getRowByKey(this.pkTrackingIndex)?.viewIndex;
    }
    this.cdr.detectChanges(); // unrecommended
  }

  ngOnDestroy(){
    window.removeEventListener('scroll',function() {
      if( window.innerWidth>430 ) return;
      console.log('scroll handler')
      if (window.scrollY > 50) {
        $('#formHeader').addClass('fixed-top');
        // add padding top to show content behind navbar
        let navbar_height = $('#formHeader').offsetHeight;
        document.body.style.paddingTop = navbar_height + 'px';
      } else {
        $('#formHeader').removeClass('fixed-top');
          // remove padding top from body
        document.body.style.paddingTop = '0';
      } 
    })
    this.gridservice.resetBtns();
    this.transactionSubsc$?.unsubscribe();
    this.undoSubc$?.unsubscribe();
    this.redoSubc$?.unsubscribe();
    this.langSubc$?.unsubscribe();
    this.saveSubc$?.unsubscribe();
  }
  
  /**
   * Shows confirmation loader and transmits leaving boolean variable to the guard
   * @returns boolean
   */
    async confirmLeaving(){
      if( this.studentsGride && this.studentsGride!.transactions.getAggregatedChanges(true).length > 0 ){
        const confirmBox = new ConfirmBoxInitializer();
        await this.translate.get("MODALCONFIRM.LEAVING_MSGS").toPromise().then(e=>{
          confirmBox.setTitle( e.headerTitle );
          confirmBox.setMessage(e.bodyText);
          confirmBox.setButtonLabels( e.confirmBtnText, e.closeBtnText);
          confirmBox.setConfig({
            LayoutType: DialogLayoutDisplay.WARNING
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
    this.translate.get('PAGINATIONSTRINGS').toPromise().then( e=>{
      this.paginatorResourceStrings.igx_paginator_label = e.PAGINATORLABEL;
      this.paginatorResourceStrings.igx_paginator_pager_text = e.PAGERTEXT;
      changei18n(this.paginatorResourceStrings);
    })
    this.translate.get('GRIDSTRINGS.GRID').toPromise().then(e=>{
      this.gridResourceStrings.igx_grid_row_edit_btn_done = e.EDITBTNDONE ;
      this.gridResourceStrings.igx_grid_row_edit_btn_cancel = e.EDITBTNCANCEL ;
      this.gridResourceStrings.igx_grid_filter = e.FILTERKEYWORD;
      this.gridResourceStrings.igx_grid_filter_row_close = e.FILTERROWCLOSE;
      this.gridResourceStrings.igx_grid_filter_row_reset = e.FILTERROWRESET;
      this.gridResourceStrings.igx_grid_filter_row_placeholder = e.FILTERINPTPLACEHOLDER;
      changei18n(this.gridResourceStrings);
    })
  }


  scroll(elId: string, event:any={target:{checked:true}}) {
    let el = document.getElementById(elId);
    if(event.target.value){
      let a = new Promise(resolve=>{
        setTimeout(()=>{el?.scrollIntoView({behavior: 'smooth'}); resolve(null);},40 );
      })
      return;
    }
    if(event.target.checked)
    el?.scrollIntoView({behavior: 'smooth'});
  }

  

  public async addRow() {
    let date = this.dateToString(new Date());
    
    const newItem:EtudiantType = {
      Etd_Id: uuid4(),
      Pers_DateNaissance: date,
      Pers_Nom: '',
      Pers_Prenom: '',
      Pers_CinouPass: '',
      Pers_Photo: ''
    };    

    this.studentsGride?.transactions.add({ id: newItem.Etd_Id, type: TransactionType.ADD, newValue: newItem });
    this.backUpPhotos![ newItem.Etd_Id! ] = newItem.Pers_Photo;
    this.studentsGride?.selectRows([newItem.Etd_Id], true)
    this.pkTrackingIndex = newItem.Etd_Id;
    this.updateCurrentStudent(newItem);
    this.updateViewIndex();
    this.studentsGride?.reflow();
    if( this.splitterPane2?.collapsed ) {
      this.splitterPane2?.toggle();
    }
    console.log( "transactions : ", this.studentsGride?.transactions.getTransactionLog() );
    // Todo; Navigate/paginate to created item, pages number stays the same in this function
  }


  
  /**
   * show selected row in the form, using this.SelectedRindex &  this.SelectedRMatricule
   */
  handleRowSelection( evt:any ){
  const newSelection = [...evt.newSelection];

  if( newSelection.length==1 ){
    if( newSelection[0]){
      this.pkTrackingIndex = newSelection[0];
      this.updateCurrentStudent();
      this.updateViewIndex();
      this.FillFormGrids()
    }else{
      this.pkTrackingIndex= undefined;
      this.currentStudent=undefined;
      this.FillFormGrids();
    }
  }else{
    this.pkTrackingIndex= undefined;
    this.currentStudent=undefined;
    this.FillFormGrids();
  }
  if( Boolean(this.currentStudent) == this.splitterPane2?.collapsed) {
    this.splitterPane2?.toggle();
  }
}

  /**
   * this is a generic function that applies the changes of any field to the transaction layer
   * @param event default event
   * @param fieldName handled field name
   */
  handleFieldChange( event :any, fieldName:string){
    const agregatedChanges : EtudiantType = this.studentsGride?.dataWithAddedInTransactionRows.find((elem)=>elem.Etd_Id==this.pkTrackingIndex);
    const newValue = event.target.value;
    let matricule : string= '';
    switch( fieldName ){
      case 'Pers_Nom' :
        if( agregatedChanges.Pers_Prenom && agregatedChanges.Pers_DateNaissance )
          matricule = this.generateMaticule( newValue, agregatedChanges.Pers_Prenom, agregatedChanges.Pers_DateNaissance);
        break;
      case 'Pers_Prenom' : 
        if( agregatedChanges.Pers_Nom && agregatedChanges.Pers_DateNaissance )
          matricule = this.generateMaticule( agregatedChanges.Pers_Nom, newValue, agregatedChanges.Pers_DateNaissance);
        break;
      case 'Pers_DateNaissance':
          if( agregatedChanges.Pers_Nom && agregatedChanges.Pers_Prenom )
            matricule = this.generateMaticule( agregatedChanges.Pers_Nom, agregatedChanges.Pers_Prenom, newValue);
          break;
    }    
    let editTransaction : Transaction = {
      id: this.currentStudent?.Etd_Id,
      type: TransactionType.UPDATE,
      newValue: { [fieldName]: newValue },
    }
    if( matricule.length )
      editTransaction.newValue.Etd_Matricule = matricule;
    
    let modifiedItem : EtudiantType|null = this.studentsGride?.transactions.getAggregatedValue( this.pkTrackingIndex, true);
    if( modifiedItem!=null )
      this.studentsGride?.transactions.add( editTransaction, modifiedItem); 
    else
      this.studentsGride?.transactions.add( editTransaction, this.getItemByid(this.pkTrackingIndex!) ); 
    this.currentStudent = this.studentsGride?.transactions.getAggregatedValue( this.pkTrackingIndex, true)
  }

  handleSexeChange( event:any){
    const newSexeId :string = event;
    let newSexeNom :string='';
    this.formData.gendersArr.forEach( ele =>{
      if( ele.genderId == newSexeId )
        newSexeNom = ele.genderNamekey;
    })
    newSexeNom = newSexeNom.split('.')[1]; 
    let editTransaction : Transaction = {
      id: this.currentStudent?.Etd_Id,
      type: TransactionType.UPDATE,
      newValue: { 'Sexe_Id': newSexeId, 'Sexe_Nom': newSexeNom }
    }
    let modifiedItem : EtudiantType|null = this.studentsGride?.transactions.getAggregatedValue( this.pkTrackingIndex, true);
    if( modifiedItem!=null )
      this.studentsGride?.transactions.add( editTransaction, modifiedItem); 
    else
      this.studentsGride?.transactions.add( editTransaction, this.getItemByid(this.pkTrackingIndex!) ); 
    this.currentStudent = this.studentsGride?.transactions.getAggregatedValue( this.pkTrackingIndex, true)
  }

  handlePaysChange(event:any){
    const newPaysId :string = event;
    let newPaysNom :string='';
    this.formData.countriesArr.forEach( ele =>{
      if( ele.countryId == newPaysId )
        newPaysNom = ele.countryNamekey;
    })
    newPaysNom = newPaysNom.split('.')[1]; 
    let editTransaction : Transaction = {
      id: this.currentStudent?.Etd_Id,
      type: TransactionType.UPDATE,
      newValue: { 'Pays_Id': newPaysId, 'Pays_Nom': newPaysNom }
    }
    let modifiedItem : EtudiantType|null = this.studentsGride?.transactions.getAggregatedValue( this.pkTrackingIndex, true);
    if( modifiedItem!=null )
      this.studentsGride?.transactions.add( editTransaction, modifiedItem); 
    else
      this.studentsGride?.transactions.add( editTransaction, this.getItemByid(this.pkTrackingIndex!) ); 
    this.currentStudent = this.studentsGride?.transactions.getAggregatedValue( this.pkTrackingIndex, true)
  }

  handleNationalityChange(event:any){

    const newNationalityId :string = event;
    let editTransaction : Transaction = {
      id: this.currentStudent?.Etd_Id,
      type: TransactionType.UPDATE,
      newValue: { 'Nation_Id': newNationalityId }
    }
    let modifiedItem : EtudiantType|null = this.studentsGride?.transactions.getAggregatedValue( this.pkTrackingIndex, true);
    if( modifiedItem!=null )
      this.studentsGride?.transactions.add( editTransaction, modifiedItem); 
    else
      this.studentsGride?.transactions.add( editTransaction, this.getItemByid(this.pkTrackingIndex!) ); 
    this.currentStudent = this.studentsGride?.transactions.getAggregatedValue( this.pkTrackingIndex, true)
  }

  dateNaissFormatter( dateNaiss :string){
    if( dateNaiss==undefined ) return '';
    let arr = dateNaiss.split('-');
    let ret = arr.pop()+'/'+arr.pop()+'/'+arr.pop()
    return ret;
  }

  private generateMaticule( nom :string, prenom :string, dateNaiss :string){
    let date = dateNaiss.split('-');
    let ret : string = prenom.charAt(0).toUpperCase() + prenom.slice(1).toLowerCase();
    ret = ret.slice(0,3);
    ret += nom.charAt(0).toUpperCase()
    ret += date.pop();
    ret += date.pop();
    ret += date.pop();
    return ret;
  }

  /**
   *  Keeps other sections grids up to date
   */
  FillFormGrids(){
    if(this.currentStudent != undefined){
      this.programGridConfig.data = this.currentStudent?.ACD_EtudiantProgramme? this.currentStudent!.ACD_EtudiantProgramme.map(x => Object.assign({}, x)): []   ;
      if( !this.currentStudent.programTransactions )  this.currentStudent.programTransactions=[]; 
      this.programGridConfig.transactions = this.currentStudent.programTransactions; 

      this.formationGridConfig.data = this.currentStudent?.ACD_EtudiantFormation? this.currentStudent!.ACD_EtudiantFormation.map(x => Object.assign({}, x)):[]   ; // copies to prevent editing the original object
      if( !this.currentStudent.formationTransactions )  this.currentStudent.formationTransactions=[]; 
      this.formationGridConfig.transactions = this.currentStudent.formationTransactions; 

      this.tuteurGridConfig.data = this.currentStudent?.ACD_EtudiantTuteur? this.currentStudent!.ACD_EtudiantTuteur.map(x => Object.assign({}, x)):[]   ; // copies to prevent editing the original object
      if( !this.currentStudent.tuteurTransactions )  this.currentStudent.tuteurTransactions=[]; 
      this.tuteurGridConfig.transactions = this.currentStudent.tuteurTransactions; 
      
      this.moyenrecruGridConfig.data = this.currentStudent?.ACD_EtudiantMoyenrecrutem? this.currentStudent!.ACD_EtudiantMoyenrecrutem.map(x => Object.assign({}, x)):[]   ; // copies to prevent editing the original object
      if( !this.currentStudent.moyenrecrutTransactions )  this.currentStudent.moyenrecrutTransactions=[]; 
      this.moyenrecruGridConfig.transactions = this.currentStudent.moyenrecrutTransactions; 
    }else{
      this.programGridConfig.data =  [];
      this.formationGridConfig.data = [];
      this.tuteurGridConfig.data = [];
      this.moyenrecruGridConfig.data = [];
    }
  }


  /**
   * Deletes selected Rows
   */
  deleteRows(){
    this.studentsGride?.selectedRows.forEach(rowNum=>{
      const deleteTransaction: Transaction = {
        id: rowNum,
        type: TransactionType.DELETE,
        newValue: null
      };
      let deletedItem : EtudiantType|null = this.studentsGride?.transactions.getAggregatedValue( rowNum, true);
      if( deletedItem!=null )
        this.studentsGride?.transactions.add( deleteTransaction, deletedItem); 
      else
        this.studentsGride?.transactions.add( deleteTransaction, this.getItemByid(rowNum) ); 
    })
    this.pkTrackingIndex = undefined ;
    this.currentStudent = undefined;
    this.studentsGride?.deselectAllRows();
    this.studentsGride?.reflow();
    if(! this.splitterPane2?.collapsed)
    this.splitterPane2?.toggle()
  }

    
  /**
   * Navigation button previous row 
   */
  previousRow(){
    if( this.viewTrakingIndex == undefined || this.viewTrakingIndex<1)
      return;
    const prevRowData : any = this.studentsGride?.dataWithAddedInTransactionRows[this.viewTrakingIndex!-1];
    this.studentsGride?.selectRows( [prevRowData.Etd_Id], true );
    this.pkTrackingIndex = prevRowData.Etd_Id;
    this.updateCurrentStudent();
    this.updateViewIndex();
    this.studentsGride?.navigateTo(this.viewTrakingIndex!); // this.viewTrakingIndex is updated in the previous line
    $('.tooltip.show').remove()
  }

  /**
   * Navigation button next row 
   */
  nextRow(){
    if( this.viewTrakingIndex == undefined || (this.viewTrakingIndex >=(this.studentsGride!.dataWithAddedInTransactionRows.length! -1) ) )
      return;
    const nextRowData : any = this.studentsGride?.dataWithAddedInTransactionRows[this.viewTrakingIndex!+1];
    this.studentsGride?.selectRows( [nextRowData.Etd_Id ], true );
    this.pkTrackingIndex = nextRowData.Etd_Id;
    this.updateCurrentStudent();
    this.updateViewIndex();
    this.studentsGride?.navigateTo(this.viewTrakingIndex!);// this.viewTrakingIndex is updated in the previous line
    $('.tooltip.show').remove()
  }


  SearchTypeChangeHandler( evt:any){
    const val :string = evt.target.value;
    if(val == "multi"){
      $("#multiCrSearchForm").removeClass("d-none").addClass("d-block").addClass("d-lg-flex");
      $("#CursusSearchForm").removeClass("d-block").removeClass('d-lg-flex').addClass("d-none");
    }else{
      $("#multiCrSearchForm").addClass("d-none").removeClass("d-block").removeClass('d-lg-flex');
      $("#CursusSearchForm").removeClass("d-none").addClass("d-block").addClass("d-lg-flex");
    }
    $('.tooltip.show').remove()
  }

  async photoChangeHandler(evt:any){
    const fileInput = evt.target;
    
    if (fileInput.files && fileInput.files[0]) {
      
      // Config
      /*
      const max_size = 3 * 1048576; // size in bytes (currently 3MB)
      const allowed_types = ['image/png', 'image/jpeg', 'image/jpg', 'image/bmp'];
      */
      //size validation
      /*
      if (fileInput.files[0].size > max_size) {
          this.photoError =' La taille maximale de la photo est ' + max_size / 1048576 + 'Mo.';
          return false;
      }
      */

      this.photoType = (fileInput.files[0].type as string).toLowerCase(); 
      // image type validation
      /*
      if (! (Boolean)( allowed_types.find( e=> e==this.photoType ) ) ) {
          this.photoError = 'Les types de photo supportés ( JPG | PNG | BMP )';
          return false;
      }
      */  
      
      let reader:FileReader = new FileReader();
      reader.onload = this.photoReaderHanler.bind(this);
      reader.readAsBinaryString(fileInput.files[0]);
    }
    fileInput.value = "";
  }

  private photoReaderHanler( readerEvt:any ){
    let binaryString:string = readerEvt.target.result.toString();
    const max_height = 200; // Config
    const max_width = 200;

    // Resolution validation
    /*
    const img = new Image();
    img.onload = ()=>{
      if(img.width>max_width || img.height>max_height)
        this.photoError = `Résolution de la photo est invalide max ${max_height}x${max_width} pixels !`;
        return;
    };
    img.src = `data:${this.photoType};base64,`+btoa(binaryString);
    */
    const photo64Base :string = `data:${this.photoType};base64,`+btoa(binaryString);
    const editTransaction : Transaction = {
      id: this.currentStudent?.Etd_Id,
      type: TransactionType.UPDATE,
      newValue: { Pers_Photo: photo64Base },
    }

    let updatedItem : EtudiantType|null = this.studentsGride?.transactions.getAggregatedValue( this.pkTrackingIndex, true);
    if( updatedItem!=null )
      this.studentsGride?.transactions.add( editTransaction, updatedItem); 
    else
      this.studentsGride?.transactions.add( editTransaction, this.getItemByid( this.pkTrackingIndex! ) ); 
    
    this.updateViewIndex();
    this.updateCurrentStudent();  
  }


  resetPhoto(){
    let backUpPhotos = this.backUpPhotos;
    let index = this.currentStudent!.Etd_Id! as keyof typeof backUpPhotos;

    const editTransaction : Transaction = {
      id: this.currentStudent?.Etd_Id,
      type: TransactionType.UPDATE,
      newValue: { Pers_Photo: this.backUpPhotos![index] },
    }

    let updatedItem : EtudiantType|null = this.studentsGride?.transactions.getAggregatedValue( this.pkTrackingIndex, true);
    if( updatedItem!=null )
      this.studentsGride?.transactions.add( editTransaction, updatedItem); 
    else
      this.studentsGride?.transactions.add( editTransaction, this.getItemByid( this.pkTrackingIndex! ) ); 
    this.updateViewIndex();
    this.updateCurrentStudent(); 
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

  
  /****  # Utility funcitons  */

  dateToString(date:Date):string{
    let str='';
      str= date.getFullYear()+'-';
    if(date.getMonth()+1<10)
      str += '0'+(date.getMonth()+1)+'-';
    else 
      str += (date.getMonth()+1)+'-';
    if(date.getDate()<10)
      str += '0'+date.getDate();
    else 
      str += date.getDate();
    return str;
  }


  /**
   * get student object by id
   * @param id number, id of selected row
   * @returns EtudiantType object or null
   */
  private getItemByid( id: string):EtudiantType|undefined{
    for( let i=0; i< this.gridConfig.data.length; i++)
      if( this.gridConfig.data[i].Etd_Id==id )
      return this.gridConfig.data[i];
    return undefined;
  }

  private updateViewIndex(){
    const data : any = this.studentsGride?.dataWithAddedInTransactionRows;
    if(data.length){
      for(let i=0; i<data.length; i++)
        if( data[i].Etd_Id==this.pkTrackingIndex )
        return (this.viewTrakingIndex = i);
      return (this.viewTrakingIndex = undefined);
    }else{
      return (this.viewTrakingIndex =  this.studentsGride?.getRowByKey(this.pkTrackingIndex)?.viewIndex );
    }
  }

  /**
   * updates the student on the form 
   * @param newStudent optional student to copy in the form
   */
  private updateCurrentStudent( newStudent ?:EtudiantType){
    if( newStudent!=undefined )
      this.currentStudent = Object.assign( {}, newStudent ); // Object.assign() to make a copy of the object
    else{
      let Student = this.studentsGride?.transactions.getAggregatedValue( this.pkTrackingIndex, true);
      if( Student!=null && Student!=undefined )
        this.currentStudent = Object.assign( {}, Student );
      else{
        this.currentStudent = Object.assign( {}, this.getItemByid( this.pkTrackingIndex! ) );
        if( this.currentStudent?.Etd_Id == undefined )
          this.currentStudent = undefined;
      }
    }
  }

  async GetData(){
    /*
      TO cancel a request have a look at :  https://stackoverflow.com/questions/36490926/how-to-cancel-a-httprequest-in-angular-2 
    */
    let confirmDataClear :boolean = await this.clearData(); 
    if( ! confirmDataClear )
      return;
    var loaderSubscrition:any;
    let dataPromise : Promise <EtudiantType[]> = new Promise <EtudiantType[]>( resolve=>{
      let timeOutThing : any ;
      this.loader.loaderDialogEmitter.emit({ isOpen: true, isCancelable: true});  // open loader
      loaderSubscrition = this.loader.loaderCancelEmitter.subscribe( (val :any)=>{ 
        clearTimeout(timeOutThing);
        console.log( " Request Canceled ! data : ",val ); 
        resolve([]);
      });
      timeOutThing = setTimeout( ()=>{
        loaderSubscrition.unsubscribe();
        resolve(Etudiants);
        }, 1500)
    })

    this.gridConfig.data= await dataPromise ;
    if( this.gridConfig.data.length ){
        this.pkTrackingIndex = this.gridConfig.data[0].Etd_Id;
        this.viewTrakingIndex= 0;
        this.updateCurrentStudent();
        this.studentsGride?.selectRows( [ this.pkTrackingIndex], true);
        if(this.splitterPane2?.collapsed)
          this.splitterPane2.toggle();
        this.FillFormGrids();
        for(let i:number=0; i<this.gridConfig.data.length; i++)
          this.backUpPhotos[ this.gridConfig.data[i].Etd_Id! ] = this.gridConfig.data[i].Pers_Photo; 
    }
    loaderSubscrition?.unsubscribe();
    this.FillFormGrids()
    this.loader.loaderDialogEmitter.emit({ isOpen: false, isCancelable: false}); // close loader
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
    this.backUpPhotos = {};
    this.currentStudent=undefined;
    this.viewTrakingIndex = undefined;
    this.pkTrackingIndex = undefined;
    return true;
  }


  /***##  Style functions  */

  /**
   *  Turns a form section into a JQueryUI Dialog object 
   * @param id : of the element
   * @param title : title of the section
   */
  getDialog( id: string, title: string){
    this.translate.get(title).toPromise().then( tvalue=>{
      $(()=>{
        const parent : any = $('#'+id).parent(); 
        $(parent).addClass('d-none');
        $('#'+id).dialog({
          title : tvalue,
          width: "92%",
          closeText: ' hide ',
          minWidth: '800',
          minHeight: '360',
          close: ( event :any, ui :any )=>{
            $('#'+id).dialog('destroy');
            let showIt:boolean=false;
            switch(id){
              case "Section1":
                showIt = this.formData.personalInfos; break;
              case "Section2":
                showIt = this.formData.programs; break;
              case "Section3":
                showIt = this.formData.formations; break;
              case "Section4":
                showIt = this.formData.tuteurs; break;
              case "Section5":
                showIt = this.formData.moyensRecrut; break;
              case "Section6":
                showIt = this.formData.semestres; break;
              case "Section7":
                showIt = this.formData.notes; break;
              case "Section8":
                showIt = this.formData.biblio; break;
              case "Section9":
                showIt = this.formData.paiement; break;
              case "Section10":
                showIt = this.formData.absence; break;
            }
            if(showIt)
            $(parent).removeClass('d-none');
          },
        });
      })
    })
  }


  /**
   * Keeps the igx-grid at 100% height
   */
  resizingSplitter(){
    if( window.innerWidth<=590 && this.splitterPane2?.collapsed )
      this.splitterPane2.toggle()
  }

  waitForresizingSplitter(){
    setTimeout(this.resizingSplitter,120);
  }

  wiatResizeGrid(event:any){
    if(event!=undefined)
      setTimeout( ()=>this.resizingSplitter(), 80)
  }

  /**
  *   Hides splitting Bar on mobile & fixes items Per page 's z-index property
  */
  private responsiveSplitter(){
      if( $(document).width()< 590 ){
        $('#splitterPane2')?.css('overflow','visible').css('height','100vh').css('max-height', 'unset');
        $('#splitterPane2')?.next().addClass('d-none').css('z-index',0);
      }
      else {
        $('#splitterPane2')?.css('overflow','auto').css('height','unset').css('max-height', '100%');
        $('#splitterPane2')?.next().removeClass('d-none').css('z-index',0);
      }
  }



  /**
   * Used to open modal of : Grid columns hiding menu
   */
  toggleGridColumnsModal(){
    var myModal = new bootstrap.Modal(document.getElementById('GridColumnsModal'), {});
    myModal.toggle();
  }

  // displays student's sexe on the grid : translated
  SexeFormatter(genderNameKey2ndSegement:string){
    let genderTranslations :any = this?.formData?.gendersTranslations;
    let key  = genderNameKey2ndSegement as keyof typeof genderTranslations;
    if( !key || !genderTranslations) return "";
    return genderTranslations[key];
  }

  // when changing sexe on the grid, this function creates edit transaction
  handleSexeOnGridChange(sexeKey:string, cell :IgxGridCellComponent){
    let element = this.formData.gendersArr.find(ele=>ele.genderNamekey==("GENDERS."+sexeKey));
    let gendersTranslations =  this.formData.gendersTranslations, translation='';
    let gender2ndSeglent = element.genderNamekey.split('.')[1] as keyof typeof gendersTranslations ;
    if(gender2ndSeglent)
    translation = this.formData.gendersTranslations[gender2ndSeglent];
    let editTransaction : Transaction = {
      id: this.currentStudent?.Etd_Id,
      type: TransactionType.UPDATE,
      newValue: { 'Sexe_Id': element.genderId, 'Sexe_Nom': translation }
    }
    let modifiedItem : EtudiantType|null = this.studentsGride?.transactions.getAggregatedValue( cell.row.key, true);
    if( modifiedItem!=null )
      this.studentsGride?.transactions.add( editTransaction, modifiedItem); 
    else
      this.studentsGride?.transactions.add( editTransaction, this.getItemByid(cell.row.key!) ); 
    this.currentStudent = this.studentsGride?.transactions.getAggregatedValue( cell.row.key, true)
  }


  NationalityFormatter( nationalityID:string):string{
    let nationalityNameKey = this.formData?.nationalitiesArr?.find(ele=>ele.nationalityId==nationalityID)?.nationalityNamekey;
    let nationality2ndSegment = nationalityNameKey?.split(".")?.pop();

    let nationalityTranslations :any = this?.formData?.nationalitiesTranslations;
    let key  = nationality2ndSegment as keyof typeof nationalityTranslations;
    if( !key || !nationalityTranslations) return "";
    return nationalityTranslations[key];
  }

  // when changing nationality directly on the grid, this function creates edit transaction
  handleNationalityOnGridChange(nationalityId:string, cell :IgxGridCellComponent){
    let editTransaction : Transaction = {
      id: this.currentStudent?.Etd_Id,
      type: TransactionType.UPDATE,
      newValue: { 'Nation_Id': nationalityId }
    }
    let modifiedItem : EtudiantType|null = this.studentsGride?.transactions.getAggregatedValue( cell.row.key, true);
    if( modifiedItem!=null )
      this.studentsGride?.transactions.add( editTransaction, modifiedItem); 
    else
      this.studentsGride?.transactions.add( editTransaction, this.getItemByid(cell.row.key!) ); 
    this.currentStudent = this.studentsGride?.transactions.getAggregatedValue( cell.row.key, true)
  }



  PaysFormatter(genderNameKey2ndSegement:string){
    let countriesTranslations :any = this?.formData?.countriesTranslations;
    let key  = genderNameKey2ndSegement as keyof typeof countriesTranslations;
    if( !key || !countriesTranslations) return "";
    return countriesTranslations[key];
  }

  // when changing sexe on the grid, this function creates edit transaction
  handlePaysOnGridChange(paysKey:string, cell :IgxGridCellComponent){
    let element = this.formData.countriesArr.find(ele=>ele.countryNamekey==("COUNTRIES."+paysKey));
    let countriesTranslations =  this.formData.countriesTranslations, translation='';
    let gender2ndSeglent = element.countryNamekey.split('.')[1] as keyof typeof countriesTranslations ;
    if(gender2ndSeglent)
    translation = this.formData.countriesTranslations[gender2ndSeglent];
    let editTransaction : Transaction = {
      id: this.currentStudent?.Etd_Id,
      type: TransactionType.UPDATE,
      newValue: { 'Pays_Id': element.countryId, 'Pays_Nom': translation }
    }
    let modifiedItem : EtudiantType|null = this.studentsGride?.transactions.getAggregatedValue( cell.row.key, true);
    if( modifiedItem!=null )
      this.studentsGride?.transactions.add( editTransaction, modifiedItem); 
    else
      this.studentsGride?.transactions.add( editTransaction, this.getItemByid(cell.row.key!) ); 
    this.currentStudent = this.studentsGride?.transactions.getAggregatedValue( cell.row.key, true)
  }

  un_check_all( event:any){

    if( event.target.checked )
    this.formData.absence = this.formData.personalInfos = this.formData.programs = this.formData.formations = this.formData.tuteurs = this.formData.moyensRecrut = this.formData.semestres = this.formData.notes = this.formData.biblio = this.formData.paiement =true;
    else
    this.formData.absence = this.formData.personalInfos = this.formData.programs = this.formData.formations = this.formData.tuteurs = this.formData.moyensRecrut = this.formData.semestres = this.formData.notes = this.formData.biblio = this.formData.paiement = false;
  }

}
