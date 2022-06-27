import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { AuthLayoutModule } from './layouts/auth-layout/auth-layout.module';
import { DefaultLayoutComponent } from './layouts/default-layout/default-layout.component';
import { DefaultLayoutModule } from './layouts/default-layout/default-layout.module';

const routes: Routes = [
  { 
    path:'', 
    component: DefaultLayoutComponent, 
    children: [
      {
        path: '',
        loadChildren: ()=>DefaultLayoutModule
      }
    ]
  },
  {
    path:'login',
    component: AuthLayoutComponent,
    children: [
      {
        path: '',
        loadChildren: ()=>AuthLayoutModule
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{ useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
