import { Component, OnInit, AfterViewInit, Inject } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { R6Service } from '../r6.service';
import { r6year, r6result, r6injection } from '../r6_definitions';
import { r6month } from '../r6_definitions';

import { MAT_DIALOG_DATA, MatDialog } from '@angular/material'
import { r6detail } from '../r6_definitions';

@Component({
  selector: 'app-report6',
  templateUrl: './report6.component.html',
  styleUrls: ['./report6.component.css']
})
export class Report6Component implements OnInit, AfterViewInit {

  year: r6year[];
  month: r6month[];
  yearvalue: String = null
  monthvalue: String = null
  // stateResult: r6sResult[];
  displayedColumns: string[] = ['CatName', 'State', 'Qty', 'Detail'];



  dataSource = new MatTableDataSource();

  constructor(private r6Service: R6Service,
    public dialog: MatDialog) { }

  ngOnInit() {

    console.log(this.year);
  }

  ngAfterViewInit() {
    this.r6Service.getR6yearResult()
      .subscribe(dates => this.year = dates);
    this.r6Service.getR6monthResult()
      .subscribe(dates => this.month = dates);
  }




  anotherMethod() {
    console.log('You selected: ' + this.yearvalue + this.monthvalue);
    this.r6Service.getR6YearMonth(this.yearvalue, this.monthvalue)
      .subscribe(result => this.dataSource.data = result);

  }

  openDialog(element: r6result) {
    var r6inject = new r6injection();
    r6inject.year = this.yearvalue.toString()
    r6inject.month = this.monthvalue.toString()
    r6inject.State = element.State.toString()
    r6inject.CatName = element.CatName.toString()
    this.dialog.open(DD6Dialog, {
      data: r6inject,
      width : '1200px'
    })
  }

}


@Component({
  selector: 'dd6_dialog',
  templateUrl: 'dd6_dialog.html',
  styleUrls: ['dd6_dialog.css']
})
export class DD6Dialog {
  constructor(@Inject(MAT_DIALOG_DATA) public data: r6injection,
    public r6Service: R6Service) { }
  dataSource = new MatTableDataSource();
  displayedColumns: string[] = ['StoreNumber', 'StreetAddress',
    'CityName', 'State', 'ManagerName', "ActiveManagerEmail"];


  ngOnInit() {
    this.r6Service.getDetail(this.data.year,
      this.data.month,
      this.data.State,
      this.data.CatName)
      .subscribe(
        detail => this.dataSource.data = detail
      )
  }
}


