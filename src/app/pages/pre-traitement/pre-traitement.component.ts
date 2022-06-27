import { Component, OnInit, Input } from '@angular/core';
import { LoaderService } from 'src/app/services/loader-service/loader-service.service';
import { HttpClient } from '@angular/common/http';
import {
  trigger,
  state,
  style,
  animate,
  transition,
  // ...
} from '@angular/animations';
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
    description: "Des séances qui ont le champs de la durée vide ou non numérique ou incorrecte",
    title: "Erreur de groupe",
    erreur: this.ComingData.E_groupe,
    buttonID: "ErreurG",
    route: "./Resultat",
    id:"A",
  },
  {
    description: "Des séances quiazertyuiopmlkjhgfdsqwxcvbn,;: ont le champs de la durée vide ou non numérique ou incorrecte",
    title: "Erreur d'intervenant",
    erreur: this.ComingData["E_intrv"],
    buttonID: "ErreurI",
    route: "./Resultat",
    id: "B",

  }, {
    description: "Des séances qui ont le champs de la durée vide ou non numérique ou incorrecte",
    title: "Erreur de la durée",
    erreur: this.ComingData["E_duree"],
    buttonID: "ErreurD",
    route: "./Resultat",
    id: "C",

  }, {
    description: "Des séances qui ont le champs de la durée vide ou non numérique ou incorrecte",
    title: "Erreur de Nombre d'etudiants",
    erreur: this.ComingData["E_nbEtud"],
    buttonID: "ErreurE",
    route: "./Resultat",
    id: "D",

  }, {
    description: "Des séances qui ont le champs de la durée vide ou non numérique ou incorrecte",
    title: "Erreur de nombre de séances",
    erreur: this.ComingData["E_nbSea"],
    buttonID: "ErreurS",
    route: "./Resultat",
    id: "E",

  }, {
    description: "Des séances qui ont le champs de la durée vide ou non numérique ou incorrecte",
    title: "Hors disponibilités",
    erreur: this.ComingData["HorsDisp"],
    buttonID: "ErreurH",
    route: "./Resultat",
    id: "F",

  }, {
    description: "Des séances qui ont le champs de la durée vide ou non numérique ou incorrecte",
    title: "Non saisie de siponibilités",
    erreur: this.ComingData["NonSaisieDisp"],
    buttonID: "ErreurNS",
    route: "./Resultat",
    id: "G",

  }, {
    description: "Des séances qui ont le champs lz,ffezmmzkezmfkezkfezmkflezkfmlkezde la durée vide ou non numérique ou incorrecte",
    title: "Erreur de la durée",
    erreur: this.ComingData["SecNonPlanif"],
    buttonID: "ErreurSN",
    route: "./Resultat",
    id: "H",

  }]

  constructor(private loader: LoaderService, private http: HttpClient) {

  }
  ngOnInit(): void {
    $(document).ready(() => {
      this.loader.loaderDialogEmitter.emit({ isOpen: false });
    })
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

}