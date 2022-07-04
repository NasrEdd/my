import { Component, OnInit,OnDestroy } from '@angular/core';
import { Subscription, interval } from 'rxjs';
import { LoaderService } from 'src/app/services/loader-service/loader-service.service';
import { Router } from '@angular/router';
import { AppService } from 'src/app/services/app-service/app-service.service';
declare var $:any;
@Component({
  selector: 'app-waiter',
  templateUrl: './waiter.component.html',
  styleUrls: ['./waiter.component.scss']
})
export class WaiterComponent implements OnInit {
  counter: number = 1;
  constructor(private loader: LoaderService, private router: Router, public appService: AppService) {

    let intervalId = setInterval(() => {
      this.counter--;
      console.log(this.counter)
      if (this.counter === 0){
         clearInterval(intervalId);
        $('.H').hide(2000);
        $('.info').css({
          "filter":"brightness(120%)",
          'color':"white"
        });

        $('.fin').show(2000);      }
    }, 1000);
  }
  ngOnInit() {
    $(document).ready(() => {
      this.loader.loaderDialogEmitter.emit({ isOpen: false });

    })
    $(".fin").hide();


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
      pour = (Paths.indexOf(Nele[Nele.length - 1]) + 1) * 14.28 + 5;
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


