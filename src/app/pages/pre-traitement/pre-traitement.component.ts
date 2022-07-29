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
  username: string = "";

  ComingData: any = {
    E_Groupe: 0,
    E_duree: 0,
    E_intrv: 0,
    E_nbEtud: 0,
    E_nbSea: 0,
    HorsDisp: 0,
    NonSaisieDisp: 1,
    SecNonPlanif: 0

  }

  data: any = [{
    description: "Des informations sur l'erreur apprevue du traitement",
    title: "Erreur de groupe",
    erreur: 5,
    buttonID: "ErreurG",
    route: "./Resultat",
    type:true,
    id: "El1",
  },
  {
    description: "Des informations sur l'erreur apprevue du traitement",
    title: "Erreur d'intervenant",
    erreur: 3,
    buttonID: "ErreurI",
    route: "./Resultat",
    type:true,
    id: "El2",

  }, {
    description: "Des informations sur l'erreur apprevue du traitement",
    title: "Erreur de la durée",
    erreur: 4,
    buttonID: "ErreurD",
    route: "./Resultat",
    type:true,
    id: "El3",

  }, {
    description: "Des informations sur l'erreur apprevue du traitement",
    title: "Erreur de Nombre d'etudiants",
    erreur: 1,
    buttonID: "ErreurE",
    route: "./Resultat",
    type:true,
    id: "El4",

  }, {
    description: "Des informations sur l'erreur apprevue du traitement",
    title: "Erreur de nombre de séances",
    erreur: 1,
    buttonID: "ErreurS",
    route: "./Resultat",
    type:false,
    id: "ElI1",

  }]

  data2: any = [{
    description: "Des informations sur l'erreur apprevue du traitement",
    title: "Hors disponibilités",
    erreur: 5,
    buttonID: "ErreurH",
    route: "./Resultat",
    type: false,
    id: "ElI2",

  }, {
      description: "Des séances qui ont le champs de la durée vide ou non numérique ou incorrecte",
      title: "Non saisie disiponibilités",
      erreur: 2,
      buttonID: "ErreurNS",
      route: "./Resultat",
      type: false,
      id: "ElI3",

    }]


  seancNP: any = {
    description: "Des informations sur l'erreur apprevue du traitement",
    title: "Seances non planifiables",
    erreur: 4,
    buttonID: "ErreurSN",
    route: "./Resultat",
    type: false,
    id: "ElI4",

  }
  constructor(private loader: LoaderService, private http: HttpClient, private router: Router, public appService: AppService) {

  }
  ngOnInit(): void {
    $(document).ready(() => {
      this.loader.loaderDialogEmitter.emit({ isOpen: false });
      this.update2(3);
      $(document).ready(function () {
        $('[data-toggle="popover"]').popover({
          trigger:'hover',
        });
      });

      $("#co").show();
      $("img").hide();
    })

    this.ComingData = this.http.post("https://smartplanning-backend.herokuapp.com/Generation/ResultatsPretraitement/" + "nasr", null)
      .subscribe(
        (response: any) => {
          console.log("Response: ", response);

        },
        (error) => {
          console.error("Erreur: ", error)
        })

  }

  ngOnDestroy(): void {
    this.loader.loaderDialogEmitter.emit({ isOpen: true });
    $("#co").hide();

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

  
  update2(index: number) {
    this.appService.barreEmitter.emit({ index: index, PathContinue: " ", PathRetoure: " " ,isValide:true})
  }

}
