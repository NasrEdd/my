import { Component, OnDestroy, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { LoaderService } from 'src/app/services/loader-service/loader-service.service';
import { MyIndexedDbDataService } from 'src/app/services/myIndexedDbDataService/my-indexed-db-data-service.service';
import { AppService } from 'src/app/services/app-service/app-service.service';
import { environment } from 'src/environments/environment';
import { themes } from '../../app.component';
declare var $:any;

@Component({
  selector: 'app-settings-menu-side-bar',
  templateUrl: './settings-menu-side-bar.component.html',
  styleUrls: ['./settings-menu-side-bar.component.scss']
})
export class SettingsMenuSideBarComponent implements OnInit, OnDestroy {

  themes : any = themes ;
  widgetData : { loaded :boolean, schools :any[], years: any[]} = {
    loaded : false,
    schools : [],
    years : []
  }
  version: string = environment.version;
  currentLang:string='';
  currentSchoolId :string='';
  currentYearId :string='';
  constructor(public translate:TranslateService, public appService: AppService, private loader: LoaderService, private myIdbService :MyIndexedDbDataService) { 
    translate.onLangChange.subscribe( obj=>{
      if(obj.lang=="fr"){
        $('.settingsSection').css('direction','ltr')
      }else{
        $('.settingsSection').css('direction','rtl')
      }
      this.currentLang = this.translate.currentLang;
    })
    this.currentLang = this.translate.currentLang;
    this.currentSchoolId = this.appService.currentSchool?.id!+'';
    this.currentYearId = this.appService.currentYear?.yearId!+'';
    this.appService.schoolEmitter.subscribe(school=>this.currentSchoolId=school.id+'' );
    this.appService.yearEmitter.subscribe(year=>this.currentYearId=year.yearId+'' );
  }

  ngOnInit(): void {
    let promise : Promise<any> = Promise.all([ this.myIdbService.getSchoolsTable(), this.myIdbService.getYearsTable()])
    promise.then( (data :any[])=>{
      this.widgetData = {
        loaded : true,
        schools: data[0],
        years : data[1]
      }
    })
  }

  ngOnDestroy(){
    this.translate.onLangChange.unsubscribe();
  }

  closeMenu(){
    $('#SettingsSideBar').removeClass('active');
  }

  openMenu(){
    $('#SettingsSideBar').addClass('active');
  }

  resetIndexedDB(){
    this.loader.loaderDialogEmitter.emit({ isOpen: true })
    let promise :Promise<any> = this.myIdbService.fillAllTables(true);
    promise.then( e=>{
      this.loader.loaderDialogEmitter.emit({ isOpen: false });
    })
  }

  changeLang( langId:string){
    if(langId && langId.length)
      this.translate.use(langId);
    else
      this.translate.use('fr');
  }

  handleSchoolChange(schoolId:any){
    let schoolKeyName:string = this.widgetData.schools.find(ele=>ele.schoolId==schoolId).schoolNamekey;
    let school = { id: schoolId, keyName: schoolKeyName};
    this.appService.schoolEmitter.emit(school);
  }

  handleYearChange( yearId :any){
    let yearStr:string = this.widgetData.years.find(ele=>ele.yearId==yearId).yearStr;
    let year = { yearId: yearId, yearStr: yearStr};
    this.appService.yearEmitter.emit(year);
  }

}
