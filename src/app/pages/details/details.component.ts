import { Component, OnInit } from '@angular/core';
import { LoaderService } from 'src/app/services/loader-service/loader-service.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Subject, Observable } from "rxjs";
import { AppService } from 'src/app/services/app-service/app-service.service';

declare var $: any;

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {

  constructor(private loader: LoaderService, private http: HttpClient, private router: Router, public appService: AppService) { }

  ngOnInit(): void {
    $(document).ready(() => {
      this.loader.loaderDialogEmitter.emit({ isOpen: false });
    }
    )

    var divElement = document.getElementById('viz1658744429717');
    var vizElement = divElement?.getElementsByTagName('object')[0];
    if (divElement && vizElement) {
      if (divElement.offsetWidth > 800) { vizElement.style.width = '1000px'; vizElement.style.height = '3127px'; }
      else if (divElement.offsetWidth > 500) { vizElement.style.width = '1000px'; vizElement.style.height = '3127px'; }
      else { vizElement.style.width = '100%'; vizElement.style.height = '4077px'; }
      var scriptElement = document.createElement('script');
      scriptElement.src = 'https://public.tableau.com/javascripts/api/viz_v1.js';
      vizElement.parentNode?.insertBefore(scriptElement, vizElement);
    }

  }

  ngOnDestroy() {
    this.loader.loaderDialogEmitter.emit({ isOpen: true });

  }
}

