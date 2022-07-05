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
  choix : string = "Modifier"
  constructor(private loader: LoaderService,private router: Router, public appService: AppService) { }

  ngOnInit(): void {
    $(document).ready(() => {
      this.loader.loaderDialogEmitter.emit({ isOpen: false });
    })

    $(".Progroot #continue").hide();
    console.log($("#continue"))
  }
  ngOnDestroy(): void {
    this.loader.loaderDialogEmitter.emit({ isOpen: true });
    $(".Progroot #continue").show();

  }

}
