import { Component, OnInit, OnDestroy, OnChanges } from '@angular/core';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Router, Event, NavigationStart, NavigationEnd, NavigationError } from '@angular/router';
import { thisQuarter } from '@igniteui/material-icons-extended';
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
  NomPage?: string = "";
  pages: any =
    [
      { index: 1, id: "login", title: "Login", isCurrent: false, isValide: false, url: "/login", hasNext: true, hasPrevisous: false, },
      { index: 2, id: "smart-planing", title: "smartPlaning", isCurrent: false, isValide: false, url: "smart-planing", hasNext: true, hasPrevisous: false, },
      { index: 3, id: "importer", title: "importer", isCurrent: false, isValide: false, url: "smart-planing/importer", hasNext: true, hasPrevisous: false, },
      { index: 4, id: "PreTraitement", title: "PreTraitement", isCurrent: false, isValide: false, url: "smart-planing/importer/PreTraitement", hasNext: true, hasPrevisous: false, },
      { index: 5, id: "Resumer", title: "Resumer", isCurrent: false, isValide: false, url: "smart-planing/importer/PreTraitement/Resumer", hasNext: true, hasPrevisous: false, },
      { index: 6, id: "Lancement", title: "Lancement", isCurrent: false, isValide: false, url: "smart-planing/importer/PreTraitement/Resumer/Lancement", hasNext: true, hasPrevisous: false, },
      { index: 7, id: "Resultat", title: "Resultat", isCurrent: false, isValide: false, url: "smart-planing/importer/PreTraitement/Resumer/Lancement/Resultat", hasNext: true, hasPrevisous: false, },
      { index: 8, id: "PlanificationCh", title: "PlanificationCh", isCurrent: false, isValide: false, url: "smart-planing/importer/PreTraitement/Resumer/Lancement/Resultat/PlanificationCh", hasNext: false, hasPrevisous: false, },

    ];
  etaps: any =
    [
      { index: 1, title: "Génération" },
      { index: 4, title: "Pre-traitement " },
      { index: 5, title: "Post-Traitement " },
      { index: 6, title: "Planifications" }
    ]

  NewPage?: string[];
  Poucentage?: number = 0;
  PathContinue?: string = "";
  PathRetoure?: string = "";
  currentRoute?: string;
  Index_prev: number = 0;
  validite !: boolean;
  constructor(private router: Router, public appService: AppService) {

  }

  ngOnInit(): void {
    $(document).ready(() => {
    })
    this.appService.barreEmitter.subscribe(element => {
      if (element.index >= this.Index_prev)
        this.Index_prev = element.index;

      $("#" + element.index.toString()).css(
        {
         
          "filter": "brightness(140%)"
        }
      )


      if (this.Index_prev > element.index) {


        $("#" + this.Index_prev.toString()).css(
          {
            "transition":"scale(1.2)",
            "filter": "brightness(100%)"

          }
        )


        this.Index_prev = element.index;
      }
      console.log("heloo   " + element.isValide)
      this.validite = element.isValide;

      let PathContinue, PathRetoure, index = element.index;
      if (element.index && element.index < this.pages.length - 1) {
        PathContinue = this.pages[element.index + 1].url;
        PathRetoure = this.pages[element.index - 1].url;
        console.log("appservice: ", PathContinue, " ", element.index, " ", PathRetoure);

      }
      if (element.index == this.pages.length - 1) {
        PathContinue = this.pages[element.index].url;
        PathRetoure = this.pages[element.index - 1].url;
        console.log(PathContinue, " ", element.index, " ", PathRetoure);

      };
      if (element.isValide) {
        this.PathContinue = PathContinue;
        this.PathRetoure = PathRetoure;
        console.log("appserF: ", this.PathContinue, this.PathRetoure)
      }
      else {
        this.PathRetoure = PathRetoure;

      }

    });
  }





  ngOnDestroy() {
  }

  ngOnChanges() {

  }
  next() {
    if (this.PathContinue) {
      if (this.PathContinue === "smart-planing/importer/PreTraitement")
        this.router.navigateByUrl("smart-planing/importer/Waiter");
      else
        this.router.navigateByUrl(this.PathContinue)
    }
    else
      this.router.navigateByUrl("smart-planing")


  }
  previous() {
    if (this.PathRetoure == "smart-planing/importer") {
      alert("Vous ne pouvez pas accder a cette page!!");
      window.location.reload();
    }
    if (this.PathRetoure)
      this.router.navigateByUrl(this.PathRetoure);
    else
      this.router.navigateByUrl("smart-planing")

  }


}
