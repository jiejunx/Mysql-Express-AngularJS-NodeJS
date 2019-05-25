import { Component, OnInit, AfterViewInit } from '@angular/core';
import { R2Service } from '../r2.service';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-report2',
  templateUrl: './report2.component.html',
  styleUrls: ['./report2.component.css']
})
export class Report2Component implements OnInit, AfterViewInit {

  displayedColumns: string[] = ['CatName', 'Prod_count', 'Mf_count', 'Average_Price'];

  dataSource = new MatTableDataSource();

  constructor(private r2Service: R2Service) { }

 ngAfterViewInit() {
    this.r2Service.getCategory()
    .subscribe(manufacturers => this.dataSource.data = manufacturers);
  }
  

  ngOnInit() {
  }

}
