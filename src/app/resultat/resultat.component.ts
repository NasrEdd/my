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

  data !: any;
  constructor(private loader: LoaderService, private http: HttpClient, private router: Router, public appService: AppService) { }
  ngOnInit(): void {
    $(document).ready(() => {
      this.loader.loaderDialogEmitter.emit({ isOpen: false });
      $(function () {
        $("#dialog").dialog({
          autoOpen: false,
          width: 1050,
          height: 709,
          show: {
            effect: "blind",
            duration: 1000,

          },
          hide: {
            effect: "explode",
            duration: 1000
          }
        });

        $("#opener").on("click", function () {
          $("#dialog").dialog("open");
        });
      }); 
      })

    var divElement = document.getElementById('viz1658486490626');
    if (divElement != null) {
      var vizElement = divElement.getElementsByTagName('object')[0];
      if (divElement.offsetWidth > 800) {
        vizElement.style.width = '100%';
        vizElement.style.height = '100%';
      } else if (divElement.offsetWidth > 500) {
        vizElement.style.width = '100%';
        vizElement.style.height = '100%';
      } else {
        vizElement.style.width = '100%';
        vizElement.style.height = '100%';
      }
      var scriptElement = document.createElement('script');
      scriptElement.src = 'https://public.tableau.com/javascripts/api/viz_v1.js';
      vizElement.parentNode?.insertBefore(scriptElement, vizElement);
    }

    this.update2(6);
    this.data = this.http.post("https://smartplanning-backend.herokuapp.com/Generation/ResumePreTPlanificationGenerees/" + "nasr", null)
      .subscribe(
        (response: any) => {
          console.log("Response: ", response);

        },
        (error) => {
          console.error("Erreur: ", error)
        })
  }

  ngOnDestroy(): void {
    this.loader.loaderDialogEmitter.emit({ isOpen: true });
    this.update2(1);

  }

 

  update2(index :number) {
    this.appService.barreEmitter.emit({ index: index, PathContinue: " ", PathRetoure: " ",isValide:true })
  }

  go(chemin: string) {
    if(chemin === "TB")
      this.router.navigateByUrl("https://public.tableau.com/app/profile/amadou.mboup/viz/Dashboard_EDT_V3/Tableaudeborddesplanificationsnombre?publish=yes")
    else if(chemin ==="CL")
      this.router.navigateByUrl("http://srvprod/UniversiaPulse/Account/Login?ReturnUrl=%2FUniversiaPulse%2FHome%2FCalendar")
  }
}


