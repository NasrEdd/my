import { EventEmitter, Injectable, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class AppService implements OnDestroy {

  pages: any =
    [
      { index: 1, id: "login", title: "Login", isCurrent: false, isValide: false, url: "/login", hasNext: true, hasPrevisous: false, },
      { index: 2, id: "smart-planing", title: "smartPlaning", isCurrent: false, isValide: false, url: "smart-planing", hasNext: true, hasPrevisous: false, },
      { index: 3, id: "importer", title: "importer", isCurrent: false, isValide: false, url: "smart-planing/importer", hasNext: true, hasPrevisous: false, },
      { index: 4, id: "PreTraitement", title: "PreTraitement", isCurrent: false, isValide: false, url: "/smart-planing/importer/PreTraitement", hasNext: true, hasPrevisous: false, },
      { index: 5, id: "Resumer", title: "Resumer", isCurrent: false, isValide: false, url: "smart-planing/importer/PreTraitement/Resumer", hasNext: true, hasPrevisous: false, },
      { index: 6, id: "Lancement", title: "Lancement", isCurrent: false, isValide: false, url: "smart-planing/importer/PreTraitement/Resumer/Lancement", hasNext: true, hasPrevisous: false, },
      { index: 7, id: "Resultat", title: "Resultat", isCurrent: false, isValide: false, url: "smart-planing/importer/PreTraitement/Resumer/Lancement/Resultat", hasNext: true, hasPrevisous: false, },
      { index: 8, id: "PlanificationCh", title: "PlanificationCh", isCurrent: false, isValide: false, url: "smart-planing/importer/PreTraitement/Resumer/Lancement/Resultat/PlanificationCh", hasNext: false, hasPrevisous: false, },

    ];


  currentTheme: string = "claire";
  themeEmitter: EventEmitter<string> = new EventEmitter<string>();
  private themeEmitterSubscription?: Subscription;

  currentSchool?: { id: string, keyName: string } = { id: 'ALL', keyName: 'SCHOOLS.ALLSCHOOLS' };
  schoolEmitter: EventEmitter<{ id: string, keyName: string }> = new EventEmitter<{ id: string, keyName: string }>();
  private schoolEmitterSubscription?: Subscription;

  currentYear?: { yearId: string, yearStr: string } = { yearId: '2021', yearStr: '2021/2022' };
  yearEmitter: EventEmitter<{ yearId: string, yearStr: string }> = new EventEmitter<{ yearId: string, yearStr: string }>();
  private yearEmitterSubscription?: Subscription;

  progressbarre?: { PathContinue: string, PathRetoure: string ,isValide:boolean};
  barreEmitter: EventEmitter<{ index: number, PathContinue: string, PathRetoure: string, isValide: boolean  }> = new EventEmitter<{ index: number, PathContinue: string, PathRetoure: string, isValide: boolean  }>();
  private barreEmitterSubscription?: Subscription;

  PreTraitement?: [
    resultat: {
      E_Groupe: any,
      E_duree: any,
      E_intrv: any,
      E_nbEtud: any,
      E_nbSea: any,
      HorsDisp: any,
      NonSaisieDisp: any,
      SecNonPlanif: any
    },

    resumer: {
      nb_SeaNonPlanif: any,
      nb_salles: any,
      sections_planifiees: any

    }

  ]

  pretraitement: EventEmitter<{

    resultat: {
      E_Groupe: any,
      E_duree: any,
      E_intrv: any,
      E_nbEtud: any,
      E_nbSea: any,
      HorsDisp: any,
      NonSaisieDisp: any,
      SecNonPlanif: any
    }

    resumer: {
      nb_SeaNonPlanif: any,
      nb_salles: any,
      sections_planifiees: any

    }




  }> = new EventEmitter<{
    resultat: {
      E_Groupe: any,
      E_duree: any,
      E_intrv: any,
      E_nbEtud: any,
      E_nbSea: any,
      HorsDisp: any,
      NonSaisieDisp: any,
      SecNonPlanif: any
    }

    resumer: {
      nb_SeaNonPlanif: any,
      nb_salles: any,
      sections_planifiees: any

    }

  }>();
  private pretraitementSubscription?: Subscription;

  constructor() {
    this.themeEmitterSubscription = this.themeEmitter.subscribe((newTheme: string) => {
      if (newTheme && newTheme.length)
        this.currentTheme = newTheme;
      else
        this.currentTheme = "claire"; // default
    });
    this.schoolEmitterSubscription = this.schoolEmitter.subscribe(school => {
      this.currentSchool = school;
    });
    this.yearEmitterSubscription = this.yearEmitter.subscribe(year => {
      this.currentYear = year;
    });
  }

  ngOnDestroy() {
    this.themeEmitterSubscription?.unsubscribe();
    this.schoolEmitterSubscription?.unsubscribe();
    this.yearEmitterSubscription?.unsubscribe();
    this.barreEmitterSubscription?.unsubscribe();
    this.pretraitementSubscription?.unsubscribe();
  }



}
