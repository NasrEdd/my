import { Component, OnInit, OnDestroy } from '@angular/core';
import { LoaderService } from 'src/app/services/loader-service/loader-service.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { AppService } from 'src/app/services/app-service/app-service.service';

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


  constructor(private loader: LoaderService, private http: HttpClient, private router: Router, public appService: AppService) {
    this.titles = ["Génération d'emploi du temps", "Evaluation"];
    this.descriptions = ["Pour générer un emploi du temps", "Pour évaluer l'emploi du temps"];
  }

  ngOnInit(): void {
    $(document).ready(() => {
      this.loader.loaderDialogEmitter.emit({ isOpen: false });

      let EleHide: HTMLElement | null = document.getElementById("row2");
      let EleHide2: HTMLElement | null = document.getElementById("progressbar");
      if (EleHide !== null && EleHide2 !== null) {
        EleHide.style.display = "none";
        EleHide2.style.display = "none";
      }

      $(".Progroot").hide();
    })
    this.update();
    


  }

  ngOnDestroy(): void {
    this.loader.loaderDialogEmitter.emit({ isOpen: true });

  }


 
  login(even: string) {

    const data: any = {
      user: even
    }

    if (even !== "") {
      console.log(even)
      this.data = this.http.post(this.url + "Username", JSON.stringify(data))
        .subscribe(res => {
          console.log(res);
          alert('Post Successfully.');
        });
      console.log(JSON.stringify(data));
      console.log(this.data);
      console.log(this.url + "Username", "Content-Type: application/json;" + "\n" + {
        "user": "khdhfd"
      })


      $(".login").hide(2000);
      $("#row2").show(4000);
      $(".ProgButton").hide();
      $("#progressbar").show(4000);

    }
    else {
      alert("Enter un utilisateur");
    }
  }

  update() {
    var data: any;
    var path: string = "smart-planing/importer/PreTraitement/Resumer/Lancement/Resultat";
    var Paths: string[] = path.split("/");
    let Nele: any = this.router.url.split("/");
    var pour: number;

    if (Nele.length > 0) {
      pour = 1 * 14.28 + 5;
      var elem = this.router.url + "/" + "importer";
      Nele.pop();

      data = {
        pathContinue: elem,
        pathRetoure: Nele.join("/"),
        pourcentage: pour
      };
    }
    else {
      pour = (Paths.indexOf(Nele[Nele.length - 1]) + 1) * 14.28;

      var elem = this.router.url + "/" + "importer";
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


