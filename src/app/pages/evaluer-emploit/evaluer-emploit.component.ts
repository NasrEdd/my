import { Component, OnInit } from '@angular/core';
import { LoaderService } from 'src/app/services/loader-service/loader-service.service';
declare var $: any;

@Component({
  selector: 'app-evaluer-emploit',
  templateUrl: './evaluer-emploit.component.html',
  styleUrls: ['./evaluer-emploit.component.scss']
})
export class EvaluerEmploitComponent implements OnInit {

  constructor(private loader: LoaderService) { }

  ngOnInit(): void {
    $(document).ready(() => {
      this.loader.loaderDialogEmitter.emit({ isOpen: false });
    })
  }

  ngOnDestroy(): void {
    this.loader.loaderDialogEmitter.emit({ isOpen: true });

  }
}
