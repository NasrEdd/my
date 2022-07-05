import { Component, OnInit, Input } from '@angular/core';
import { LoaderService } from 'src/app/services/loader-service/loader-service.service';
import {
  trigger,
  state,
  style,
  animate,
  transition,
  // ...
} from '@angular/animations';
declare var $: any;

@Component({
  selector: 'app-table-erreur',
  templateUrl: './table-erreur.component.html',
  styleUrls: ['./table-erreur.component.scss'],
  animations: [

]
})
export class TableErreurComponent implements OnInit {
  titre : string = "Tableau";
  
  
  constructor(private loader: LoaderService) {
    this.creatTable();
   }
  ngOnInit(): void {
    $(document).ready(() => {
      this.loader.loaderDialogEmitter.emit({ isOpen: false });
    })
    $(".Progroot").hide();
    
  }

  ngOnDestroy(): void {
    this.loader.loaderDialogEmitter.emit({ isOpen: true });
    $(".Progroot").show();
  }

  key : any = [];
  value : any = [];

  data: any = [{
    id: 1,
    sectionId: 2,
    coursCode: 3, 
    composante: "string",
    section: "string",
    sect : "hshdhd",
  }, {
      id: 1,
      sectionId: 2,
      coursCode: 3,
      composante: "string",
      section: "string",
      sect: "hshdhd",
    }, {
      id: 1,
      sectionId: 2,
      coursCode: 3,
      composante: "string",
      section: "string",
      sect: "hshdhd",
    }, {
      id: 1,
      sectionId: 2,
      coursCode: 3,
      composante: "string",
      section: "string",
      sect: "hshdhd",
    }, {
      id: 1,
      sectionId: 2,
      coursCode: 3,
      composante: "string",
      section: "string",
      sect: "hshdhd",
    }, {
      id: 1,
      sectionId: 2,
      coursCode: 3,
      composante: "string",
      section: "string",
      sect: "hshdhd",
    },{
    id: 1,
    sectionId: 2,
    coursCode: 3, 
    composante: "string",
    section: "string",
    sect : "hshdhd",
},
    {
      id: 1,
      sectionId: 2,
      coursCode: 3,
      composante: "string",
      section: "string",
      sect: "hshdhd",
    }];


  creatTable(){
    this.data.forEach((element : any)=>{
      this.key = Object.keys(element);
      this.value.push(Object.values(element));
    });
    console.log(this.key);
  };
}
