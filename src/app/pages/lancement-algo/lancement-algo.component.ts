import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoaderService } from 'src/app/services/loader-service/loader-service.service';

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
    erreur: "1",
    buttonID: "detail1",
    route: "./Resultat",
    id: "A"
  } ,
    {
      description: "Des séances qui ont le champs de la durée vide ou non numérique ou incorrecte",
      title: "Nombre de seances non planifiees",
      erreur: "1",
      buttonID: "detail1",
      route: "./Resultat",
      id: "A"
    }, {
      description: "Des séances qui ont le champs de la durée vide ou non numérique ou incorrecte",
      title: "Nombre de salles",
      erreur: "1",
      buttonID: "detail1",
      route: "./Resultat",
      id: "A"
    }, {
      description: "Des séances qui ont le champs de la durée vide ou non numérique ou incorrecte",
      title: "Temps estime",
      erreur: "1",
      buttonID: "detail1",
      route: "./Resultat",
      id: "A"
    }]

  constructor(private loader: LoaderService, private http: HttpClient) { }
  ngOnInit(): void {
    $(document).ready(() => {
      this.loader.loaderDialogEmitter.emit({ isOpen: false });
    })
  }

  ngOnDestroy(): void {
    this.loader.loaderDialogEmitter.emit({ isOpen: true });

  }
}
