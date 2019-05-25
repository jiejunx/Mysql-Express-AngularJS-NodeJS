import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { ScrollToConfigOptions, ScrollToService } from '@nicky-lenaers/ngx-scroll-to';

const report_titles = [
  'Report 1: View Top 100 Manufacturers',
  'Report 2: View Categories and Details',
  'Report 3: View a Category’s Product with Actual and Predicted Revenue Greater Than Certain Amount',
  'Report 4: View Revenue by State by Year',
  'Report 5: View year-Round vs Groundhog Day Sales, by Year',
  'Report 6: State with Highest Volume for Each Category',
  'Report 7: View Revenue by Population'
]

const action_titles = [
  'View/Add Holiday',
  'Add/Remove Manager',
  'Update City Population'
]


 
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
 
  @Output() public sidenavToggle = new EventEmitter();

  icon = 'menu'
  header_text='SEDW APP'
  page_type = 'home'


 
  constructor(private router: Router) { }
 
  ngOnInit() {
    this.router.events.subscribe(
      val =>  {
        
        if(val instanceof NavigationEnd) {
          if(val.urlAfterRedirects.startsWith('/r')){
              this.icon = 'arrow_back'
              this.header_text = report_titles[ parseInt(val.urlAfterRedirects[2]) - 1]
              this.page_type = 'report'
          } 
          else if (val.urlAfterRedirects.startsWith('/a')) {
            this.icon = 'arrow_back'
            this.header_text = action_titles[parseInt(val.urlAfterRedirects[2]) - 1]
            this.page_type = 'action'
          }
          else {
            this.icon = 'menu'
            this.header_text = 'SEDW APP'
          }
        }
      }
    )
  }
 
  public onToggleSidenav = () => {
    if(this.icon == 'arrow_back') {
      if(this.page_type == 'report')
        this.router.navigate(['home/reports'])
      else
        this.router.navigate(['home/actions'])
    }
    else
      this.sidenavToggle.emit();
  }

  changePath() {
    console.log("sd")
  }
 
}