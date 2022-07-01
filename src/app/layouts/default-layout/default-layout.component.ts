import {  AfterViewChecked, ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { ModulesMenuSideBarComponent } from 'src/app/components/modules-menu-side-bar/modules-menu-side-bar.component';
import { SettingsMenuSideBarComponent } from 'src/app/components/settings-menu-side-bar/settings-menu-side-bar.component';
import { GridService } from 'src/app/services/grid-Service/grid-service.service';
import { Router,Event as RouterEvent, NavigationStart, NavigationError, NavigationCancel, ChildActivationStart } from '@angular/router';
import { LoaderService } from 'src/app/services/loader-service/loader-service.service';
import { MyIndexedDbDataService } from 'src/app/services/myIndexedDbDataService/my-indexed-db-data-service.service';
import { Subscription } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { AppService } from 'src/app/services/app-service/app-service.service';
import { ProgressBarreComponent } from 'src/app/components/progress-barre/progress-barre.component'


declare var $ :any;
declare var bootstrap :any;

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'app-default-layout',
  templateUrl: './default-layout.component.html',
  styleUrls: ['./default-layout.component.scss']
})
export class DefaultLayoutComponent implements OnInit, AfterViewChecked, OnDestroy {

  // left side BarMenu props
  @ViewChild(ModulesMenuSideBarComponent) leftMenuSideBar ?: ModulesMenuSideBarComponent;
  @ViewChild( SettingsMenuSideBarComponent ) rightSettingsSideBar ?: SettingsMenuSideBarComponent;
  @ViewChild(ProgressBarreComponent) ProgressBar ?: ProgressBarreComponent;
  // for each API request check token
  // every 1 min chech token here
  logedIn: boolean = true; // if token is expired turn this too false to get the auth-overlay
  shown:boolean = true;
  currentPage :string='';
  langSubsc$ ?: Subscription; 
  routerSubsc$ ?: Subscription;
  pageSubsc$ ?:Subscription;


  constructor( 
    public translate: TranslateService, 
    public gridservice: GridService, 
    private cdref: ChangeDetectorRef,
    private router: Router, 
    private loader :LoaderService, 
    private idbDataService : MyIndexedDbDataService, 
    public appService: AppService ) { 
      
    this.routerSubsc$ = this.router.events.subscribe((e : RouterEvent) => {
      this.navigationInterceptor(e);
    })
    this.langSubsc$ = this.translate.onLangChange.subscribe( val=>{
      if(val.lang =="fr"){
        $('.realContent').css('direction', 'ltr');
      }else{
        $('.realContent').css('direction', 'rtl');
      }
      this.createToolTips();
    })
    this.pageSubsc$ = this.gridservice.currentPageSubject.subscribe( pageName=>{
      if(pageName)
      this.currentPage=' - '+pageName
      else
      this.currentPage=''
    });
  }

  ngOnInit(): void {
    // adding close sideBars on outside click
    document.getElementById('realContent')!.addEventListener('click', (e:any)=>{

      this.leftMenuSideBar?.closeMenu();
      
      this.rightSettingsSideBar?.closeMenu();

        
      let btn:any =  document.getElementById('btn');
      if( btn && !document.getElementById('menuFlottant')?.contains(e.target) && btn.checked )
        document.getElementById('btn')?.click();

      let collapsingSearchArea = document.getElementById('collapsingSearchArea');
      if( collapsingSearchArea && !document.getElementById('collapsingSearchArea')?.contains(e.target)  ){
        bootstrap.Collapse.getInstance(document.getElementById('collapsingSearchArea'))?.hide();
      }
    })
    this.adjusteComponentHeight();
    setTimeout( this.adjusteComponentHeight, 250 ) ;
    $(()=>{
      $( window ).resize(()=>{
      this.adjusteComponentHeight();
        setTimeout( ()=>this.adjusteComponentHeight(), 190)
      });
    })
    this.createToolTips();
  }


  ngAfterViewChecked(){
  }

  ngOnDestroy() :void {
    this.routerSubsc$?.unsubscribe();
    this.langSubsc$?.unsubscribe();
    this.pageSubsc$?.unsubscribe();
  }

  openLeftSideBar(){
    this.leftMenuSideBar?.openMenu();
  }

  openRightSideBar(){
    this.rightSettingsSideBar?.openMenu();
  }
  
  undo() {
    this.gridservice.GO_undo();
    $('.tooltip.show').remove()
  }

  redo(){
    this.gridservice.Go_redo();
    $('.tooltip.show').remove()
  }

  save(){
    this.gridservice.Go_save();
    $('.tooltip.show').remove()
  }

  

  showSearchArea(){
    $(function(){
      var collapseElementList = [].slice.call(document.querySelectorAll('#collapsingSearchArea'))
      var collapseList = collapseElementList.map(function (collapseEl) {
        return new bootstrap.Collapse(collapseEl)
      })
      if(collapseList && !$('#collapsingSearchArea').hasClass('show'))
      collapseList[0].show()
    })
  }

  
  /**
   *  Shows and hides the loading spinner during RouterEvent changes
  */
  navigationInterceptor(event: RouterEvent): void {
    if (event instanceof ChildActivationStart) {
      this.loader.loaderDialogEmitter.emit({ isOpen: true});
    }
    if (event instanceof  NavigationError) {
      this.loader.loaderDialogEmitter.emit({ isOpen: false});
    }
    if (event instanceof NavigationCancel) {
      this.loader.loaderDialogEmitter.emit({ isOpen: false});
    }
  }

  adjusteComponentHeight(){
    if( window.innerWidth<590 ){
      $('.ComponentHeight').height('unset');
      return
    }
    const children : any = $('#realContent').children();
    const contentHeight: number = $('#content').height();
    const headerheight : number = $($('#content').children()[0]).height();
    $('.ComponentHeight').height( contentHeight - headerheight - 12 );
  }

  /**
   * Just creating toolTips
   */
  private createToolTips(){
    // creating all tooltips using bootstrap tooltips
    $( function() {
      let tooltipTriggerList:any = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
      let tooltipList:any = tooltipTriggerList.map(function (tooltipTriggerEl:any) {
        return new bootstrap.Tooltip(tooltipTriggerEl, { placement: 'auto', trigger: 'hover'})
      })
    });
  }
}
