import { EventEmitter, Injectable, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';


@Injectable({
  providedIn: 'root'
})


export class LoaderService implements OnDestroy {

  loaderIsOpen : boolean = true;
  loaderDialogEmitter : EventEmitter<{ isOpen :boolean, isCancelable ?:boolean}> = new EventEmitter<{ isOpen :boolean, isCancelable ?:boolean}>();
  
  loaderIsCancelable : boolean = false;
  loaderCancelEmitter : EventEmitter<any> = new EventEmitter<any>();

  private loaderSucs$ ?: Subscription;
  private cancelSubsc$ ?: Subscription;

  constructor() { 
    this.loaderSucs$ = this.loaderDialogEmitter.subscribe( ( value :{ isOpen :boolean, isCancelable ?:boolean} )=>{
      this.loaderIsOpen = value.isOpen; 
      this.loaderIsCancelable= value.isCancelable ? value.isCancelable:false;
    });
    this.cancelSubsc$ = this.loaderCancelEmitter.subscribe( (val:any)=>{
      this.loaderDialogEmitter.emit({ isOpen :false});
    })
  }

  ngOnDestroy(){
    this.cancelSubsc$?.unsubscribe();
    this.loaderSucs$?.unsubscribe();
  }
}
