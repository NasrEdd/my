import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Transaction } from 'igniteui-angular';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GridService {

  //passing current Page 
  currentPageSubject: Subject<string> = new Subject<string>();

  // passing methods to children
  undoSubject: Subject<boolean> = new Subject<boolean>();
  canUndo : boolean=false;
  redoSubject: Subject<boolean> = new Subject<boolean>();
  canRedo : boolean=false;
  saveSubject : Subject<boolean> = new Subject<boolean>();
  canSave :boolean = false;

  canSearch :boolean = true;

  constructor( private httpClient: HttpClient) { }

  GO_undo(){
    this.undoSubject.next(true);
  }

  Go_redo(){
    this.redoSubject.next(true);
  }

  Go_save(){
    this.saveSubject.next(true);
  }

  resetBtns(){
    this.canRedo = this.canUndo = this.canSave = false;
    this.canSearch = true;
  }

  /**
   * Reponsible of sending data to backend to persiste it
   * @param apiSet : set of CUD Api urls (CUD of CRUD)
   * @param transactions : transactions of the grid before commiting them
   */
  persisteGridData( 
    apiSet :{ put :string, post :string, delete :string},
    transactions :Transaction[]
  ){
    const adds : Transaction[] = transactions.filter( (val)=>val.type=="add");
    const updates : Transaction[] = transactions.filter( (val)=>val.type=="update");
    const deletes : Transaction[] = transactions.filter( (val)=>val.type=="delete");

    let add_body : any[] = [], update_body : any[] = [], delete_body : any[] = [];
    let promisesTable :Promise<any>[] = [];

    // extracting bodies data & ids 
    if(adds.length)
      adds.forEach( ele=>{
        add_body.push(ele.newValue);
      })

    if( updates.length )
      updates.forEach( ele=>{
        update_body.push(ele.newValue);
      })

    if( deletes.length )
      deletes.forEach( ele=>{
        delete_body.push(ele.id); // ids sufficient to delete
      })

    // creating Requests
    if(add_body.length)
      promisesTable.push( this.httpClient.post( apiSet.post, add_body).toPromise() );

    if(update_body.length)
      promisesTable.push( this.httpClient.post( apiSet.put, update_body).toPromise() );

    if(delete_body.length)
      promisesTable.push( this.httpClient.post( apiSet.delete, delete_body).toPromise() );

    return promisesTable;
  }


}
