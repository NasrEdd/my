import { Component, OnInit, AfterViewInit, ViewChild, Output, EventEmitter, ViewEncapsulation, Input, OnDestroy } from '@angular/core';
import { IgxGridComponent,IgxHierarchicalGridComponent, IgxSplitterPaneComponent  } from 'igniteui-angular';
import { LoaderService } from 'src/app/services/loader-service/loader-service.service';
import { CursusParSem_LeftGrid as etudiantsImportedData } from "src/app/pages/TestingData";
import { ConfirmBoxInitializer, DialogLayoutDisplay } from '@costlydeveloper/ngx-awesome-popup';
import { TranslateService } from '@ngx-translate/core';
import { v4 as uuidv4 } from 'uuid';
import { IPaginatorResourceStrings, IGridResourceStrings, changei18n } from "igniteui-angular"; // Enable translation of the Igx-Grid Words
import { GridConfiguration } from 'src/app/models/GridConfiguration.interface';
import { Semestre as SemestreType } from 'src/app/models/entities-cursus-par-semestre/semestre.interface';
import { NouveauEtudiant as NouveauEtudiantType } from 'src/app/models/entities-cursus-par-semestre/nouveauEtudiant.interface';
import { SubSemestreData as SubSemestreDataType } from 'src/app/models/entities-cursus-par-semestre/subSemesterData.interface';
import { Association as AssociationType } from 'src/app/models/entities-cursus-par-semestre/association.interface';


declare var $: any;
declare var bootstrap: any;

