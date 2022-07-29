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

  TempsEstimer:number=4;
  MilleuPlan:number=5;
  titre = "Meilleurs planifications"
  Erreur: any = [{
    Err: "1",
    id: this.TempsEstimer - 1,
  },
  {
    Err: "2",
    id: this.TempsEstimer -2,
  },
  {
    Err: "3",
    id: this.TempsEstimer -3,
  },
    {
      Err: "4",
      id: this.TempsEstimer -4,
    }]

  data !: any;
  constructor(private loader: LoaderService, private http: HttpClient, private router: Router, public appService: AppService) { }
  ngOnInit(): void {
    $(document).ready(() => {
      this.loader.loaderDialogEmitter.emit({ isOpen: false });
      $(function () {
        $("#dialog").dialog({
          autoOpen: false,
          width: 1500,
          height: 1000,
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
      $(".Progroot #continue").hide();

      this.test();
      })

    var divElement = document.getElementById('viz1658486490626');
    if (divElement != null) {
      var vizElement = divElement.getElementsByTagName('object')[0];
    
        vizElement.style.width = '100%';
        vizElement.style.height = '100%';
      
      var scriptElement = document.createElement('script');
      scriptElement.src = 'https://public.tableau.com/javascripts/api/viz_v1.js';
      vizElement.parentNode?.insertBefore(scriptElement, vizElement);
    }

    this.update2(5);
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
    $("#dialog").hide();
    $(".Progroot #continue").show();


  }

 

  update2(index :number) {
    this.appService.barreEmitter.emit({ index: index, PathContinue: " ", PathRetoure: " ",isValide:true })
  }

  hide(){
    $('.row1').hide(1000);

    $("#arreter").hide();
    $("#opener").show(1000);
    $('.container').css("margin-bottom","9%");
  }

  test(){
    let i:number = 10;

    
      setInterval(() => {
        this.TempsEstimer = i;
        this.Erreur[0].Err = Math.floor(Math.random() * 10);
        this.Erreur[1].Err = Math.floor(Math.random() * 10);
        this.Erreur[2].Err = Math.floor(Math.random() * 10);
        this.Erreur[3].Err = Math.floor(Math.random() * 10);
      

        
       
      }, 100)
    

    clearInterval(20000)

  }

do(element : any){

  alert("element: "+element.id)
}  
}


