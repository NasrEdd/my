import { Component, OnInit, Input } from '@angular/core';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

declare var $:any;
@Component({
  selector: 'app-progress-barre',
  templateUrl: './progress-barre.component.html',
  styleUrls: ['./progress-barre.component.scss']
})
export class ProgressBarreComponent implements OnInit {
   NomPage : string = "";
   @Input() NewPage : string = "";
   @Input() Poucentage : string = "";
   @Input() PathContinue : string = "";
   PathRetoure : string = "..";

  constructor() { }

  ngOnInit(): void {
    $(document).ready(()=>{
      $(".Progpourcentage").width(this.Poucentage)
      console.log(this.NomPage);
      this.NomPage += this.NewPage;
    })
  }

}
