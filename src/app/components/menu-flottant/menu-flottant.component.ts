import { Component, Input, OnInit } from '@angular/core';
import { GridService } from 'src/app/services/grid-Service/grid-service.service';
declare var $:any;
declare var bootstrap:any;

@Component({
  selector: 'app-menu-flottant',
  templateUrl: './menu-flottant.component.html',
  styleUrls: ['./menu-flottant.component.scss']
})
export class MenuFlottantComponent implements OnInit {

  @Input('canSave') canSave:boolean = false;

  constructor( public gridservice :GridService) { 

  }

  ngOnInit(): void {
  }

  saveBtn(){
    this.gridservice.Go_save();
  }


  showSearchArea(){
    $(function(){
      var collapseElementList = [].slice.call(document.querySelectorAll('#collapsingSearchArea'))
      var collapseList = collapseElementList.map(function (collapseEl) {
        return new bootstrap.Collapse(collapseEl)
      })
      if(collapseList)
      collapseList[0].toggle()
    })
  }

}
