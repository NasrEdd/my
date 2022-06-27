import { EventEmitter, Injectable, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { from, Subject } from 'rxjs';
import { NgxIndexedDBService } from 'ngx-indexed-db';



const gendersApi: string = "http://localhost:3000/genders";
const countriesApi: string = "http://localhost:3000/countries";
const nationalitiesApi: string = "http://localhost:3000/nationalities";
const schoolsApi: string = "http://localhost:3000/schools";
const yearsApi: string = "http://localhost:3000/years";
const DefaultExperations : { gendersTable :number, countriesTable :number, nationalitiesTable :number, schoolsTable :number, yearsTable :number} = {
  gendersTable: 15,
  countriesTable: 15,
  nationalitiesTable : 15,
  schoolsTable : 365,
  yearsTable : 365
}



// local vars for production
const localGenders : any[]= [
  {
  "genderId" : "homme",
  "genderNamekey": "GENDERS.HOMME"
  },
  {
  "genderId" : "femme",
  "genderNamekey": "GENDERS.FEMME"
  },
  {
  "genderId": "indefini",
  "genderNamekey": "GENDERS.INDEFINI"
  }
];
const localCountries : any[] = [
  {
    "countryNamekey": "COUNTRIES.MOROCCO",
    "countryId": "Maroc"
  },
  {
    "countryNamekey": "COUNTRIES.GERMANY",
    "countryId" : "Allemagne"
  },
  {
    "countryNamekey": "COUNTRIES.FRANCE",
    "countryId" : "France"
  }
]
const localNationalities:any[] = [
  {
    "nationalityNamekey": "NATIONALITIES.MOROCCO",
    "nationalityId": "Maroc"
  },
  {
    "nationalityNamekey": "NATIONALITIES.GERMANY",
    "nationalityId": "Allemagne"
  },
  {
    "nationalityNamekey": "NATIONALITIES.FRANCE",
    "nationalityId": "France"
  }
]
const localSchools:any[] = [
  {
  "schoolNamekey": "SCHOOLS.ALLSCHOOLS",
  "schoolId": "ALL"
  },
  {
  "schoolNamekey": "SCHOOLS.ISIAM",
  "schoolId": "Isiam"
  },
  {
  "schoolNamekey": "SCHOOLS.POLY",
  "schoolId": "poly"
  }
]
const localYears:any[] = [
  { 
		"yearId": "2021",
		"yearStr": "2021/2022"
		},
	  {
		"yearStr": "2020/2021",
		"yearId": "2020"
	  },{
		"yearStr": "2019/2020",
		"yearId": "2019"
	  }
]

const updateDbTableName : string = "updateDbTable"; // the name of the table that stores all tables updating infos


@Injectable({ providedIn: 'root' })
export class MyIndexedDbDataService implements OnDestroy {

  constructor( private http : HttpClient, public DB: NgxIndexedDBService ) {
  }

  ngOnDestroy(){
  }

  /**
   * This function will be called into AppComponent to check if indexed Db tables are empty and fill theme synchronously
   */
  async fillAllTables( forceUpdate :boolean=false ){
  
    // force refill fill Genders Table
    let gendersPromise : Promise<any[]> = this.getGendersTable( forceUpdate );

    // force refill countries Table
    let countriesPromise : Promise<any[]> = this.getCountriesTable( forceUpdate );

    // force refill Nationalities Table
    let nationalitiesPromise : Promise<any[]> = this.getNationalitiesTable( forceUpdate );

    // force refill schools Table
    let schoolsPromise : Promise<any[]> = this.getSchoolsTable( forceUpdate );

    // force refill years Table
    let yearsPromise : Promise<any[]> = this.getYearsTable( forceUpdate );

    let allpromise : Promise<any[]> = Promise.all([ gendersPromise, countriesPromise, nationalitiesPromise, schoolsPromise, yearsPromise]);
    await allpromise;
  }

  private getDayDifference( newDate :number, oldDate :number ): number{
    return Math.ceil ( (( oldDate - newDate )/ (1000 * 3600 * 24)) );
  }

  /***
   * function that returns All data from a table in the indexedDb, before that it updates it, it fetches it from API 
   */
  private async getData( tableName :string, forceUpdate :boolean, ApiUrl :string, localData :any[] ): Promise<any[]>{
    let promise :  Promise<any[]> = new Promise<any[]>( resolve=>{
      // if forceUpdate clear & fill again table 
      if( forceUpdate ){
        this.DB.getByIndex( updateDbTableName, 'tableName', tableName).toPromise().then( ( row :any)=>{
          if( row )
            this.DB.update( updateDbTableName, { 'id': row.id, 'tableName': tableName, 'lastUpdate': (new Date()).getTime(), 'Experation': row.Experation} )
          else
            this.DB.add( updateDbTableName, { tableName: tableName, lastUpdate: (new Date()).getTime(), Experation: DefaultExperations[(tableName as keyof typeof DefaultExperations)] })
        })
        this.DB.clear( tableName).toPromise().then( any=>{
          // fill table again
          if( environment.production ){
            this.DB.bulkAdd( tableName, localData).toPromise().then(()=>{})
            resolve(localData);
          }else
            this.http.get(ApiUrl).toPromise().then( (entities :any)=>{
              this.DB.bulkAdd( tableName, entities).toPromise().then(()=>{}) // fill table again
              resolve(entities);
            }).catch(e=>{
              this.DB.bulkAdd( tableName, []).toPromise().then(()=>{}) // fill table again
              resolve([]);
            })
        })
      }else{
        this.DB.count( tableName).toPromise().then( (cnt :number)=>{
          if( cnt== 0){
            this.DB.getByIndex( updateDbTableName, 'tableName', tableName).toPromise().then( async( row :any)=>{
              if( row!=undefined && row!=null && row )
                this.DB.update( updateDbTableName, { 'id':  row.id,'tableName': tableName, 'lastUpdate': (new Date()).getTime(), 'Experation': row.Experation}).toPromise().then(()=>null)
              else{
                this.DB.add( updateDbTableName, { tableName: tableName, lastUpdate: (new Date()).getTime()+'', Experation: DefaultExperations[(tableName as keyof typeof DefaultExperations)] }).toPromise().then(()=>null);
              }
            })
            // check table is empty and fill it
            if( environment.production ){
              this.DB.bulkAdd( tableName, localData).toPromise().then(()=>{})
              resolve(localData);
            }else
              this.http.get(ApiUrl).toPromise().then( (entities :any)=>{
                this.DB.bulkAdd( tableName, entities).toPromise().then(()=>{}) // fill table again
                resolve(entities);
            }).catch(e=>{
              this.DB.bulkAdd( tableName, []).toPromise().then(()=>{}) // fill table again
              resolve([]);
            })
          }else{
            // else check expiring table data and update it 
            const currentDate : number  = (new Date()).getTime();
            this.DB.getByIndex( updateDbTableName, 'tableName', tableName).toPromise().then( ( row :any)=>{
              if( this.getDayDifference( currentDate, row.lastUpdate) > row.Experation ) { // if expired update it 
                this.DB.getByIndex( updateDbTableName, 'tableName', tableName).toPromise().then( ( row :any)=>{
                  this.DB.update( updateDbTableName, { tableName: tableName, lastUpdate: (new Date()).getTime(), Experation: DefaultExperations[(tableName as keyof typeof DefaultExperations)]}, row.id).toPromise().then(()=>{})
                })
                this.DB.clear( tableName).toPromise().then( (any)=>{ // clear
                  // fill
                  if( environment.production ){
                    this.DB.bulkAdd( tableName, localData).toPromise().then(()=>{})
                    resolve(localData);
                  }else
                    this.http.get(ApiUrl).toPromise().then( (entities :any)=>{
                      this.DB.bulkAdd( tableName, entities).toPromise().then(()=>{})
                      resolve(entities);
                    }).catch(e=>{
                      this.DB.bulkAdd( tableName, []).toPromise().then(()=>{}) // fill table again
                      resolve([]);
                    })
                })
              }else{ // get stored data from indexedDB
                this.DB.getAll( tableName).toPromise().then( ( data :any[])=>{
                  resolve(data);
                } )
              }
            })
          }
        })
      }
    })
    return promise;
  }


  /**
   * gets the genders table, depending on the pervious function
   * @returns Promise<genders[]>
   */
  async getGendersTable( forceUpdate:boolean = false):Promise<any[]>{
    return this.getData( 'gendersTable', forceUpdate, gendersApi, localGenders);
  }

  /**
   * gets the countries table,  depending on the pervious function
   * @returns Promise<countries[]>
   */
  async getCountriesTable( forceUpdate:boolean = false):Promise<any[]>{
    return this.getData( 'countriesTable', forceUpdate, countriesApi, localCountries);
  }

  /**
   * gets the nationalities table,  depending on the pervious function
   * @returns Promise<countries[]>
   */
  async getNationalitiesTable( forceUpdate:boolean = false):Promise<any[]>{
    return this.getData( 'nationalitiesTable', forceUpdate, nationalitiesApi, localNationalities);
  }

  async getSchoolsTable( forceUpdate:boolean = false):Promise<any[]>{
    return this.getData( 'schoolsTable', forceUpdate, schoolsApi, localSchools);
  }  

  async getYearsTable( forceUpdate:boolean = false):Promise<any[]>{
    return this.getData( 'yearsTable', forceUpdate, yearsApi, localYears);
  }
}
