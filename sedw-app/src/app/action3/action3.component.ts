import { Component, OnInit, EventEmitter } from '@angular/core';
import { A3Service } from '../a3.service';
import { MatSelectChange, MatDialog } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { FormControl, Validators } from '@angular/forms';






@Component({
  selector: 'app-action3',
  templateUrl: './action3.component.html',
  styleUrls: ['./action3.component.css']
})
export class Action3Component implements OnInit {

  cityList: string[];
	stateList: string[];

  selectedCity: string;
  selectedState: string;
  isPopulationUpdated: boolean;
  updatedPopulation: number;

  popFormControl = new FormControl('', Validators.compose([Validators.required, Validators.pattern('^[0-9]*$'), Validators.maxLength(9)]));


  submitted = false;
  updated = false;


  confirmText = 'Confirm'
  backText = 'Back'


  isCitySelected = false;
  isStateSelected = false;
  data: Object[];
	displayedColumns: string[] = ['CityName','State','Population'];

  constructor(private a3Service: A3Service,
    public dialog: MatDialog) { }

  ngOnInit() {
    this.a3Service.getCityList()
    .subscribe(
      cities => this.cityList = cities
    )
    this.a3Service.getStateList()
    .subscribe (
      states => this.stateList = states
    )

  }


  getPopInputErrorMessage() {
   
    // if(JSON.stringify(this.popFormControl.errors).includes('maxLength')) {
    //   return "Population exceeds limit"
    // }
    if(this.popFormControl.hasError('maxlength')) {
     
      return "Population exceeds limit"
    }
    return this.popFormControl.hasError('required') ? 'You must enter the population' :

    ''
  }

  numericOnly(event): boolean {    
    let patt = /^([0-9])$/;
    let result = patt.test(event.key);
    return result;
  }

  onCitySelected($event: EventEmitter<MatSelectChange>) {
    this.isCitySelected = true;
    this.a3Service.getStateForCityList(this.selectedCity)
    .subscribe(
      states_of_city => {
        console.log("state of city " + states_of_city)
        this.stateList = states_of_city
      }
    )
  }

  fetchPopulation() {
    if(!this.isStateSelected || !this.isCitySelected) {
      this.dialog.open(EDialog)
    }
    else {
      this.a3Service.getPopulation(this.selectedCity, this.selectedState)
      .subscribe (population=> {
        this.data = population;
        }
      )
    }
  }

  next2() {
    this.submitted = true;
  }
  


  onStateSelected($event: EventEmitter<MatSelectChange>) {
    this.isStateSelected = true;
    this.a3Service.getCityForStateList(this.selectedState)
    .subscribe(
      cities_of_state => {
        console.log("state of city " + cities_of_state)
        this.cityList = cities_of_state
      }
    )
  }

  confirmChanges() {
    this.updated = true;
    this.a3Service.updatePopulation (
      this.selectedCity, this.selectedState, this.updatedPopulation
    )
    .subscribe(
      response => {
        this.backText = "Start Over"
        if(response.toString().length > 0) {
          this.confirmText = "Success!"
        }
        else {
          this.confirmText = "Failed!"
        }
      }
    )

  }

  // getPopulation() {
    
  // }

  back3() {
    if(this.updated) {
      this.resetSelection()
    }
    else {
    this.submitted= false;
    }
  }

  resetSelection() {


    this.confirmText = 'Confirm'
    this.backText = 'Back'
    this.submitted = false;
    this.updated = false;
    this.isCitySelected = false;
    this.isStateSelected = false;
    this.selectedCity = null;
    this.selectedState = null;
    this.data = null;
    this.submitted = false;
    this.updatedPopulation = null;
    this.a3Service.getCityList()

    .subscribe(
      cities => this.cityList = cities
    )
    this.a3Service.getStateList()
    .subscribe (
      states => this.stateList = states
    )
    
  }

}



@Component({
  selector: 'e_dialog',
  templateUrl: 'e_dialog.html',
})
export class EDialog {
  constructor() {}



  ngAfterViewInit() {

  }
}

