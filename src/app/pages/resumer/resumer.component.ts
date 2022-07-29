import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoaderService } from 'src/app/services/loader-service/loader-service.service';
import { Router } from '@angular/router';
import { Subject, Observable } from "rxjs";
import { AppService } from 'src/app/services/app-service/app-service.service';
declare var $: any;

var ids: number[] = [1, 2, 3];
@Component({
  selector: 'app-resumer',
  templateUrl: './resumer.component.html',
  styleUrls: ['./resumer.component.scss']
})
export class ResumerComponent implements OnInit {

  titre: string = "Resumer du Pre-traitement";
  data: any = [{
    description: "Des séances qui ont le champs de la durée vide ou non numérique ou incorrecte",
    title: "Seances non planifiables",
    erreur: 1,
    buttonID: "detail1",
    route: "./Details",
    id: "A"
  }]

  constructor(private loader: LoaderService, private http: HttpClient, private router: Router, public appService: AppService) {

  }
  ngOnInit(): void {
    $(document).ready(() => {
      this.update2(4, true);

      this.loader.loaderDialogEmitter.emit({ isOpen: false });
      $(".img").hide();

      $(".modification button").click(() => {
        this.update2(1, true)
      })

      var oldWidth = $('#RrowCol').width();
      $(".btn").click(function () {
        $(".row").animate({
          width: 0
        });
      });
      $(".slide-right").click(function () {
        $("#RrowCol").animate({
          width: oldWidth
        });

      })
    })
  }
  

  ngOnDestroy(): void {
      this.loader.loaderDialogEmitter.emit({ isOpen: true });

    }

  click(valeur: any) {
      $("#" + valeur.id).show();
  }
  hide(valeur: any) {
    $("#" + valeur.id).hide();

  }

  update2(index: number, validite: boolean) {
    this.appService.barreEmitter.emit({ index: index, PathContinue: " ", PathRetoure: " ", isValide: validite })
  }


}
