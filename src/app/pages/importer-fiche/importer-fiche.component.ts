import { Component, OnInit } from '@angular/core';
import { LoaderService } from 'src/app/services/loader-service/loader-service.service';
import { formatDate } from '@angular/common';
import { HttpClient, HttpErrorResponse } from '@angular/common/http'
import { Router } from '@angular/router';
import { Subject, Observable } from "rxjs";
import { AppService } from 'src/app/services/app-service/app-service.service';
declare var $: any;
var Data: any = [{
  "E_Groupe": 0,
  "E_duree": 0,
  "E_intrv": 0,
  "E_nbEtud": 0,
  "E_nbSea": 0,
  "HorsDisp": 0,
  "NonSaisieDisp": 0,
  "SecNonPlanif": 0
}];

@Component({
  selector: 'app-importer-fiche',
  templateUrl: './importer-fiche.component.html',
  styleUrls: ['./importer-fiche.component.scss']
})
export class ImporterFicheComponent implements OnInit {
  url2: string = "https://smartplanning-backend.herokuapp.com/Generation/ResultatsPretraitement/";
  titre: string = "Importation des fichiers EXCEL"
  formData = new FormData();

  file: string = "";
  name: string = "";
  url: string = "https://smartplanning-backend.herokuapp.com/Generation";
  username: string = "nasr";

  constructor(private http: HttpClient, private loader: LoaderService, private router: Router, public appService: AppService) { }
  ngOnInit(): void {
    $(document).ready(() => {
      this.loader.loaderDialogEmitter.emit({ isOpen: false });
      $(".Progroot").show();
    })
    this.update();
  }

  ngOnDestroy(): void {
    this.loader.loaderDialogEmitter.emit({ isOpen: true });

  }

  //colorer les div
  checked(id: string) {

    $(document).ready(function () {
      let element = $("#" + id).parent().parent().parent();

      element.css({
        color: "white",
        transform: "scale(1.1)",
        border: "2px solid white",
        filter: "brightness(120%)"
      });
    });

  }


  getFile(event: any, nom: string) {
    this.file = (event.target.files);
    this.name = event.target.files.name;
    console.log(nom);

    this.checked(nom);


    this.formData.append("name", this.name);
    this.formData.append("file", this.file);

    console.log(this.formData);

    switch (nom) {
      case "SP":

        this.http.post(this.url + "/UploadSections/" + "asaad", this.formData)
          .subscribe(res => {
            console.log(res);
            alert('Uploaded Successfully.');
          });
        break;
      case "TD":

        this.http.post(this.url + "/UploadDisponibilites/" + "asaad", this.formData)
          .subscribe(res => {
            console.log(res);
            alert('Uploaded Successfully.');
          });
        break;
      case "PD":

        this.http.post(this.url + "/UploadPreferences/" + "asaad", this.formData)
          .subscribe(res => {
            console.log(res);
            alert('Uploaded Successfully.');
          });

        break;
      case "TS":

        this.http.post(this.url + " /UploadSalles/" + "asaad", this.formData)
          .subscribe(res => {
            console.log(res);
            alert('Uploaded Successfully.');
          });
        break;

    };

  }

  traiter() {
    console.log("hr");
    Data = this.http.post(this.url2 + this.username, null)
      .subscribe(res => {
        console.log(res);
        alert('Uploaded Successfully.');
      });
    console.log("hello", Data);


  }

  update() {
    var data: any;
    var path: string = "smart-planing/importer/PreTraitement/Resumer/Lancement/Resultat";
    var Paths: string[] = path.split("/");
    let Nele: any = this.router.url.split("/");
    var pour: number;

    if (Nele.length > 0) {
      pour = (Paths.indexOf(Nele[Nele.length - 1]) + 1) * 14.28;
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
