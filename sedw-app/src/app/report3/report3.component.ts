import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { R3Service } from '../r3.service';

@Component({
  selector: 'app-report3',
  templateUrl: './report3.component.html',
  styleUrls: ['./report3.component.css']
})
export class Report3Component implements OnInit {

  displayedColumns: string[] = ['PID', 'ProductName', 'Avg_RetailPrice', 'Total_Quantity',
  'Total_DiscountQuantity', 'Total_Actual','Actual_revenue', 'Pred_revenue', 'Diff'];

  dataSource = new MatTableDataSource();

  constructor(private r3Service: R3Service) { }

  ngOnInit() {
    this.r3Service.getR3Result()
    .subscribe(manufacturers => this.dataSource.data = manufacturers);
  }

}
