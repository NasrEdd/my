import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-auth-layout',
  templateUrl: './auth-layout.component.html',
  styleUrls: ['./auth-layout.component.scss']
})
export class AuthLayoutComponent implements OnInit {


  constructor( private title: Title, private translate:TranslateService) {
    this.translate.get('AUTH.TITLE').toPromise().then(title=>this.title.setTitle("Registrariat - "+title)
    )
  }

  formSubmit( event :any){
    event.preventDefault();
    alert('loggin In ...');
  }

  ngOnInit(): void {
  }

}
