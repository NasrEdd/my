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

  NewPage     ?: string[]  ;
  Poucentage  ?: number = 0;
  PathContinue?: string = "";
  PathRetoure ?: string = "";

  constructor(private router: Router, public appService : AppService) { }

  ngOnInit(): void {
    $(document).ready(() => {
      
      // console.log(this.NomPage);

     this.update();
    })
  }

  ngOnDestroy(){
    this.PathContinue = "";
    this.PathRetoure = "";
    this.Poucentage = 14;
  }

  update(){
    this.PathContinue = this.appService.progressbarre?.pathContinue;
    this.PathRetoure  = this.appService.progressbarre?.pathRetoure;
    this.Poucentage   = this.appService.progressbarre?.pourcentage;

    this.NewPage = this.PathContinue?.split("/");
    this.NewPage?.shift();
    this.NewPage?.pop();
    this.NomPage = this.NewPage?.join(" >> ");
    $(".Progpourcentage").css("width", (this.Poucentage?.toString() + "%"));

  }
}
