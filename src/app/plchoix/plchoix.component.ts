import { Component, OnInit } from '@angular/core';
import { LoaderService } from 'src/app/services/loader-service/loader-service.service';
import { Router } from '@angular/router';
import { AppService } from 'src/app/services/app-service/app-service.service';
declare var $:any;

@Component({
  selector: 'app-plchoix',
  templateUrl: './plchoix.component.html',
  styleUrls: ['./plchoix.component.scss']
})
export class PlchoixComponent implements OnInit {
  Titre : string = "La planification choisir";
  choix : string = "Modifier";
  constructor(private loader: LoaderService,private router: Router, public appService: AppService) { }

  ngOnInit(): void {
    $(document).ready(() => {
      this.loader.loaderDialogEmitter.emit({ isOpen: false });
      this.update2(7);

    })

    var divElement = document.getElementById('viz1658486490626');
    if(divElement != null){
      var vizElement = divElement.getElementsByTagName('object')[0];
      
        vizElement.style.width = '100%';
        vizElement.style.height = '100%';
      
      var scriptElement = document.createElement('script');
      scriptElement.src = 'https://public.tableau.com/javascripts/api/viz_v1.js';
        vizElement.parentNode?.insertBefore(scriptElement, vizElement); 


    }
    
   

    $(".Progroot #continue").hide();
    console.log($("#continue"))
  }
  ngOnDestroy(): void {
    this.loader.loaderDialogEmitter.emit({ isOpen: true });
    $(".Progroot #continue").show();

  }
  update2(index : number) {
    this.appService.barreEmitter.emit({ index: index, PathContinue: " ", PathRetoure: " ",isValide:true })
  }
}
