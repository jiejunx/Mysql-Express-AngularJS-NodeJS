import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styleUrls: ['./sidenav-list.component.css']
})
export class SidenavListComponent implements OnInit {
  @Output() sidenavClose = new EventEmitter();

  constructor(private router: Router) { }

  ngOnInit() {
    this.router.events.subscribe(
      val =>  {
        if(val instanceof NavigationEnd) {
          if(val.urlAfterRedirects.startsWith('/r')){
              // console.log(val.urlAfterRedirects)
          } 
        }
      }
    )
  }

  public onSidenavClose = () => {
    this.sidenavClose.emit();
  }

}