import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoaderService } from 'src/app/services/loader-service/loader-service.service';
import { Router } from '@angular/router';
import { Subject, Observable } from "rxjs";
import { AppService } from 'src/app/services/app-service/app-service.service';
declare var $: any;
@Component({
  selector: 'app-resultat',
  templateUrl: './resultat.component.html',
  styleUrls: ['./resultat.component.scss']
})
export class ResultatComponent implements OnInit {
  titre = "Meilleurs planifications"
  Erreur: any = [{
    Err: "2",
    id: "1",
  },
  {
    Err: "2",
    id: "1",
  },
  {
    Err: "2",
    id: "1",
  }]
  constructor(private loader: LoaderService, private http: HttpClient, private router: Router, public appService: AppService) { }
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

    if (Nele.length > Paths.indexOf(Nele[Nele.length - 1])) {
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
      pour = (Paths.indexOf(Nele[Nele.length - 1]) ) * 14.28;

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
