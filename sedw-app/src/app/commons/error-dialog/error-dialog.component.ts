import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
import { MfgrProductListDD } from 'src/app/r1_definitions';
import { ErrorDialogData } from 'src/app/commons_ed_definitions';

@Component({
  selector: 'app-error-dialog',
  templateUrl: './error-dialog.component.html',
  styleUrls: ['./error-dialog.component.css']
})
export class ErrorDialogComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: ErrorDialogData) { }

  ngOnInit() {
  }

}