@Component({
  encapsulation: ViewEncapsulation.None, // to apply splitting bar theme
  selector: 'app-mode-association',
  templateUrl: './mode-association.component.html',
  styleUrls: ['./mode-association.component.scss']
})
export class ModeAssociationComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild("StudentsGrid", {read : IgxHierarchicalGridComponent , static: true}) public studentsGrid?: IgxHierarchicalGridComponent ;
  @ViewChild("SemestersGrid", {read : IgxGridComponent, static: true}) public SemestersGrid?: IgxGridComponent;
  @ViewChild("SemestersPane", {read : IgxSplitterPaneComponent, static: true}) public SemestersPane?: IgxSplitterPaneComponent; // used to collapse/expande semsters Splitter pan

  @Output('annulerEmitter') annulerEmitter : EventEmitter<any> = new EventEmitter<any>(); // used to emit closing state of this section
  @Output('donneesAssocies') donneesAssocies : EventEmitter<any[]> = new EventEmitter<any[]>(); // used to emit associated data to parent

  grid1ColumnsConfig : GridConfiguration<NouveauEtudiantType> = {
    data:[],
    primaryKey: "EtdPrg_Id",
    apiSet:{
      create: '',
      update: '',
      delete: ''
    },
    creatHandler: ()=>null,
    edittedHandler: ()=>null,
    deleteHandler: ()=>null,
    columns:[
    { field : 'EtdPrg_Id', header: 'ID', dataType: 'number', visible: false, sortable: true, resizable: false, filterable:false, editable:false, searchable:false, allowHide:false, width: ''},
    { field : 'Etd_Matricule', header: 'CURSUSPARSEM.ASSOCIATION.GRID1HEADERS.MATR', dataType: 'string', visible: true, sortable: true, resizable: true, filterable: true, editable: false, searchable:true, draggable:true, groupable:true, allowHide:true, width: ''},
    { field : 'Pers_Nom', header: 'CURSUSPARSEM.ASSOCIATION.GRID1HEADERS.NOM', dataType: 'string', visible: true, sortable: true, resizable: true, filterable: true, editable:false, searchable:true, draggable:true, groupable:true, allowHide:true, width: ''},
    { field : 'Pers_Prenom', header: 'CURSUSPARSEM.ASSOCIATION.GRID1HEADERS.PRENOM', dataType: 'string', visible: true, sortable: true, resizable: true, filterable: true, editable:false, searchable:true, draggable:true, groupable:true, allowHide:true, width: ''},
    { field : 'Fac_Nom', header: 'CURSUSPARSEM.ASSOCIATION.GRID1HEADERS.FACULTY', dataType: 'string', visible: true, sortable: true, resizable: true, filterable: true, editable:false, searchable:true, draggable:true, groupable:true, allowHide:true, width: ''},
    { field : 'Fac_Id', header: 'Fac_Id', dataType: 'string', visible: false, sortable: false, resizable: false, filterable: false, editable:false, searchable:false, draggable:false, groupable:false, allowHide:false, width: ''},
    { field : 'Prg_Code', header: 'CURSUSPARSEM.ASSOCIATION.GRID1HEADERS.PROGCODE', dataType: 'string', visible: true, sortable: true, resizable: true, filterable: true, editable:false, searchable:true, draggable:true, groupable:true, allowHide:true, width: ''},
    { field : 'Prg_Nom', header: 'CURSUSPARSEM.ASSOCIATION.GRID1HEADERS.PROGNOM', dataType: 'string', visible: true, sortable: true, resizable: true, filterable: true, editable:false, searchable:true, draggable:true, groupable:true, allowHide:true, width: ''},
    { field : 'AdmTyp_Id', header: 'CURSUSPARSEM.ASSOCIATION.GRID1HEADERS.ADMISSIONTYPE', dataType: 'string', visible: true, sortable: true, resizable: true, filterable: true, editable:false, searchable:true, draggable:true, groupable:true, allowHide:true, width: ''},
    { field : 'EtdPrg_DateAdmmission', header: 'CURSUSPARSEM.ASSOCIATION.GRID1HEADERS.ADMISSIONDATE', dataType: 'date', visible: true, sortable: true, resizable: true, filterable: true, editable:false, searchable:true, draggable:true, groupable:true, allowHide:true, width: ''},
    { field : 'EtdPrg_DateInscription', header: 'CURSUSPARSEM.ASSOCIATION.GRID1HEADERS.INSCRDATE', dataType: 'date', visible: true, sortable: true, resizable: true, filterable: true, editable:false, searchable:true, draggable:true, groupable:true, allowHide:true, width: ''},
    { field : 'GrpAdm_Id', header: 'CURSUSPARSEM.ASSOCIATION.GRID1HEADERS.ADMISSIONGRP', dataType: 'string', visible: true, sortable: true, resizable: true, filterable: true, editable:false, searchable:true, draggable:true, groupable:true, allowHide:true, width: ''},
    { field : 'PrgTyp_Id', header: 'CURSUSPARSEM.ASSOCIATION.GRID1HEADERS.PROGTYPE', dataType: 'string', visible: true, sortable: true, resizable: true, filterable: true, editable:false, searchable:true, draggable:true, groupable:true, allowHide:true, width: ''},
    { field : 'Niv_Id', header: 'CURSUSPARSEM.ASSOCIATION.GRID1HEADERS.ADMISSIONNIV', dataType: 'string', visible: true, sortable: true, resizable: true, filterable: true, editable:false, searchable:true, draggable:true, groupable:true, allowHide:true, width: ''},
    { field : 'Spec_Name', header: 'CURSUSPARSEM.ASSOCIATION.GRID1HEADERS.ADMISSIONFIL', dataType: 'string', visible: true, sortable: true, resizable: true, filterable: true, editable:false, searchable:true, draggable:true, groupable:true, allowHide:true, width: ''},
    { field : 'Ann_Id', header: 'CURSUSPARSEM.ASSOCIATION.GRID1HEADERS.ADMISSIONANN', dataType: 'string', visible: true, sortable: true, resizable: true, filterable: true, editable:false, searchable:true, draggable:true, groupable:true, allowHide:true, width: ''},
    { field : 'EtdPrg_Remarque', header: 'ID', dataType: 'string', visible: false, sortable: true, resizable: false, filterable:false, editable:false, searchable:false, allowHide:false, width: ''},
    { field : 'ProgEtdStatu_Id', header: 'ID', dataType: 'string', visible: false, sortable: true, resizable: false, filterable:false, editable:false, searchable:false, allowHide:false, width: ''},
    { field : 'Etd_Id', header: 'ID', dataType: 'string', visible: false, sortable: true, resizable: false, filterable:false, editable:false, searchable:false, allowHide:false, width: ''},
    { field : 'Prg_Id', header: 'ID', dataType: 'string', visible: false, sortable: true, resizable: false, filterable:false, editable:false, searchable:false, allowHide:false, width: ''},
    { field : 'EtdPrg_NumInscription', header: 'ID', dataType: 'string', visible: false, sortable: true, resizable: false, filterable:false, editable:false, searchable:false, allowHide:false, width: ''},
    { field : 'Spec_Id', header: 'ID', dataType: 'string', visible: false, sortable: true, resizable: false, filterable:false, editable:false, searchable:false, allowHide:false, width: ''},
    { field : 'ProgEtdStatu_Nom', header: 'ID', dataType: 'string', visible: false, sortable: true, resizable: false, filterable:false, editable:false, searchable:false, allowHide:false, width: ''},
    { field : 'Semestres', header: 'ID', dataType: 'object', visible: false, sortable: true, resizable: false, filterable:false, editable:false, searchable:false, allowHide:false, width: ''},

  ]};

  grid2ColumnsConfig : GridConfiguration<SemestreType> = {
    data:[],
    primaryKey:'SpecSmsSess_Id',
    apiSet: {
      create:'',
      update:'',
      delete:'',
    },
    columns:[
    { field : 'SpecSmsSess_Id', header: 'SpecSmsSess_Id', dataType: 'string', visible: false, sortable: false, resizable: false, filterable: false, editable:false, searchable:false, allowHide:false, width: ''},
    { field : 'Fac_Nom', header: 'CURSUSPARSEM.ASSOCIATION.GRID2HEADERS.FACULTY', dataType: 'string', visible: true, sortable: true, resizable: true, filterable: true, editable:false, searchable:true, allowHide:true, width: ''},
    { field : 'Fac_Id', header: 'Fac_Id', dataType: 'string', visible: false, sortable: false, resizable: false, filterable: false, editable:false, searchable:false, draggable:false, groupable:false, allowHide:false, width: ''},
    { field : 'Prg_Nom', header: 'CURSUSPARSEM.ASSOCIATION.GRID2HEADERS.PROGRAM', dataType: 'string', visible: true, sortable: true, resizable: true, filterable: true, editable:false, searchable:true, allowHide:true, width: ''},
    { field : 'Prg_Code', header: 'CURSUSPARSEM.ASSOCIATION.GRID2HEADERS.PROGCODE', dataType: 'string', visible: true, sortable: true, resizable: true, filterable: true, editable:false, searchable:true, allowHide:true, width: ''},
    { field : 'Spec_Name', header: 'CURSUSPARSEM.ASSOCIATION.GRID2HEADERS.FILIERE', dataType: 'string', visible: true, sortable: true, resizable: true, filterable: true, editable:false, searchable:true, allowHide:true, width: ''},
    { field : 'Niv_Nom', header: 'CURSUSPARSEM.ASSOCIATION.GRID2HEADERS.NIVEAU', dataType: 'string', visible: true, sortable: true, resizable: true, filterable: true, editable:false, searchable:true, allowHide:true, width: ''},
    { field : 'Sms_Nom', header: 'CURSUSPARSEM.ASSOCIATION.GRID2HEADERS.SEMESTRE', dataType: 'string', visible: true, sortable: true, resizable: true, filterable: true, editable:false, searchable:true, allowHide:true, width: ''},
    { field : 'Ann_Nom', header: 'CURSUSPARSEM.ASSOCIATION.GRID2HEADERS.ANNEE', dataType: 'string', visible: true, sortable: true, resizable: true, filterable: true, editable:false, searchable:true, allowHide:true, width: ''},
    { field : 'Ann_Id', header: 'Ann_Id', dataType: 'string', visible: false, sortable: false, resizable: false, filterable: false, editable:false, searchable:false, allowHide:false, width: ''},
    { field : 'Sess_Nom', header: 'CURSUSPARSEM.ASSOCIATION.GRID2HEADERS.PERIOD', dataType: 'string', visible: true, sortable: true, resizable: true, filterable: true, editable:false, searchable:true, allowHide:true, width: ''},
    { field : 'Sess_Id', header: 'Sess_Id', dataType: 'string', visible: false, sortable: false, resizable: false, filterable: false, editable:false, searchable:false, allowHide:false, width: ''},
    { field : 'SpecSms_Id', header: 'SpecSms_Id', dataType: 'string', visible: false, sortable: false, resizable: false, filterable: false, editable:false, searchable:false, allowHide:false, width: ''},
    ],
    creatHandler: ()=>null,
    edittedHandler: ()=>null,
    deleteHandler: ()=>null
  };

  subGridColumnsConfig :GridConfiguration<SubSemestreDataType> = {
    primaryKey:'',
    apiSet:{
      create:'',
      update:'',
      delete:''
    },
    creatHandler: ()=>null,
    edittedHandler: ()=>null,
    deleteHandler: ()=>null,
    data:[],
    columns: [
    { field : 'Prg_Code', header: 'CURSUSPARSEM.ASSOCIATION.SUBGRIDHEADERS.PROGCODE', dataType: 'string', visible: true, sortable: false, resizable: true, filterable: false, editable:false, searchable:false, allowHide:true, width: ''},
    { field : 'Prg_Nom', header: 'CURSUSPARSEM.ASSOCIATION.SUBGRIDHEADERS.PROGNOM', dataType: 'string', visible: true, sortable: false, resizable: true, filterable: false, editable:false, searchable:false, allowHide:true, width: ''},
    { field : 'Spec_Name', header: 'CURSUSPARSEM.ASSOCIATION.SUBGRIDHEADERS.FILIERE', dataType: 'string', visible: true, sortable: false, resizable: true, filterable: false, editable:false, searchable:false, allowHide:true, width: ''},
    { field : 'Sms_Nom', header: 'CURSUSPARSEM.ASSOCIATION.SUBGRIDHEADERS.SEMESTER', dataType: 'string', visible: true, sortable: false, resizable: true, filterable: false, editable:false, searchable:false, allowHide:true, width: ''},
    { field : 'Sess_Nom', header: 'CURSUSPARSEM.ASSOCIATION.SUBGRIDHEADERS.PERIODE', dataType: 'string', visible: true, sortable: false, resizable: true, filterable: false, editable:false, searchable:false, allowHide:true, width: ''},
    { field : 'EtdSpecSms_Moyenne', header: 'CURSUSPARSEM.ASSOCIATION.SUBGRIDHEADERS.MOYENNE', dataType: 'number', visible: true, sortable: false, resizable: true, filterable: false, editable:false, searchable:false, allowHide:true, width: ''},
    { field : 'EtdSpecSms_Validation', header: 'CURSUSPARSEM.ASSOCIATION.SUBGRIDHEADERS.VALIDE', dataType: 'boolean', visible: true, sortable: false, resizable: true, filterable: false, editable:false, searchable:false, allowHide:true, width: ''},
  
    { field : 'Niv_Nom', header: 'CURSUSPARSEM.ASSOCIATION.SUBGRIDHEADERS.NIVEAU', dataType: 'string', visible: false, sortable: false, resizable: true, filterable: false, editable:false, searchable:false, allowHide:true, width: ''},
    { field : 'Ann_Nom', header: 'CURSUSPARSEM.ASSOCIATION.SUBGRIDHEADERS.ANNEE', dataType: 'string', visible: false, sortable: false, resizable: true, filterable: false, editable:false, searchable:false, allowHide:true, width: ''},
    { field : 'Fac_Nom', header: 'CURSUSPARSEM.ASSOCIATION.SUBGRIDHEADERS.FACULTY', dataType: 'string', visible: false, sortable: false, resizable: true, filterable: false, editable:false, searchable:false, allowHide:true, width: ''},
    { field : 'Sess_Id', header: 'Sess_Id', dataType: 'string', visible: false, sortable: false, resizable: false, filterable: false, editable:false, searchable:false, allowHide:false, width: ''},
    { field : 'SpecSmsSess_Id', header: 'SpecSmsSess_Id', dataType: 'string', visible: false, sortable: false, resizable: false, filterable: false, editable:false, searchable:false, allowHide:false, width: ''},
    { field : 'SpecSms_Id', header: 'SpecSms_Id', dataType: 'string', visible: false, sortable: false, resizable: false, filterable: false, editable:false, searchable:false, allowHide:false, width: ''},
    { field : 'Fac_Id', header: 'Fac_Id', dataType: 'string', visible: false, sortable: false, resizable: false, filterable: false, editable:false, searchable:false, allowHide:false, width: ''},
    { field : 'Ann_Id', header: 'Ann_Id', dataType: 'string', visible: false, sortable: false, resizable: false, filterable: false, editable:false, searchable:false, allowHide:false, width: ''},
    { field : 'EtdPrg_Id', header: 'EtdPrg_Id', dataType: 'string', visible: false, sortable: false, resizable: false, filterable: false, editable:false, searchable:false, allowHide:false, width: ''},
    { field : 'ProgEtdStatu_Id', header: 'ProgEtdStatu_Id', dataType: 'string', visible: false, sortable: false, resizable: false, filterable: false, editable:false, searchable:false, allowHide:false, width: ''},
    { field : 'ProgEtdStatu_Nom', header: 'CURSUSPARSEM.ASSOCIATION.SUBGRIDHEADERS.STAT', dataType: 'string', visible: false, sortable: false, resizable: true, filterable: false, editable:false, searchable:false, allowHide:true, width: ''},
  ]}

  @Input('SemestersData') SemestersData : any[] = [];

  associations : any[]=[];

  // Ressource strings to translate igx-grid words globally from layout : 
  private gridRessourceStrings : IGridResourceStrings = {
    igx_grid_groupByArea_message: ""
  }
  private paginatorResourceStrings: IPaginatorResourceStrings = {
    igx_paginator_label: "",
    igx_paginator_pager_text: "",
  };


  constructor(private loader: LoaderService, private translate: TranslateService) { 
    this.grid2ColumnsConfig.data = [...this.SemestersData];
  }

  ngOnInit(): void {
    $("#AssociationsContainer").ready( ()=>{
      this.createToolTips();
      setTimeout( this.keepGridFullHeight, 220);
      $(window).on('resize', ()=>{
        setTimeout( this.keepGridFullHeight, 200);
      });
      setTimeout( ()=>{  this.grid2ColumnsConfig.data= [...this.SemestersData] ; this.loader.loaderDialogEmitter.emit( {isOpen: false}); }, 100);
    })
    this.setIgxRessourceStrings();
  }

  ngAfterViewInit():void {
  }

  ngOnDestroy():void{
  }

  private setIgxRessourceStrings(){
    this.translate.get('GRIDSTRINGS').toPromise().then( e=>{
      this.gridRessourceStrings.igx_grid_groupByArea_message = e.GROUPINGAREA.AREAMSG;
      changei18n(this.gridRessourceStrings);
    })
    this.translate.get('PAGINATIONSTRINGS').toPromise().then( e=>{
      this.paginatorResourceStrings.igx_paginator_label = e.PAGINATORLABEL;
      this.paginatorResourceStrings.igx_paginator_pager_text = e.PAGERTEXT;
      changei18n(this.paginatorResourceStrings);
    })
  }

  async LoadData( newStudents:boolean, notRegistred:boolean){
    this.loader.loaderDialogEmitter.emit({ isOpen: true, isCancelable: true})
    let loaderSubscrition : any;
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
        resolve(etudiantsImportedData);
        }, 1500)
    })
    this.grid1ColumnsConfig.data= await dataPromise; 
    loaderSubscrition?.unsubscribe();
    this.loader.loaderDialogEmitter.emit({ isOpen: false}); 
  }

  ClearData(){
    this.studentsGrid?.deselectAllRows();
    this.SemestersGrid?.deselectAllRows();
    if( ! ( this.SemestersPane?.collapsed) )
        this.SemestersPane?.toggle()
    this.grid1ColumnsConfig.data= [];
  }

  /**
   * Used to open modal of : Grid columns hiding menu
   */
  toggleGridColumnsModal(){
    var myModal = new bootstrap.Modal(document.getElementById('GridColumnsModalASSO'), {});
    myModal.toggle();
  }

  async Associer(){
    const StudentsSelected : any[] = this.studentsGrid?.selectedRows || [];
    const SemestersSelected : any[] = this.SemestersGrid?.selectedRows || [];
    if( 0==StudentsSelected.length || 0==SemestersSelected.length ){
      const confirmBox = new ConfirmBoxInitializer();
      // Choose layout color type
      confirmBox.setConfig({
          LayoutType: DialogLayoutDisplay.INFO // SUCCESS | INFO | NONE | DANGER | WARNING
      });
      await this.translate.get("MODALCONFIRM.LINK_ETUD_TO_SEM_FIRST").toPromise().then(e=>{
        confirmBox.setTitle(e.headerTitle);
        confirmBox.setMessage(e.bodyText);
        confirmBox.setButtonLabels( e.closeBtnText ); 
        confirmBox.openConfirmBox$();
      })
      return;
    }
    // StudentsSelected + SemestersSelected
    this.loader.loaderDialogEmitter.emit({ isOpen:true });
    let promise:Promise<any> = new Promise<any>(resolve=>{
      let i:number, ii:number;
      let selectedSemester :SemestreType;
      let selectedStudent :NouveauEtudiantType;
      for( ii=0; ii<SemestersSelected.length; ii++){
        selectedSemester = (this.SemestersGrid?.getRowByKey(SemestersSelected[ii]).data as SemestreType);
        for( i=0; i<StudentsSelected.length; i++){
          selectedStudent = (this.studentsGrid?.getRowByKey(StudentsSelected[i]).data as NouveauEtudiantType);
          if( selectedStudent.Fac_Id == selectedSemester.Fac_Id && selectedStudent.Prg_Code == selectedSemester.Prg_Code ){
            let new_Object:AssociationType = {
              EtdSpecSms_Id: uuidv4(),
              Etd_Matricule: selectedStudent.Etd_Matricule,
              Pers_Nom: selectedStudent.Pers_Nom,
              Pers_Prenom: selectedStudent.Pers_Prenom,
              Spec_Id: selectedStudent.Spec_Id,
              Spec_Name: selectedStudent.Spec_Name,
              Niv_Id: selectedStudent.Niv_Id,
              Niv_Nom: selectedSemester.Niv_Nom,
              Sms_Nom: selectedSemester.Sms_Nom,
              Ann_Id: selectedSemester.Ann_Id,
              Ann_Nom: selectedSemester.Ann_Nom,
              Sess_Nom: selectedSemester.Sess_Nom,
              AdmPrg_Code: selectedStudent.Prg_Code,
              AdmPrg_Nom: selectedStudent.Prg_Nom,
              Fac_Nom: selectedSemester.Fac_Nom,
              Prg_Code: selectedSemester.Prg_Code,
              Prg_Nom: selectedSemester.Prg_Nom,
              ProgEtdStatu_Nom: selectedStudent.ProgEtdStatu_Nom,
              EtdPrg_Id: selectedStudent.Prg_Id,
              EtdSpecSms_Moyenne: null,
              EtdSpecSms_Remarque: selectedStudent.EtdPrg_Remarque,
              EtdSpecSms_Validation: null,
              ProgEtdStatu_Id: selectedStudent.ProgEtdStatu_Id,
              SpecSmsSess_Id: selectedSemester.SpecSmsSess_Id,
              GrpSpecSmsSess_Id: selectedStudent.GrpAdm_Id
            }
            this.associations.push(new_Object);  
            this.studentsGrid?.deleteRow(selectedStudent.Etd_Matricule );
          }
        }
      }
      this.studentsGrid?.deselectAllRows();
      this.SemestersGrid?.deselectAllRows();
      if( ! this.SemestersPane?.collapsed ) this.SemestersPane?.toggle();
      resolve(true);
    }).then(e=>{
      this.loader.loaderDialogEmitter.emit({ isOpen:false });
    })    
  }

  Valider(){
    this.loader.loaderDialogEmitter.emit({ isOpen:true});
    this.donneesAssocies.emit( this.associations );
    this.annulerEmitter.emit('CloseAssocMode');
  }

  async Annuler(){
    if(this.associations.length){
      const confirmBox = new ConfirmBoxInitializer();
      confirmBox.setConfig({
          LayoutType: DialogLayoutDisplay.WARNING // SUCCESS | INFO | NONE | DANGER | WARNING
      });
      await this.translate.get("MODALCONFIRM.DISCARD_ASSOCIATIONS").toPromise().then(e=>{
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
      if(result == false) return;
    }
    this.loader.loaderDialogEmitter.emit({ isOpen:true});
    this.annulerEmitter.next('CloseAssocMode');
  }

  handleRowSelectionOfStudent( event:any){
    const newSelection : string[] = event.newSelection;
    if( newSelection.length ){
      this.grid2ColumnsConfig.data = [ ... this.SemestersData]; // copy initial data;
      this.SemestersGrid?.deselectAllRows();
      //filter semester data
      const RowsData:any[] = newSelection.map( (str:string)=>this.studentsGrid?.getRowByKey(str).data ); 

      this.grid2ColumnsConfig.data = this.grid2ColumnsConfig.data.filter( (ele :any)=>{ 
        for( let i=0; i<RowsData.length; i++){          
          if( RowsData[i].Fac_Id == ele.Fac_Id && RowsData[i].Prg_Code==ele.Prg_Code )
            return true;
        }
        return false;
      })

      this.SemestersGrid?.refreshGridState()
      // toggle semesters grid
      if( this.SemestersPane?.collapsed )
        this.SemestersPane.toggle()
    }else{
      if( ! ( this.SemestersPane?.collapsed) )
        this.SemestersPane?.toggle()
      this.grid2ColumnsConfig.data = [ ... this.SemestersData]; // copy initial data;
    }
  }
  
  
  handleRowSelectionOfSemester( event:any){
  }

  
  keepGridFullHeight(){
    let newHeight:number = $($('#AssociationsContainer').parent()).height() - $($('#AssociationsContainer').prev()).height();
    $('#AssociationsContainer').height( newHeight );
    this.studentsGrid?.reflow();
  }

  private createToolTips(){
    // creating all tooltips using bootstrap tooltips
    $( function() {
      let tooltipTriggerList:any = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
      let tooltipList:any = tooltipTriggerList.map(function (tooltipTriggerEl:any) {
        return new bootstrap.Tooltip(tooltipTriggerEl, { placement: 'auto'})
      })
    });
  }

}
