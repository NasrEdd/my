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
  shouldWait:boolean = false;
  titre: string = "Lancement de l'algorithme";
  data: any = [{
    title: "Nombre de professeurs",
    erreur: "3",
    buttonID: "detail1",
    id: "A"
  } ,
    {
        title: "Nombre de seances planifiables",
      erreur: "1",
      buttonID: "detail1",
      id: "A"
    }, {
        title: "Nombre de salles",
      erreur: "5",
      buttonID: "detail1",
      id: "A"
    }, {
        title: "Nombre de groupes",
      erreur: "5",
      buttonID: "detail1",
      id: "A"
    }, {
      title: "nombre de seances non planifiables",
      erreur: "5",
      buttonID: "detail1",
      id: "A"
    }]
      
  constructor(private loader: LoaderService, private http: HttpClient,private router: Router, public appService: AppService) {

   }
  ngOnInit(): void {
    $(document).ready(() => {
      this.loader.loaderDialogEmitter.emit({ isOpen: false });
      this.update2(4);
      $("#continue").html("Lancer");
      
  })
  }

  ngOnDestroy(): void {
    this.loader.loaderDialogEmitter.emit({ isOpen: true });
    $("#continue").html("Continuer");

  }

  update2(index: number) {
    this.appService.barreEmitter.emit({ index: index, PathContinue: " ", PathRetoure: " " ,isValide:true})
  }
}
