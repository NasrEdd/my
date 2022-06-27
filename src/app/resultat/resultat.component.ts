import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoaderService } from 'src/app/services/loader-service/loader-service.service';

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
