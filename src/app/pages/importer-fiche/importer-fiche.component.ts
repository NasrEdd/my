import { Component, OnInit } from '@angular/core';
import { LoaderService } from 'src/app/services/loader-service/loader-service.service';
import { formatDate } from '@angular/common';
import { HttpClient, HttpErrorResponse } from '@angular/common/http'
import { Observable, throwError } from 'rxjs';

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
  
  formData = new FormData();

  file: string = "";
  name: string = "";
  url: string = "https://smartplanning-backend.herokuapp.com/Generation";
  username: string = "nasr";

  constructor(private http: HttpClient, private loader: LoaderService, ) { }
  ngOnInit(): void {
    $(document).ready(() => {
      this.loader.loaderDialogEmitter.emit({ isOpen: false });
    })
  }

  ngOnDestroy(): void {
    this.loader.loaderDialogEmitter.emit({ isOpen: true });

  }

  getFile(event: any) {
      this.file=(event.target.files);
      this.name = event.target.files.name;
    console.log(this.file);

    }

  

  importer(elemnt : string) {
      this.formData.append("name", this.name);
      this.formData.append("file", this.file);
    
    console.log(this.formData);

    switch(elemnt){
      case "SP" :
        this.http.post(this.url + "/UploadSections/" + this.username, this.formData)
          .subscribe(res => {
            console.log(res);
            alert('Uploaded Successfully.');
          });
        break;
      case "TD" :
        this.http.post(this.url + "/UploadDisponibilites/" + this.username, this.formData)
          .subscribe(res => {
            console.log(res);
            alert('Uploaded Successfully.');
          });
        break;
      case "PD" :
        this.http.post(this.url + "/UploadPreferences/" + this.username, this.formData)
          .subscribe(res => {
            console.log(res);
            alert('Uploaded Successfully.');
          });
        break;
      case "TS" :
        this.http.post(this.url + " /UploadSalles/" + this.username, this.formData)
          .subscribe(res => {
            console.log(res);
            alert('Uploaded Successfully.');
          });
        break;
    
    };
   
  }

  traiter()
  {
    Data = this.http.post(this.url2 + this.username,null)
      .subscribe(res => {
        console.log(res);
        alert('Uploaded Successfully.');
      });

  }


}
