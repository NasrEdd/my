import { Component, OnInit } from '@angular/core';
import { LoaderService } from 'src/app/services/loader-service/loader-service.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Subject, Observable } from "rxjs";
import { AppService } from 'src/app/services/app-service/app-service.service';


import {
  trigger,
  state,
  style,
  animate,
  transition,
  // ...
} from '@angular/animations';
import { thisQuarter } from '@igniteui/material-icons-extended';
declare var $: any;

var ids: number[] = [1, 2, 3];
var Bsubmit: string;
@Component({
  selector: 'app-pre-traitement',
  templateUrl: './pre-traitement.component.html',
  styleUrls: ['./pre-traitement.component.scss'],
})


export class PreTraitementComponent implements OnInit {

  titre: string = "Resultat Pre-Traitement";
  url: string = "URL";
  username: string ="";

  ComingData: any = [{
    E_Groupe: 1000,
    E_duree: 0,
    E_intrv: 0,
    E_nbEtud: 0,
    E_nbSea: 0,
    HorsDisp: 0,
    NonSaisieDisp: 0,
    SecNonPlanif: 0
  }]

  data: any = [{
    description: "Des informations sur l'erreur apprevue du traitement",
    title: "Erreur de groupe",
    erreur: 5,
    buttonID: "ErreurG",
    route: "./Resultat",
    id:"El1",
  },
  {
    description: "Des informations sur l'erreur apprevue du traitement",
    title: "Erreur d'intervenant",
    erreur: 3,
    buttonID: "ErreurI",
    route: "./Resultat",
    id: "El2",

  }, {
    description: "Des informations sur l'erreur apprevue du traitement",
    title: "Erreur de la durée",
    erreur: 4,
    buttonID: "ErreurD",
    route: "./Resultat",
    id: "El3",

  }, {
    description: "Des informations sur l'erreur apprevue du traitement",
    title: "Erreur de Nombre d'etudiants",
    erreur: 1,
    buttonID: "ErreurE",
    route: "./Resultat",
    id: "El4",

  }, {
    description: "Des informations sur l'erreur apprevue du traitement",
    title: "Erreur de nombre de séances",
    erreur: 1,
    buttonID: "ErreurS",
    route: "./Resultat",
    id: "ElI1",

  }, {
    description: "Des informations sur l'erreur apprevue du traitement",
    title: "Hors disponibilités",
    erreur: 5,
    buttonID: "ErreurH",
    route: "./Resultat",
    id: "ElI2",

  }, {
    description: "Des séances qui ont le champs de la durée vide ou non numérique ou incorrecte",
    title: "Non saisie de siponibilités",
    erreur: 2,
    buttonID: "ErreurNS",
    route: "./Resultat",
    id: "ElI3",

  }, {
    description: "Des informations sur l'erreur apprevue du traitement",
    title: "Erreur de la durée",
    erreur: 4,
    buttonID: "ErreurSN",
    route: "./Resultat",
    id: "ElI4",

  }]

  constructor(private loader: LoaderService, private http: HttpClient, private router: Router, public appService: AppService) {

  }
  ngOnInit(): void {
    $(document).ready(() => {
      this.loader.loaderDialogEmitter.emit({ isOpen: false });
    })

    $("img").hide();
    this.update();
  }

  ngOnDestroy(): void {
    this.loader.loaderDialogEmitter.emit({ isOpen: true });
  }


  go(Bsubmit: string) {
    switch (Bsubmit) {
      case "ErreurG":
        this.http.post(this.url + "/Generation/AffichageErreurGroupe/" + this.username, null)
        .subscribe(res => {
        console.log(res);
        alert('Post Successfully.');
      });
        break;
      case "ErreurD":
        this.http.post(this.url + "/Generation/AffichageErreurDuree/" + this.username, null)
        .subscribe(res => {
        console.log(res);
        alert('Post Successfully.');
      });
        break;
      case "ErreurS":
        this.http.post(this.url + " /Generation/AffichageErreurNbSeance/" + this.username, null)
        .subscribe(res => {
        console.log(res);
        alert('Post Successfully.');
      });
        break;
      case "ErreurI":
        this.http.post(this.url + "/Generation/AffichageErreurIntrv/" + this.username, null)
        .subscribe(res => {
        console.log(res);
        alert('Post Successfully.');
      });
        break;
      case "ErreurE":
        this.http.post(this.url + " /Generation/AffichageErreurNbEtud/" + this.username, null)
        .subscribe(res => {
        console.log(res);
        alert('Post Successfully.');
      });
        break;
      case "ErreurH":
        this.http.post(this.url + "/Generation/AffichageHorsDisp/" + this.username, null)
        .subscribe(res => {
        console.log(res);
        alert('Post Successfully.');
      });
        break;
      case "ErreurSN":
        this.http.post(this.url + "/Generation/AffichageSectionNonPlanif/" + this.username, null)
        .subscribe(res => {
        console.log(res);
        alert('Post Successfully.');
      });
        break;
      case "ErreurNS":
        this.http.post(this.url + "/Generation/AffichageNonSaisieDisp/" + this.username, null)
        .subscribe(res => {
        console.log(res);
        alert('Post Successfully.');
      });
        break;


    }


  }


  click(valeur: any) {
    $("#" + valeur.id).show();
  }
  hide(valeur: any) {
    $("#" + valeur.id).hide();

  }

  update(){
    var data: any;
    var path: string = "smart-planing/importer/PreTraitement/Resumer/Lancement/Resultat";
    var Paths: string[] = path.split("/");
    let Nele: any = this.router.url.split("/");
    var pour: number;

    if (Nele.length > 0) {
      pour = (Paths.indexOf(Nele[Nele.length - 1]) + 1) * 14.28+10;
      var elem = this.router.url + "/" + Paths[Paths.indexOf(Nele[Nele.length - 1]) + 1];
      Nele.pop();

      data = {
        pathContinue: elem,
        pathRetoure: Nele.join("/"),
        pourcentage: pour
      };
    }
    else {
      pour = (Paths.indexOf(Nele[Nele.length - 1]) + 1) * 14.28;

      var elem = this.router.url + "/" + Paths[Paths.indexOf(Nele[Nele.length - 1])];
      Nele.pop();
      data = {
        pathContinue: elem,
        pathRetoure: Nele.join("/"),
        pourcentage: pour
      };
    }


    console.log(data);
    this.appService.barreEmitter.emit(data);


  }

  }
