import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoaderService } from 'src/app/services/loader-service/loader-service.service';

declare var $: any;

var ids: number[] = [1, 2, 3];
@Component({
  selector: 'app-resumer',
  templateUrl: './resumer.component.html',
  styleUrls: ['./resumer.component.scss']
})
export class ResumerComponent implements OnInit {

  titre: string = "Resumer";
  data: any = [{
    description: "Des séances qui ont le champs de la durée vide ou non numérique ou incorrecte",
    title: "resumer",
    erreur: "1",
    buttonID: "detail1",
    route: "./Resultat",
    id:"A"
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

