import { EventEmitter, Injectable, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class AppService implements OnDestroy {

  currentTheme : string= "claire";
  themeEmitter : EventEmitter<string> = new EventEmitter<string>(); 
  private themeEmitterSubscription? : Subscription;

  currentSchool ?:{ id: string, keyName: string} = { id: 'ALL', keyName: 'SCHOOLS.ALLSCHOOLS'}; 
  schoolEmitter : EventEmitter<{ id: string, keyName: string}> = new EventEmitter<{ id: string, keyName: string}>(); 
  private schoolEmitterSubscription? : Subscription;

  currentYear ?: { yearId: string, yearStr:string} = { yearId: '2021', yearStr: '2021/2022'};
  yearEmitter : EventEmitter<{ yearId: string, yearStr:string}> = new EventEmitter<{ yearId: string, yearStr:string}>(); 
  private yearEmitterSubscription? : Subscription;

  constructor() {
    this.themeEmitterSubscription = this.themeEmitter.subscribe( (newTheme:string) => {
      if(newTheme && newTheme.length)
        this.currentTheme = newTheme;
      else
        this.currentTheme = "claire"; // default
    });
    this.schoolEmitterSubscription = this.schoolEmitter.subscribe(school=>{
      this.currentSchool = school;
    });
    this.yearEmitterSubscription = this.yearEmitter.subscribe( year=>{
      this.currentYear = year;
    });
  }

  ngOnDestroy(){
    this.themeEmitterSubscription?.unsubscribe();
    this.schoolEmitterSubscription?.unsubscribe();
    this.yearEmitterSubscription?.unsubscribe();
  }
}
