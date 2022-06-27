import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-chose',
  templateUrl: './chose.component.html',
  styleUrls: ['./chose.component.css']
})
export class ChoseComponent implements OnInit {
  @Input() title: string;
  @Input() description: string;

  constructor() {
    this.title = "title";
    this.description = "description";
  }

  GoTo() {
    console.log(`${this.title}`)
  }

  ngOnInit() { }
}
