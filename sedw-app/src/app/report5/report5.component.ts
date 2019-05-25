import { Component, OnInit, AfterViewInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { R5Service } from '../r5.service';

@Component({
  selector: 'app-report5',
  templateUrl: './report5.component.html',
  styleUrls: ['./report5.component.css']
})
export class Report5Component implements OnInit, AfterViewInit {

  displayedColumns: string[] = ['Year','quantity', 'reg_qty', 'gd_qty'];

  dataSource = new MatTableDataSource();

  constructor(private r5Service: R5Service) { }


  ngOnInit() {
  }


  ngAfterViewInit() {
    this.r5Service.getR5Result()
    .subscribe( r5finalresult => this.dataSource.data = r5finalresult);
  }


}
