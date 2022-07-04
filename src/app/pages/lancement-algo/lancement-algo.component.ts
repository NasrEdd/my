import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoaderService } from 'src/app/services/loader-service/loader-service.service';
import { Router } from '@angular/router';
import { Subject, Observable } from "rxjs";
import { AppService } from 'src/app/services/app-service/app-service.service';

declare var $: any;

var ids: number[] = [1, 2, 3];

@Component({
  selector: 'app-lancement-algo',
  templateUrl: './lancement-algo.component.html',
  styleUrls: ['./lancement-algo.component.scss']
})
export class LancementAlgoComponent implements OnInit {

  titre: string = "Lancement de l'algorithme";
  data: any = [{
    description: "Des séances qui ont le champs de la durée vide ou non numérique ou incorrecte",
    title: "Nombre de seances planifiees",
    erreur: "3",
    buttonID: "detail1",
    id: "A"
  } ,
    {
      description: "Des séances qui ont le champs de la durée vide ou non numérique ou incorrecte",
      title: "Nombre de seances non planifiees",
      erreur: "1",
      buttonID: "detail1",
      id: "A"
    }, {
      description: "Des séances qui ont le champs de la durée vide ou non numérique ou incorrecte",
      title: "Nombre de salles",
      erreur: "5",
      buttonID: "detail1",
      id: "A"
    }, {
      description: "Des séances qui ont le champs de la durée vide ou non numérique ou incorrecte",
      title: "Temps estime",
      erreur: "25min",
      buttonID: "detail1",
      id: "A"
    }]

  constructor(private loader: LoaderService, private http: HttpClient,private router: Router, public appService: AppService) { }
  ngOnInit(): void {
    $(document).ready(() => {
      this.loader.loaderDialogEmitter.emit({ isOpen: false });
    })
    this.update();
  }

  ngOnDestroy(): void {
    this.loader.loaderDialogEmitter.emit({ isOpen: true });

  }

  update() {
    var data: any;
    var path: string = "smart-planing/importer/PreTraitement/Resumer/Lancement/Resultat";
    var Paths: string[] = path.split("/");
    let Nele: any = this.router.url.split("/");
    var pour: number;

    if (Nele.length > 0) {
      pour = (Paths.indexOf(Nele[Nele.length - 1]) + 1) * 14. + 10;
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
