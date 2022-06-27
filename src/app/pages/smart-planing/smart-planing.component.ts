import { Component, OnInit, OnDestroy } from '@angular/core';
import { LoaderService } from 'src/app/services/loader-service/loader-service.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

declare var $: any;

@Component({
  selector: 'app-smart-planing',
  templateUrl: './smart-planing.component.html',
  styleUrls: ['./smart-planing.component.scss']
})


export class SmartPlaningComponent implements OnInit, OnDestroy {
  titles: string[];
  descriptions: string[];
  username: string = "";
  url: string = "https://smartplanning-backend.herokuapp.com/";
  posts: any;
  data: any;

  constructor(private loader: LoaderService, private http: HttpClient) {
    this.titles = ["Génération d'emploi du temps", "Evaluation"];
    this.descriptions = ["Pour generer un emploi du temps", "Pour evaluer l'emploi du temps"];
  }

  ngOnInit(): void {
    $(document).ready(() => {
      this.loader.loaderDialogEmitter.emit({ isOpen: false });
    })
  }

  ngOnDestroy(): void {
    this.loader.loaderDialogEmitter.emit({ isOpen: true });

  }


  go() {
    alert();
  }
  login(even: string) {
    
    const data: any = {
      user: even
    }

    this.data = this.http.post(this.url + "Username", JSON.stringify(data));
    console.log(this.data);
  }
}


