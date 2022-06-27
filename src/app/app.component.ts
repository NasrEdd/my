import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { MyIndexedDbDataService } from './services/myIndexedDbDataService/my-indexed-db-data-service.service';
import { AppService } from './services/app-service/app-service.service';
declare var $:any;


// Define themes here
export const themes :any = [
  {
    themeName : 'claire',
    cssFile: "lightTheme.css",
    translationName : 'SIDEBARS.SETTINGSBAR.LIGHTTHEME'
  },
  {
    themeName : 'sombre',
    cssFile: "darkTheme.css",
    translationName : 'SIDEBARS.SETTINGSBAR.DARKTHEME'
  }, 
];



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  title = 'pulse-registrariat';
  currentLang :string = ''; 
  currentThemeName :string="claire"; // either 'claire' or 'sombre'

  constructor( private translate:TranslateService, private appService: AppService, private myIDBservice :MyIndexedDbDataService) {
    
    this.translate.addLangs([  'fr', 'ar']);
    this.translate.setDefaultLang('fr');

    
    /** Try to use the browser language by default 
    const browserLang :string = this.translate.getBrowserLang();
    this.translate.user( browserLang.match(/en|fr/)?browserLang:'fr' );
    */
    this.translate.use('fr'); // #Todo : Call saved Configuration


    this.currentLang = this.translate.currentLang;
    this.appService.themeEmitter.emit('claire'); 

    this.translate.onLangChange.subscribe( obj=>{
      this.currentLang = obj.lang;
      let BSdirectory:string ="./assets/css/Bootstrap.";
      if( this.currentLang == "ar" ) BSdirectory+="rtl.min.css"; 
      else BSdirectory+="ltr.min.css";
      $('#bootstrapLink').attr("href",BSdirectory);
    })

    this.appService.themeEmitter.subscribe( newTheme => {
      $('#themeLink').attr('href', "./assets/css/"+themes.find((el:any)=>el.themeName==newTheme).cssFile);
    });

  }


}
