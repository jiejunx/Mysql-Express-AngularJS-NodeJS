import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { Report1Component, DD1Dialog } from './report1/report1.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog';
import { HomeComponent } from './home/home.component';
import { MatTabsModule, MatSidenavModule, MatIconModule, MatButtonModule, MatToolbarModule, MatListModule, MatGridListModule, MatDividerModule, MatDivider, MatCardModule, MatNativeDateModule, MatDatepicker, MatDatepickerModule, MatAutocompleteModule } from '@angular/material';
import { HeaderComponent } from './navigation/header/header.component';
import { SidenavListComponent } from './navigation/sidenav-list/sidenav-list.component';
import { CountUpModule } from 'countup.js-angular2';
import { ScrollToModule } from '@nicky-lenaers/ngx-scroll-to';
import { Report2Component } from './report2/report2.component';
import { Report3Component } from './report3/report3.component';
import { Report4Component } from './report4/report4.component';
import { MatFormFieldModule, MatInputModule, MatSelectModule } from '@angular/material';
import { Report5Component } from './report5/report5.component';
import { Action3Component, EDialog } from './action3/action3.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Action1Component } from './action1/action1.component';
import { DatePipe } from '@angular/common';
import { Report6Component, DD6Dialog } from './report6/report6.component';
import { Report7Component } from './report7/report7.component';
import { Action2Component } from './action2/action2.component';
import { ErrorDialogComponent } from './commons/error-dialog/error-dialog.component';


@NgModule({
  declarations: [
    AppComponent,
    Report1Component,
    DD1Dialog,
    EDialog,
    HomeComponent,
    HeaderComponent,
    SidenavListComponent,
    Report2Component,
    Report3Component,
    Report4Component,
    Report5Component,
    Action3Component,
    Action1Component,
    Report6Component,
    Report7Component,
    DD6Dialog,
    Action2Component,
    ErrorDialogComponent,
  
    

  ],
  entryComponents: [DD1Dialog, EDialog, DD6Dialog, ErrorDialogComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatDialogModule,
    MatTabsModule,
    MatSidenavModule,
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
    MatListModule,
    MatGridListModule,
    CountUpModule,
    MatDividerModule,
    MatCardModule,
    MatButtonModule,
    ScrollToModule.forRoot(),
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    ReactiveFormsModule,
    FormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatAutocompleteModule,
    MatTabsModule


  ],
  exports: [
    MatTabsModule,
    MatSidenavModule,
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
    MatListModule,
    MatGridListModule,
    CountUpModule,
    MatDividerModule,
    MatCardModule,
    MatButtonModule,
    ReactiveFormsModule,
    FormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatAutocompleteModule,
    MatTabsModule

    

  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
