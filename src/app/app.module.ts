import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { MatToolbarModule } from '@angular/material/toolbar';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DefaultLayoutModule } from './layouts/default-layout/default-layout.module';
import { AuthLayoutModule } from './layouts/auth-layout/auth-layout.module';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ScrollingModule } from '@angular/cdk/scrolling';

// Translations Imports
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { ModuleTranslateLoader, IModuleTranslationOptions } from '@larscom/ngx-translate-module-loader';
import { MatGridListModule } from '@angular/material/grid-list';

// Import from library
import {
  NgxAwesomePopupModule,
  DialogConfigModule,
  ConfirmBoxConfigModule,
  ToastNotificationConfigModule
} from '@costlydeveloper/ngx-awesome-popup';
import {
  IgxIconModule,
  IgxButtonModule,
  IgxButtonGroupModule,
  IgxInputGroupModule,
  IgxRadioModule
} from "igniteui-angular";

import { NgxIndexedDBModule, DBConfig} from 'ngx-indexed-db';
import { environment } from 'src/environments/environment';
import { ResumerComponent } from './pages/resumer/resumer.component';
import { PreTraitementComponent } from 'src/app/pages/pre-traitement/pre-traitement.component';
import { ResultatComponent } from './resultat/resultat.component';
import { LancementAlgoComponent } from './pages/lancement-algo/lancement-algo.component';
import { WaiterComponent } from './pages/waiter/waiter.component';
import { PlchoixComponent } from './plchoix/plchoix.component';
import { PlanificationPageComponent } from './planification-page/planification-page.component';
import { IgxStepperModule } from 'igniteui-angular';
import { FormsModule } from "@angular/forms";
import { ChoseComponent } from './components/chose/chose.component';



export function HttpLoaderFactory(http: HttpClient){
  const baseTranslateUrl = './assets/i18n'; // modifier le chemin pour chaque version en production 
  const options: IModuleTranslationOptions = {
    modules: [
      // final url: ./assets/i18n/**.json
      { baseTranslateUrl },
      // final url: ./assets/i18n/DossierEtudiant/**.json
      { baseTranslateUrl, moduleName: 'DossierEtudiant' },
      { baseTranslateUrl, moduleName: 'CursusParSem' },
      { baseTranslateUrl, moduleName: 'CursusParNiv' },
      { baseTranslateUrl, moduleName: 'DocsAdmin' },
      { baseTranslateUrl, moduleName: 'Diplomes' },
      { baseTranslateUrl, moduleName: 'SideBars' },
      { baseTranslateUrl, moduleName: 'Auth' },
      { baseTranslateUrl, moduleName: 'Loader' },
      { baseTranslateUrl, moduleName: 'ModalConfirm' },
      { baseTranslateUrl, moduleName: 'smartPlaning' },


    ]
  };
  return new ModuleTranslateLoader(http, options);
}

// schema || conf de indexDB : creation de table
const indexDbConfig: DBConfig  = {
  name: 'DB',
  version: environment.IDBversion,// if you've changed schema of the db you've to update this version number
  objectStoresMeta: [{
    store: 'gendersTable',
    storeConfig: { keyPath: 'id',  autoIncrement: true },
    storeSchema: [
      { name: 'genderId', keypath: 'genderId', options: { unique: true } },
      { name: 'genderNamekey', keypath: 'genderNamekey', options: { unique: false } },
    ]
  },{
    store: 'countriesTable',
    storeConfig: { keyPath: 'id',  autoIncrement: true },
    storeSchema: [
      { name: 'countryId', keypath: 'countryId', options: { unique: true } },
      { name: 'countryNamekey', keypath: 'countryNamekey', options: { unique: false } }
    ]
  },{
    store: 'nationalitiesTable',
    storeConfig: { keyPath: 'id',  autoIncrement: true },
    storeSchema: [
      { name: 'nationalityId', keypath: 'nationalityId', options: { unique: true } },
      { name: 'nationalityNamekey', keypath: 'nationalityNamekey', options: { unique: false } }
    ]
  },{
    store: 'schoolsTable',
    storeConfig: { keyPath: 'id',  autoIncrement: true },
    storeSchema: [
      { name: 'schoolId', keypath: 'schoolId', options: { unique: true } },
      { name: 'schoolNamekey', keypath: 'schoolNamekey', options: { unique: false } }
    ]
  },
  {
    store: 'yearsTable',
    storeConfig: { keyPath: 'id',  autoIncrement: true },
    storeSchema: [
      { name: 'yearId', keypath: 'yearlId', options: { unique: true } },
      { name: 'yearName', keypath: 'yearName', options: { unique: false } }
    ]
  },
  {
    store: 'updateDbTable',
    storeConfig: { keyPath: 'id',  autoIncrement: true },
    storeSchema: [
      { name: 'tableName', keypath: 'tableName', options: { unique: true } },
      { name: 'lastUpdate', keypath: 'lastUpdate', options: { unique: false } },
      { name: 'Experation', keypath: 'Experation', options: { unique: false } },
    ]
  }]
};


@NgModule({
  declarations: [
    AppComponent,
    ResumerComponent,
    PreTraitementComponent,
    ResultatComponent,
    LancementAlgoComponent,
    WaiterComponent,
    ChoseComponent,
    PlchoixComponent,
    PlanificationPageComponent,
  
  
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    DefaultLayoutModule,
    AuthLayoutModule,
    BrowserAnimationsModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      },
      extend: true
    }),
    NgxAwesomePopupModule.forRoot(), // Essential, mandatory main module.
    DialogConfigModule.forRoot(), // Needed for instantiating dynamic components.
    ConfirmBoxConfigModule.forRoot(), // Needed for instantiating confirm boxes.
    ToastNotificationConfigModule.forRoot(), // Needed for instantiating toast notifications.
    NgxIndexedDBModule.forRoot(indexDbConfig),
    MatToolbarModule,
    MatGridListModule,
    ScrollingModule,
    IgxStepperModule,
    FormsModule,
    IgxIconModule,
    
    
   
  ],  
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]

})
export class AppModule {
}
