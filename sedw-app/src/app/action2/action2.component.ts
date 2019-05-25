import { Component, OnInit, EventEmitter } from '@angular/core';
import { A2Service } from '../a2.service';
import { MatSelectChange, MatDialog, MatTableDataSource } from '@angular/material';
import { Observable, of } from 'rxjs';
import { FormControl, Validators } from '@angular/forms';
import { startWith, map, tap } from 'rxjs/operators';
import { ErrorDialogComponent } from '../commons/error-dialog/error-dialog.component';
import { ErrorDialogData } from '../commons_ed_definitions';
import { ScrollToService, ScrollToConfigOptions } from '@nicky-lenaers/ngx-scroll-to';


const config_remove: ScrollToConfigOptions = {
  target: '#remove_card',

};


export class NewManagerDisplay {
  ManagerName: string;
  Email: string;
}
export class StoreIDDisplay {
  StoreNumber: string;
  ActiveManagerEmail: string;
  MatIcon: string;
}

@Component({
  selector: 'app-action2',
  templateUrl: './action2.component.html',
  styleUrls: ['./action2.component.css']
})
export class Action2Component implements OnInit {


  /**
   * MAIN
   */

  nameList: string[]
  emailList: string[];

  /** Card 1 */
  selectedName: string
  selectedEmail: string;
  inactiveNameList: string[];
  inactiveEmailList: string[];
  managerToUnassignList: string[];
  storeToUnassignList: string[];
  card1validator = false
  namevalidator = false
  card1data: Object[];
  filteredNames: Observable<string[]>;
  filteredEmails: Observable<string[]>;
  card1NameControl = new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z ]*')]);
  card1EmailControl = new FormControl('', [Validators.required, Validators.email]);
  displayedColumns: string[] = ['Email', 'ManagerName', 'Status'];
  selectedManagerIsActive = false;



  remove_option_selected = false;
  unassign_option_selected = false;
  assign_option_selected = false;



  /** Card 2 */

  card2NameControl = new FormControl('', [Validators.required,  Validators.pattern('[a-zA-Z ]*')]);
  card2EmailControl = new FormControl('', [Validators.required, Validators.email]);

  addedName: string;
  addedEmail: string;
  add_btn_pressed = false
  shouldStartOver = false
  submitted = false;
  card2data = null;
  card2DisplayColumns: string[] = ['Email', 'ManagerName'];

  CARD2ERROR = "Show error dialog: The manager already exists!"

  /** Card 3 */

  rmv_btn_pressed = false
  rmv_shouldStartOver = false
  rmv_submitted = false;
  card3data = null;
  card3DisplayColumns: string[] = ['Email', 'ManagerName'];

  CARD3SUCCESS = "Deleted the InactiveManager!"



  /** Card Unassign */

  unassignDisplayColumns: string[] = ['StoreNumber', 'ActiveManagerEmail', 'MatIcon'];
  cardUnassignData = null


  /** Card Assign */


  assignDisplayColumns: string[] = ['StoreNumber', 'StreetAddress', 'CityName', 'State', 'MatIcon'];
  storeList = null

  assign_disabled = false

  selectedStoreNumber = null;

  storeIdControl = new FormControl()

  ASSIGN_ALREADY_EXISTS = "The assignment already exists in the system!"

  ASSIGNERROR = "Error: the store doesn't exist! Please enter the correct store number."







  constructor(private a2Service: A2Service,
    public dialog: MatDialog,
    private _scrollToService: ScrollToService) { }

  ngOnInit() {
    /** Card 1 */
    this.getAllManagers()
    this.getUnassignableManagersWithStores()
    /** Card 2 */

    /** Card 3 */
    this.getInactiveManagers()

    this.storeIdControl.disable({ onlySelf: true })


  }

  /** Card 1 - View Manager Status*/


  getC1NameErrorMessage() {
    return this.card1NameControl.hasError('required') ? 'You must select a valid entry from the list' : '';
  }

  getC1EmailErrorMessage() {
    return this.card1EmailControl.hasError('required') ? 'You must select a valid entry from the list' :
      this.card1EmailControl.hasError('email') ? 'Not a valid email' :
        '';
  }

  onNameItemSelected(name: string) {
    this.selectedName = name
    this.card1NameControl.disable()
  }

  onEmailItemSelected(email: string) {
    this.selectedEmail = email
    this.card1EmailControl.disable()
  }

  private _filter_names(value: string): string[] {
    if (value != null) {
      const filterValue = value.toLowerCase()
      return this.nameList.filter(name => name.toLowerCase().includes(filterValue))
    }
    else
      return ['']


  }

  private _filter_emails(value: string): string[] {
    if (value != null) {
      const filterValue = value.toLowerCase()
      return this.emailList.filter(email => email.toLowerCase().includes(filterValue))
    }
    else
      return ['']

  }

  searchManager() {
    this.a2Service.searchManager(this.selectedName, this.selectedEmail).
      subscribe(response => {
        this.card1data = response
        // getting all stores
        this.a2Service.getStoreList().subscribe(response =>
          this.storeList = new MatTableDataSource(response))
        if (JSON.stringify(this.card1data[0]).includes("Inactive")) {
          this.selectedManagerIsActive = false
        }
        else {
          this.selectedManagerIsActive = true
        }
      })
  }

  setUpNameFilter() {
    this.filteredNames = this.card1NameControl.valueChanges
      .pipe(
        tap(value => {
          if (this.nameList.includes(value)) {

            this.a2Service.lookupManagerName(value).subscribe(response => {
              this.filteredEmails = of(response.map(a => a.Email))
            })
            this.selectedName = value
          }
          else {

            this.selectedName = ""
            this.card1NameControl.setErrors({ required: true })
            this.filteredEmails = of(this.emailList)
          }
        }),
        startWith(''),
        map(value => this._filter_names(value)),
      )


  }


  setUpEmailFilter() {
    this.filteredEmails = this.card1EmailControl.valueChanges
      .pipe(
        tap(value => {
          if (this.emailList.includes(value)) {
            this.a2Service.lookupManagerEmail(value).subscribe(response => {
              this.filteredNames = of(response.map(a => a.ManagerName))
            })
            this.selectedEmail = value
          }
          else {
            this.selectedEmail = ""
            this.filteredNames = of(this.nameList)
            this.card1EmailControl.setErrors({ required: true })
          }
        }),
        startWith(''),
        map(value => this._filter_emails(value)),
      )
  }


  getAllManagers() {
    this.a2Service.getAllName()
      .subscribe(response => {
        this.nameList = response.map(a => a.ManagerName)
        this.setUpNameFilter()
      })
    this.a2Service.getAllEmail()
      .subscribe(response => {
        this.emailList = response.map(a => a.Email)
        this.setUpEmailFilter()
      })

  }

  getInactiveManagers() {
    this.a2Service.getInactiveEmail()
      .subscribe(response => this.inactiveEmailList = response)
    this.a2Service.getInactiveName()
      .subscribe(response => this.inactiveNameList = response)
  }

  getUnassignableManagersWithStores() {
    this.a2Service.getUnassignManagerStoreList()
      .subscribe(response => {
        this.managerToUnassignList = response[0]
        this.storeToUnassignList = response[1]
      })
  }


  onEmailSelect($event: EventEmitter<MatSelectChange>): void {
    this.card1validator = true
  }

  resetCard1() {
    this.card1NameControl.reset()
    this.card1EmailControl.reset()
    this.card1data = null
    this.selectedEmail = null
    this.selectedName = null
    this.card1NameControl.enable()
    this.card1EmailControl.enable()
    this.getAllManagers()
    this.getUnassignableManagersWithStores()
  }


  copyOver(option: number) {
    if (option == 1) {
      this.unassign_option_selected = true;
      this.unassignManagerPreview()
    }
    else if (option == 2) {
      this.remove_option_selected = true;
      this.rmvManagerPreview()
    }
    else if (option == 3) {
      this.assign_option_selected = true
    }
  }


  /** Card 2 - Add Manager*/



  getC2NameErrorMessage() {

    return this.card2NameControl.hasError('required') ? 'You must enter a valid name' :
    this.card2NameControl.hasError('pattern') ? "You must enter a valid name" :
      this.card2NameControl.hasError('length') ? "too long" : '';
  }

  getC2EmailErrorMessage() {
    return this.card2EmailControl.hasError('required') ? 'You must enter a valid email' :
      this.card2EmailControl.hasError('email') ? 'Not a valid email' :
        ''
  }


  addManagerPreview() {

    var card2data = [
      { "ManagerName": "place", "Email": "place" }
    ]
    this.card2data = card2data
    card2data[0].Email = this.addedEmail
    card2data[0].ManagerName = this.addedName
    this.add_btn_pressed = true;
    this.shouldStartOver = true;

  }

  addManager() {
    this.submitted = true;

    this.a2Service.addManager(this.addedName, this.addedEmail)
      .subscribe(response => {
        var node_response = response.message
        if (node_response != this.CARD2ERROR) {
          console.log(response)
          var errorDialogData = new ErrorDialogData()
          errorDialogData.dialog_title = "Success!"
          errorDialogData.dialog_icon = "sentiment_satisfied_alt"
          errorDialogData.dialog_content = "Manager has been added"
          errorDialogData.dialog_action_1_name = "Ok"
          /** Refresh card 1 & 3 */
          this.resetCard1()
        }
        else {
          var errorDialogData = new ErrorDialogData()
          errorDialogData.dialog_title = "Error!"
          errorDialogData.dialog_icon = "error_outline"
          errorDialogData.dialog_content = "This manager already exists"
          errorDialogData.dialog_action_1_name = "Ok"
        }

        this.dialog.open(ErrorDialogComponent, {
          data: errorDialogData,
          width: '300px',
          height: '200px',
          position: { top: '20px' }
        },
        )
      })
  }


  resetCard2() {
    this.card2EmailControl.reset()
    this.card2NameControl.reset()
    this.addedEmail = null
    this.addedName = null
    this.card2data = null
    this.add_btn_pressed = false
    this.submitted = false;
    this.shouldStartOver = false
  }



  /** Card 3 - Remove Manager */





  rmvManagerPreview() {
    var card3data = [
      { "ManagerName": "place", "Email": "place" }
    ]

    this.card3data = card3data
    this.card3data[0].Email = this.selectedEmail
    this.card3data[0].ManagerName = this.selectedName
    this.rmv_btn_pressed = true;
    this.rmv_shouldStartOver = true;
  }

  removeManager() {
    this.rmv_submitted = true;
    this.a2Service.removeManager(this.selectedName, this.selectedEmail)
      .subscribe(response => {
        var node_response = response.message
        console.log(node_response)
        if (node_response.includes(this.CARD3SUCCESS)) {
          console.log(response)
          var errorDialogData = new ErrorDialogData()
          errorDialogData.dialog_title = "Success!"
          errorDialogData.dialog_icon = "sentiment_satisfied_alt"
          errorDialogData.dialog_content = "Deleted the Inactive Manager"
          errorDialogData.dialog_action_1_name = "Ok"

          /** Refresh card 1 & 2 */
        }
        else {
          // var errorDialogData = new ErrorDialogData() 
          // errorDialogData.dialog_title = "Error!"
          // errorDialogData.dialog_icon = "error_outline"
          // errorDialogData.dialog_content = "This manager already exists"
          // errorDialogData.dialog_action_1_name = "Ok"
          // this.rmv_cnf_btn_name = "Failure!"
          // this.dialog.open(ErrorDialogComponent,{
          //   data: errorDialogData,
          //   width: '300px',
          //   height: '200px',
          //   position: {top: '20px'}
          // },
          // )
        }


        this.dialog.open(ErrorDialogComponent, {
          data: errorDialogData,
          width: '300px',
          height: '200px',
          position: { top: '20px' }
        },
        )
      })
  }


  resetRemoveCard() {
    this.resetCard1()
    this.remove_option_selected = false
    this.card3data = null
    this.rmv_btn_pressed = false
    this.rmv_submitted = false;
    this.rmv_shouldStartOver = false
  }

  /** Card Unassign */

  unassignManagerPreview() {
    this.a2Service.getManagerStoreList(this.selectedEmail)
      .subscribe(response => this.cardUnassignData = response)
  }

  unassignManager(element: StoreIDDisplay) {
    this.a2Service.unassignManager(this.selectedEmail, element.StoreNumber).subscribe(
      response => {
        var node_response = JSON.stringify(response)
        if (node_response.includes("Success: the manager has been unassigned from the store!")) {
          var errorDialogData = new ErrorDialogData()
          errorDialogData.dialog_title = "Success!"
          errorDialogData.dialog_icon = "sentiment_satisfied_alt"
          errorDialogData.dialog_content = "Manager has been unassigned from the store!"
          errorDialogData.dialog_action_1_name = "Done"

          this.dialog.open(ErrorDialogComponent, {
            data: errorDialogData,
            width: '300px',
            height: '200px',
            position: { top: '20px' }
          },
          )
        }
        this.resetUnassign()
      }
    )
  }

  resetUnassign() {
    this.resetCard1()
    this.unassign_option_selected = false
    this.assign_option_selected = false
    this.remove_option_selected = false
  }



  /** Card Assign */


  resetAssign() {
    this.resetCard1()
    this.assign_disabled = false;
    this.unassign_option_selected = false
    this.assign_option_selected = false
    this.remove_option_selected = false
  }



  applyFilter(filterValue: string) {
    this.storeList.filter = filterValue.trim().toLowerCase()
  }

  copyStoreNumber(storeNumber: string) {
    this.selectedStoreNumber = storeNumber
    this.storeIdControl.setValue(storeNumber)

  }

  assignManager() {
    this.assign_disabled = true
    this.a2Service.assignManager(this.selectedEmail, this.selectedStoreNumber).subscribe(
      response => {
        console.log(response)
        var node_response = JSON.stringify(response)
        if (node_response.includes(this.ASSIGN_ALREADY_EXISTS)) {
          var errorDialogData = new ErrorDialogData()
          errorDialogData.dialog_title = "Failed"
          errorDialogData.dialog_icon = "priority_high"
          errorDialogData.dialog_content = "Manager already assigned to the store"
          errorDialogData.dialog_action_1_name = "Ok"
        }
        else if (node_response.includes(this.ASSIGNERROR)) {
          var errorDialogData = new ErrorDialogData()
          errorDialogData.dialog_title = "Failed"
          errorDialogData.dialog_icon = "priority_high"
          errorDialogData.dialog_content = "The store doesn't exist! Please enter the correct store number."
          errorDialogData.dialog_action_1_name = "Ok"
        }
        else {
          var errorDialogData = new ErrorDialogData()
          errorDialogData.dialog_title = "Success!"
          errorDialogData.dialog_icon = "sentiment_satisfied_alt"
          errorDialogData.dialog_content = "Manager has been assigned"
          errorDialogData.dialog_action_1_name = "Ok"
        }
        this.dialog.open(ErrorDialogComponent, {
          data: errorDialogData,
          width: '300px',
          height: '200px',
          position: { top: '20px' }
        },
        )
      }
    )
  }

}
