import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpRequest, HttpEvent, HttpHeaders } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class SmartpalnningService {

  constructor(public http : HttpClient) { }

  url: string = "https://smartplanning-backend.herokuapp.com";
  username : string = "nasr";

  
  
  
  
  getFile(event: any, nom: string) {
    switch (nom) {
      case "SP":
        const formDataSP = new FormData();
        formDataSP.append("file_sections", event.target.files[0]);
        this.http.post(this.url + "/UploadSections/" + this.username, formDataSP)
          .subscribe(
            (response: any) => {
              console.log("Response: ", response);
            },
            (error) => {
              console.error("Erreur: ", error)
            })
        break;

      case "TD":
        const formDataTD = new FormData();
        formDataTD.append("file_disponibililtes", event.target.files[0]);
        this.http.post(this.url+ "/UploadDisponibilites/" + this.username, formDataTD)
          .subscribe(
            (response: any) => {
              console.log("Response: ", response);

            },
            (error) => {
              console.error("Erreur: ", error)
            })
        break;

      case "PD":
        const formDataPD = new FormData();
        formDataPD.append("file_preferences", event.target.files[0]);
        this.http.post(this.url + "/UploadPreferences/" + this.username, formDataPD)
          .subscribe(
            (response: any) => {
              console.log("Response: ", response);
            },
            (error) => {
              console.error("Erreur: ", error)
            })
        break;

      case "TS":
        const formDataTS = new FormData();       
        formDataTS.append("file_salles", event.target.files[0]);
        this.http.post(this.url + "/UploadSalles/" + this.username, formDataTS)
          .subscribe(
            (response: any) => {
              console.log("Response: ", response);
            },
            (error) => {
              console.error("Erreur: ", error)
            })
        break;

    };

    // this.checked(nom);
  }

}



