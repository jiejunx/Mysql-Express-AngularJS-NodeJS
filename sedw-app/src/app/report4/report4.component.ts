import { Component, OnInit } from '@angular/core';
import { r4result, r4stateResult } from '../r4_definitions';
import { MatTableDataSource } from '@angular/material';
import { R4Service } from '../r4.service';

@Component({
  selector: 'app-report4',
  templateUrl: './report4.component.html',
  styleUrls: ['./report4.component.css']
})
export class Report4Component implements OnInit {

  states: r4result[];
  value: string;
  stateResult: r4stateResult[];
  displayedColumns: string[] = ['StoreNumber', 'StreetAddress', 'CityName', 'Year', 'TotRevenue'];



  dataSource = new MatTableDataSource();


  constructor(private r4Service: R4Service) { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.r4Service.getR4Result()
    .subscribe(states => this.states = states);
  }

  anotherMethod(state: string) {
      console.log('You selected: ' , state);
      this.r4Service.getR4stateResult(state)
     .subscribe(r4stateresult => this.dataSource.data = r4stateresult);

  }

}
