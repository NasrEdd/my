import { Component, OnInit } from '@angular/core';
import { createToolTips } from 'src/app/Classes/Helpers';

declare var bootstrap:any, $:any;

@Component({
  selector: 'app-paiement-section',
  templateUrl: './paiement-section.component.html',
  styleUrls: ['./paiement-section.component.scss']
})
export class PaiementSectionComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    createToolTips();
  }


}
