import { Component, OnInit } from '@angular/core';
declare var $:any;


@Component({
  selector: 'app-modules-menu-side-bar',
  templateUrl: './modules-menu-side-bar.component.html',
  styleUrls: ['./modules-menu-side-bar.component.scss']
})
export class ModulesMenuSideBarComponent implements OnInit {

  modules:any = [
    { 
      name:"Registrariat",
      id: "registrariatSB",
      elements:[
        { textKey:"DOSSIERETUDIANT.TITLE", url: "dossier-etudiant", icon: 'far fa-folder-open' },
        { textKey:"CURSUSPARSEM.TITLE", url: "cursus-par-semestre", icon:"far fa-calendar-check" },
        { textKey:"CURSUSPARNIV.TITLE", url: "cursus-par-niveau", icon: "far fa-calendar-alt" },
        { textKey:"DOCSADMIN.TITLE", url: "documents-administratifs", icon: "far fa-copy" },
        { textKey:"DIPLOMES.TITLE", url: "diplomes", icon:"fas fa-graduation-cap"}
      ] 
    },
    { 
      name:"Bibliothèque",
      id: "bibliotSB",
      elements:[] 
    },
    { 
      name:"Logement",
      id: "logementSB",
      elements:[] 
    },
    { 
      name:"Pédagogie",
      id: "pedagogySB",
      elements:[] 
    },
    { 
      name:"Paiement",
      id: "PaiementSB",
      elements:[] 
    },
    { 
      name:"Programme",
      id: "programSB",
      elements:[] 
    },
    { 
      name:"Planification",
      id: "planificaSB",
      elements:[] 
    },
    { 
      name:"Extraction",
      id: "extractionSB",
      elements:[] 
    },
    { 
      name:"Admission",
      id: "admissionSB",
      elements:[] 
    },
    { 
      name:"Gestion des ressources",
      id: "gestionRessSB",
      elements:[] 
    },
    {
      name: "Générer Emploit",
      id: "genererSB",
      elements: [
        { textKey: "Smart Planing", url: "smart-planing", icon: 'far fa-folder-open' },
      ]
    }
  ];

  constructor() { 
  }
  closeMenu(){
    $('#modulesSidebar').removeClass('active');
  }

  openMenu(){
    $('#modulesSidebar').addClass('active');
  }


  checkHasClassShow( idCollapsible:string):boolean {
    return document.getElementById(idCollapsible)?.classList.contains('show') == true;
  }


  ngOnInit(): void {

  }

}
