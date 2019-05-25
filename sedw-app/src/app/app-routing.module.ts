import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Report1Component } from './report1/report1.component';
import { HomeComponent } from './home/home.component';
import { Report2Component } from './report2/report2.component';
import { Report3Component } from './report3/report3.component';
import { Report4Component } from './report4/report4.component';
import { Report5Component } from './report5/report5.component';
import { Action3Component } from './action3/action3.component';
import { Action1Component } from './action1/action1.component';
import { Report6Component } from './report6/report6.component';
import { Report7Component } from './report7/report7.component';
import { Action2Component } from './action2/action2.component';

const routes: Routes = [
  {path: '', redirectTo: '/home', pathMatch:'full'},
  {path: 'home/r1', redirectTo: '/r1', pathMatch:'full'},
  {path: 'home/r2', redirectTo: '/r2', pathMatch:'full'},
  {path: 'home/r3', redirectTo: '/r3', pathMatch:'full'},
  {path: 'home/r4', redirectTo: '/r4', pathMatch:'full'},
  {path: 'home/r5', redirectTo: '/r5', pathMatch:'full'},
  {path: 'home/r6', redirectTo: '/r6', pathMatch:'full'},
  {path: 'home/r7', redirectTo: '/r7', pathMatch:'full'},
  {path: 'home/a1', redirectTo: '/a1', pathMatch:'full'},
  {path: 'home/a2', redirectTo: '/a2', pathMatch:'full'},
  {path: 'home/a3', redirectTo: '/a3', pathMatch:'full'},
  {path: 'home/reports', redirectTo: '/home', pathMatch:'full'},
  {path: 'home/actions', redirectTo: '/home', pathMatch:'full'},
  {path: 'home', component: HomeComponent},
  {path: 'r1', component: Report1Component},
  {path: 'r2', component: Report2Component},
  {path: 'r3', component: Report3Component},
  {path: 'r4', component: Report4Component},
  {path: 'r5', component: Report5Component},
  {path: 'r6', component: Report6Component},
  {path: 'r7', component: Report7Component},
  {path: 'a1', component: Action1Component},
  {path: 'a2', component: Action2Component},
  {path: 'a3', component: Action3Component},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
