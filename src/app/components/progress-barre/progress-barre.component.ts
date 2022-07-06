import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, Observable } from "rxjs";
import { AppService } from 'src/app/services/app-service/app-service.service';

declare var $: any;

@Component({
  selector: 'app-progress-barre',
  templateUrl: './progress-barre.component.html',
  styleUrls: ['./progress-barre.component.scss']
})
export class ProgressBarreComponent implements OnInit {
  path: string = "dossier-etudiant/smart-planing/importer/Waiter/PreTraitement/Resumer/Lancement/Resultat/PlanificationCh";
  Paths: string[] = this.path.split("/");
  NomPage?: string ="";

  progressbarre:any =
    [
      { index: 1, id: "login", title: "Login", isCurrent: false, isValide: false, url: "/login", hasNext: true, hasPrevisous: false, },
      { index: 2, id: "smart-planing", title: "smart-planing", isCurrent: false, isValide: false, url: "smart-planing", hasNext: true, hasPrevisous: false, },
      { index: 3, id: "importer", title: "importer", isCurrent: false, isValide: false, url: "smart-planing/importer", hasNext: true, hasPrevisous: false, },
      { index: 4, id: "PreTraitement", title: "PreTraitement", isCurrent: false, isValide: false, url: "smart-planing/importer/PreTraitement", hasNext: true, hasPrevisous: false, },
      { index: 5, id: "Resumer", title: "Resumer", isCurrent: false, isValide: false, url: "smart-planing/importer/PreTraitement/Resumer", hasNext: true, hasPrevisous: false, },
      { index: 6, id: "Lancement", title: "Lancement", isCurrent: false, isValide: false, url: "smart-planing/importer/PreTraitement/Resumer/Lancement", hasNext: true, hasPrevisous: false, },
      { index: 7, id: "Resultat", title: "Resultat", isCurrent: false, isValide: false, url: "smart-planing/importer/PreTraitement/Resumer/Lancement/Resultat", hasNext: true, hasPrevisous: false, },
      { index: 8, id: "PlanificationCh", title: "PlanificationCh", isCurrent: false, isValide: false, url: "smart-planing/importer/PreTraitement/Resumer/Lancement/Resultat/PlanificationCh", hasNext: false, hasPrevisous: false, },

    ];

  NewPage     ?: string[]  ;
  Poucentage  ?: number = 0;
  PathContinue?: string = "";
  PathRetoure ?: string = "";

  constructor(private router: Router, public appService : AppService) { }

  ngOnInit(): void {
    $(document).ready(() => {})
    this.update();
  }

  ngOnDestroy(){
    this.PathContinue = "";
    this.PathRetoure = "";
    this.Poucentage = 14;
  }

  update(){
    var index: number | undefined = this.appService.progressbarre?.index;

    if (this.appService.progressbarre?.isValide && index && index <= this.progressbarre.length ){
      console.log(index-1," ",index," ",index+2);
      this.PathContinue = this.progressbarre[index+1].url;
      this.PathRetoure = this.progressbarre[index-1].url;

    }
  }

}
