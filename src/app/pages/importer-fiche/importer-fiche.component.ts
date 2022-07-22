import { Component, OnInit } from '@angular/core';
import { LoaderService } from 'src/app/services/loader-service/loader-service.service';
import { formatDate } from '@angular/common';
import { HttpClient, HttpParams, HttpRequest, HttpEvent, HttpHeaders } from '@angular/common/http'
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
  url2: string = "https://smartplanning-backend.herokuapp.com";
  titre: string = "Importation des fichiers EXCEL"
  formData = new FormData();
  Numberfile : number = 0;;

  url: string = "https://smartplanning-backend.herokuapp.com/Generation";
  username: string = "nasr";

  constructor(private http: HttpClient, private loader: LoaderService, private router: Router, public appService: AppService) {

  }
  file: File | undefined;
  name: string = "";
  ngOnInit(): void {
    $(document).ready(() => {
      this.loader.loaderDialogEmitter.emit({ isOpen: false });
      this.update2(false,2)
      $(".Progroot").show();
      $("#continue").click((event:any)=>{
        if (this.Numberfile != 0) {
          alert("ge")


        }
        else if (this.Numberfile < 2) {
          alert("Le nombre des fichiers est insuffisante!!"+this.Numberfile);
          this.Numberfile = 0;
          window.location.reload();

        }
      });
      if(this.Numberfile != 0)
      window.location.reload();
    });
    $(".row img").hide();
  }

  ngOnDestroy(): void {
    this.loader.loaderDialogEmitter.emit({ isOpen: true });
    $("#continue").off("click")
    this.update2(false,2);

  }

  //colorer les div
  checked(id: string) {
    if(this.Numberfile >=2){
      this.update2(true,2);
    }
    this.Numberfile++;

    console.log("helllo      ", this.Numberfile);

    $(document).ready(function () {
      let element = $("#" + id).parent().parent().parent();
      console.log(element)
      let img = element.children()[1];
      $("#" + img.id).show(500);
      console.log(img.id)
      img.id.show();
      element.css({
        color: "white",
        transform: "scale(1.1)",
        border: "2px solid white",
        filter: "brightness(120%)"
      });
    });


  }


  getFile(event: any, nom: string) {

    switch (nom) {
      case "SP":
        this.formData.append("file_sections", event.target.files[0]);
        console.log(event.target.files[0])
        const formDataSP = new FormData();
        formDataSP.append("file_sections", event.target.files[0]);
        this.http.post(this.url + "/UploadSections/" + "nasr", formDataSP)
          .subscribe(
            (response: any) => {
              console.log("Response: ", response);

            },
            (error) => {
              console.error("Erreur: ", error)
            })
        break;
      case "TD":
        this.formData.append("file_disponibililtes", event.target.files[0]);
        console.log(event.target.files[0])

        const formDataTD = new FormData();
        formDataTD.append("file_disponibililtes", event.target.files[0]);
        this.http.post(this.url2 + "/UploadDisponibilites/" + "nasr", formDataTD)
          .subscribe(
            (response: any) => {
              console.log("Response: ", response);

            },
            (error) => {
              console.error("Erreur: ", error)
            })
        break;
      case "PD":
        this.formData.append("file_preferences", event.target.files[0]);
        console.log(event.target.files[0])


        const formDataPD = new FormData();
        formDataPD.append("file_preferences", event.target.files[0]);
        this.http.post(this.url2 + "/UploadPreferences/" + "nasr", formDataPD)
          .subscribe(
            (response: any) => {
              console.log("Response: ", response);

            },
            (error) => {
              console.error("Erreur: ", error)
            })

        break;
      case "TS":
        this.formData.append("file_salles", event.target.files[0]);
        const formDataTS = new FormData();
        console.log(event.target.files[0])

        formDataTS.append("file_salles", event.target.files[0]);
        this.http.post(this.url2 + "/UploadSalles/" + "nasr", formDataTS)
          .subscribe(
            (response: any) => {
              console.log("Response: ", response);

            },
            (error) => {
              console.error("Erreur: ", error)
            })
        break;

    };

    this.checked(nom);
  }









  update2(validite: boolean, index:number) {
    this.appService.barreEmitter.emit({ index: index, PathContinue: " ", PathRetoure: " ", isValide: validite })
  }
}
