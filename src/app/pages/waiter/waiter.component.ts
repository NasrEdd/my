import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription, interval } from 'rxjs';
import { LoaderService } from 'src/app/services/loader-service/loader-service.service';
import { Router } from '@angular/router';
import { AppService } from 'src/app/services/app-service/app-service.service';
declare var $: any;
@Component({
  selector: 'app-waiter',
  templateUrl: './waiter.component.html',
  styleUrls: ['./waiter.component.scss']
})
export class WaiterComponent implements OnInit {
  counter: number = 7;
  constructor(private loader: LoaderService, private router: Router, public appService: AppService) {

    
    
  }
  ngOnInit() {
    
    $(document).ready(() => {
      this.loader.loaderDialogEmitter.emit({ isOpen: false });
      this.appService.barreEmitter.subscribe((route) => { console.log("donnes " + route) }
        
      )

      let intervalId = setInterval(() => {
        this.counter--;
        console.log(this.counter)
        if (this.counter === 0) {
          clearInterval(intervalId);
          $('.H').hide(2000);
          $('.info').css({
            "filter": "brightness(120%)",
            'color': "white"
          });

          $('.fin').show(2000);
          setTimeout(() => {
            
          }, 3000);
        }
      }, 1000);

    })
    $(".fin").hide();
    $(".Progroot").hide();


  }
  ngOnDestroy(): void {
    this.loader.loaderDialogEmitter.emit({ isOpen: true });
    $(".Progroot").show();


  }


}


