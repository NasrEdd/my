import { Component, OnInit, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { IgxGridComponent, TransactionType } from 'igniteui-angular';
import { createToolTips } from 'src/app/Classes/Helpers';
import { Association as AssociationType } from 'src/app/models/entities-cursus-par-semestre/association.interface';
import { Semestre as SemestreType } from 'src/app/models/entities-cursus-par-semestre/semestre.interface';
import { Etudiant as EtudiantType } from 'src/app/models/entities-dossier-etudiant/etudiant.interface';
import { GridConfiguration } from 'src/app/models/GridConfiguration.interface';
import { v4 as uuid4 } from 'uuid';
import { exampleDataComingFromApi } from './exampleData';

declare var bootstrap:any, $:any;


@Component({
  selector: 'app-semester-section',
  templateUrl: './semester-section.component.html',
  styleUrls: ['./semester-section.component.scss']
})
export class SemesterSectionComponent implements OnInit {

  @ViewChild("GridSemesters", {read : IgxGridComponent}) public gridSemesters?: IgxGridComponent;
  @Input('configuration') configuration ?: GridConfiguration<any>;
  @Output('edittedEmitter') edittedEmitter : EventEmitter<any[]> = new EventEmitter<any[]>();
  @Output('createdEmitter') createdEmitter : EventEmitter<any[]> = new EventEmitter<any[]>();
  @Output('deletedEmitter') deletedEmitter : EventEmitter<any[]> = new EventEmitter<any[]>();
  
  @Input('currentStudent') currentStudent ?: EtudiantType;


  Data : any[] = [];

  ModalData :{  niveaux: any[], programs: any[], filieres: any[], semestres: any[] }={ 
    niveaux : [],
    programs: [],
    filieres: [],
    semestres: []
  };

  selectedData :{niveau:any, program:any, filiere:any, semestre:any, periode:any }={
    niveau: undefined,
    program: undefined,
    filiere: undefined,
    semestre: undefined, 
    periode: undefined
  }

  loaded :boolean = false;
  newAssociationObject ?: AssociationType =  {
    EtdSpecSms_Id: '',
    Spec_Id : undefined,
    Spec_Name : undefined,
    Niv_Id : undefined,
    Niv_Nom : undefined,
    Sms_Nom : undefined,
    Ann_Id : undefined,
    Ann_Nom : undefined,
    Sess_Nom : undefined,
    AdmPrg_Code : undefined,
    AdmPrg_Nom : undefined,
    Fac_Nom : undefined,
    Prg_Code : undefined,
    Prg_Nom : undefined,
    ProgEtdStatu_Nom : undefined,
    EtdPrg_Id : undefined,
    EtdSpecSms_Moyenne : undefined,
    EtdSpecSms_Remarque : undefined,
    EtdSpecSms_Validation : undefined,
    ProgEtdStatu_Id : undefined,
    SpecSmsSess_Id : undefined,
    Etd_Matricule : undefined,
    Pers_Nom : undefined,
    Pers_Prenom : undefined,
    GrpSpecSmsSess_Id : undefined,
  };

  private myModal:any=undefined;

  constructor() { 
  }



  ngOnInit(): void {
    createToolTips();
    this.Data = exampleDataComingFromApi;
    let filiereTab:string[] = new Array<string>();
    let a = new Promise<void>(resolve=>{
      setTimeout(()=>{ 
        this.loaded = !0;
        resolve();
      }, 2300);
    });    
  }

  addRow(){
    this.ModalData.niveaux = [ { id:'niv1', name:'1er année' }, { id:'niv2', name:'2éme année' }, { id:'niv3', name:'3éme année' }, { id:'niv4', name:'4éme année' }, { id:'niv5', name:'5éme année' }];
    this.ModalData.programs = this.ModalData.filieres = this.ModalData.semestres = [];
    this.selectedData = {
      niveau: undefined,
      program: undefined,
      filiere: undefined,
      semestre: undefined, 
      periode: undefined
    };
    this.newAssociationObject = {
      EtdSpecSms_Id: uuid4(),
      Spec_Id : undefined,
      Spec_Name : undefined,
      Niv_Id : undefined,
      Niv_Nom : undefined,
      Sms_Nom : undefined,
      Ann_Id : undefined,
      Ann_Nom : undefined,
      Sess_Nom : undefined,
      AdmPrg_Code : undefined,
      AdmPrg_Nom : undefined,
      Fac_Nom : undefined,
      Prg_Code : undefined,
      Prg_Nom : undefined,
      ProgEtdStatu_Nom : undefined,
      EtdPrg_Id : undefined,
      EtdSpecSms_Moyenne : undefined,
      EtdSpecSms_Remarque : undefined,
      EtdSpecSms_Validation : undefined,
      ProgEtdStatu_Id : undefined,
      SpecSmsSess_Id : undefined,
      Etd_Matricule : undefined,
      Pers_Nom : undefined,
      Pers_Prenom : undefined,
      GrpSpecSmsSess_Id : undefined,
    };
    this.myModal = new bootstrap.Modal(document.getElementById("associationModal"), {});
    $(function(){
      /*
      $('.accordion-always-open').on('show.bs.collapse', function (event:any) {
        $(event.target).data('isShowing', true);
      });
      $('.accordion-always-open').on('hide.bs.collapse', function (event:any) {
          if (!$(event.target).data('isShowing')) {
          event.preventDefault();
        }
        $(event.target).data('isShowing', false);
      });
      */
    });
    $('#associationAccordion > .collapse.show').removeClass('show');
    $('#accordionCollapse1').addClass('show');
    this.myModal.show();
  }


  deleteRows(){
    let selectedRows = this.gridSemesters?.selectedRows;
    if( selectedRows&&selectedRows.length ){
      selectedRows?.forEach(row=>{ 
        let deletedProg :any = { EtdPrg_Id : row };
        this.gridSemesters?.deleteRow(row);
        this.configuration?.transactions?.push({ id: deletedProg.EtdPrg_Id, type: TransactionType.DELETE, newValue: deletedProg });
      })
      this.deletedEmitter.next(this.configuration?.data)
    }
  }

  rowEditDone( event:any){
    if(event.newValue){
      const newValue = event.newValue;
      this.configuration?.transactions?.push({ id: newValue.EtdPrg_Id, type: TransactionType.UPDATE, newValue: newValue });
      this.gridSemesters?.reflow();
      this.edittedEmitter.next(this.configuration?.data)
    }
  }


  /**
 * Used to open modal of : Grid columns hiding menu
 */
  toggleGridColumnsModal(){
    var myModal = new bootstrap.Modal(document.getElementById("SemesterHidingMenu"), {});
    myModal.toggle();
  }

  niveauChange(event:any, niveauid:string){
    this.selectedData.niveau = this.ModalData.niveaux.find( niv=> niv.id==niveauid);
    this.ModalData.programs= this.Data.find( niv=> niv.niveauId==niveauid)?.programs ;
    this.selectedData.program = this.selectedData.filiere = this.selectedData.semestre = this.selectedData.periode = undefined;
    this.ModalData.filieres = this.ModalData.semestres =  [];
    this.newAssociationObject!.Spec_Id=undefined;
    this.newAssociationObject!.Spec_Name=undefined;
  }

  programChange(event:any, progid:string){
    let program = this.ModalData.programs.find( prog=> prog.id==progid);
    this.selectedData.program = program;
    this.ModalData.filieres= program.filieres;
    this.selectedData.filiere = this.selectedData.semestre = this.selectedData.periode = undefined;
    this.ModalData.semestres =  [];
    this.newAssociationObject!.Spec_Id=undefined;
    this.newAssociationObject!.Spec_Name=undefined;
  }

  filiereChange(event:any, filiereid:string){
    let filiere = this.ModalData.filieres.find( fil=> fil.id==filiereid);
    this.selectedData.filiere = filiere;
    this.ModalData.semestres= filiere.semestres;
    this.selectedData.semestre = this.selectedData.periode = undefined;
  }
  
  

  createAssociation(){
    this.newAssociationObject!.Etd_Matricule = this.currentStudent?.Etd_Matricule;
    this.newAssociationObject!.Pers_Nom = this.currentStudent?.Pers_Nom;
    this.newAssociationObject!.Pers_Prenom = this.currentStudent?.Pers_Prenom;

    let semester : SemestreType = this.Data.find( el=> el.SpecSmsSess_Id == this.newAssociationObject!.SpecSmsSess_Id );

    this.newAssociationObject!.Spec_Id = semester.SpecSms_Id;
    this.newAssociationObject!.Niv_Id = semester.Niv_Nom;
    this.newAssociationObject!.Sms_Nom = semester.Sms_Nom;


    this.configuration?.transactions?.push({ id: this.newAssociationObject?.EtdSpecSms_Id, type: TransactionType.ADD, newValue: this.newAssociationObject });
    this.gridSemesters?.reflow();
    this.configuration?.data.push(this.newAssociationObject)
    this.edittedEmitter.next(this.configuration?.data)
    this.myModal.hide();
    this.newAssociationObject = {
      EtdSpecSms_Id: ''
    }
    this.ModalData.niveaux= this.ModalData.semestres = [];
  }
  

}
