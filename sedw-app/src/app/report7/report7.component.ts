import { Component, OnInit, AfterViewInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { R7Service } from '../r7.service';
@Component({
  selector: 'app-report7',
  templateUrl: './report7.component.html',
  styleUrls: ['./report7.component.css']
})


export class Report7Component implements OnInit, AfterViewInit {

  displayedColumns: string[] = ['Year', 'Annual_Revenue_Small', 'Annual_Revenue_Medium', 'Annual_Revenue_Large', 'Annual_Revenue_ExtraLarge'];

  dataSource = new MatTableDataSource();

  constructor(private r7Service: R7Service) { }


  ngOnInit() {
  }


  ngAfterViewInit() {
    this.r7Service.getR7Result()
      .subscribe(r7finalresult => this.dataSource.data = r7finalresult);
  }


}

