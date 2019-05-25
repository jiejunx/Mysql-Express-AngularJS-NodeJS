import { Component, OnInit, AfterViewInit, Inject } from '@angular/core';
import { R1Service } from '../r1.service';
import { Store } from '../store';
import { TopManufacturer } from '../r1_definitions';
import { MatTableDataSource } from '@angular/material/table';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material'
import { MfgrSummaryDD } from '../r1_definitions';

@Component({
  selector: 'app-report1',
  templateUrl: './report1.component.html',
  styleUrls: ['./report1.component.css']
})

export class Report1Component implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['Position','MfgrName', 'Total_Pid', 
  'Average_Price', 'Min_Price', 'Max_Price', "Detail"];
  dataSource = new MatTableDataSource();

  constructor(private r1Service: R1Service,
    public dialog: MatDialog) { }

  ngOnInit() {

  }

  ngAfterViewInit() {
    this.r1Service.getTop100()
    .subscribe(manufacturers => this.dataSource.data = manufacturers)
  }

  openDialog(MfgrName: string) {
    console.log("clicked!" + MfgrName)
    this.r1Service.getMfgrSummaryDD(MfgrName)
    // .subscribe(summary => console.log("Here: " + summary[0].MfgrName))
    .subscribe(summary =>  this.dialog.open(DD1Dialog,{
      data: summary[0],
      width : '1200px'
    }))
  }
}

@Component({
  selector: 'dd1_dialog',
  templateUrl: 'dd1_dialog.html',
  styleUrls: ['./dd1_dialog.css']
})
export class DD1Dialog {
  constructor(@Inject(MAT_DIALOG_DATA) public data: MfgrSummaryDD,
  public r1Service: R1Service) {}
  dataSource = new MatTableDataSource();
  displayedColumns: string[] = ['MfgrName', 'PID', 
  'ProductName', 'CatNames', 'RetailPrice'];


  ngAfterViewInit() {
    this.r1Service.getMfgrProductListDD(this.data.MfgrName)
    .subscribe(plist => this.dataSource.data= plist)
  }
}
