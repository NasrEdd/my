import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { LoaderService } from 'src/app/services/loader-service/loader-service.service';


@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent implements OnInit, OnDestroy {

  visible :boolean = true;
  cancelable : boolean = false;

  private loaderSubsc$ ?: Subscription;

  constructor( private loader:LoaderService) { 
    this.loaderSubsc$ = this.loader.loaderDialogEmitter.subscribe( ( value :{ isOpen :boolean, isCancelable ?:boolean} )=>{
      this.visible = value.isOpen; this.cancelable = value.isCancelable? value.isCancelable:false; 
    })

  }

  ngOnInit(): void {
  }


  ngOnDestroy(){
    this.loaderSubsc$?.unsubscribe();
  }

  CancelOperation(){
    console.log("cancel Click !")
    this.loader.loaderCancelEmitter.next({ "date": new Date(), "source": "loader.component.ts"} );
  }

}
