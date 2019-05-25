import { Component, OnInit } from '@angular/core';
import { A1Service } from '../a1.service';
import { DatePipe } from '@angular/common'
import { ErrorDialogData } from '../commons_ed_definitions';
import { MatDialog } from '@angular/material';
import { ErrorDialogComponent } from '../commons/error-dialog/error-dialog.component';
import { ScrollToService, ScrollToConfigOptions } from '@nicky-lenaers/ngx-scroll-to';


const config_remove: ScrollToConfigOptions = {
  target: '#remove_card',

};


@Component({
  selector: 'app-action1',
  templateUrl: './action1.component.html',
  styleUrls: ['./action1.component.css']
})
export class Action1Component implements OnInit {

  data: Object[];
  displayedColumns: string[] = ['Date', 'HolidayName'];
  newDate: Date;
  newHolidayName: string;

  SUCCESS_INSERT_MESSAGE = "Successfully inserted a new holiday record!"
  SUCCESS_UPDATE_MESSAGE = "Successfully updated the holiday record!"
  

  constructor(private a1Service: A1Service,
    private datepipe: DatePipe,
    public dialog: MatDialog,
    private _scrollToService: ScrollToService) { }

  ngOnInit() {
    this.getHolidays()
  }

  getHolidays() {
    this.a1Service.getHolidays()
      .subscribe(
        data => this.data = data
      )
  }

  addHoliday() {
    // console.log(this.datepipe.transform(this.newDate, 'yyyy-MM-dd'))
    this.a1Service.addHoliday(this.datepipe.transform(this.newDate, 'yyyy-MM-dd').toString()
      , this.newHolidayName)
      .subscribe(
        response => {
          this.newHolidayName = null
          var node_response = JSON.stringify(response)
          console.log(node_response)
          if (node_response.includes(this.SUCCESS_INSERT_MESSAGE) 
          || node_response.includes(this.SUCCESS_UPDATE_MESSAGE)) {
            this.newDate = null
            this.newHolidayName = null
            this.getHolidays()

            var errorDialogData = new ErrorDialogData()
            errorDialogData.dialog_title = "Success"
            errorDialogData.dialog_icon = "sentiment_satisfied_alt"
            errorDialogData.dialog_content = "Holiday has been added"
            errorDialogData.dialog_action_1_name = "Ok"
            
            // document.querySelector('mat-table').scrollBy(0, 10000)
          }
          else {
            var errorDialogData = new ErrorDialogData()
            errorDialogData.dialog_title = "Failed!"
            errorDialogData.dialog_icon = "priority_high"
            errorDialogData.dialog_content = "Cannot add holiday as it already exists!"
            errorDialogData.dialog_action_1_name = "Ok"
          }
          this.dialog.open(ErrorDialogComponent, {
            data: errorDialogData,
            width: '300px',
            height: '200px',
            position: { top: '20px' }
          },
          )
        },
        err => {
          console.log(err);
        }
      )
  }

}

@Component({
  selector: 'he_dialog',
  templateUrl: 'he_dialog.html',
})
export class EDialog {
  constructor() { }



  ngAfterViewInit() {

  }
}
