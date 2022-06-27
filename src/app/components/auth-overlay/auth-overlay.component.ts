import { Component, OnInit } from '@angular/core';
declare var $:any;
@Component({
  selector: 'app-auth-overlay',
  templateUrl: './auth-overlay.component.html',
  styleUrls: ['./auth-overlay.component.scss']
})
export class AuthOverlayComponent implements OnInit {

  constructor() { 
    setTimeout( ()=>$('.overlay').css('height', '100%'), 50) // keep animation 
  }

  ngOnInit(): void {
  }

}
