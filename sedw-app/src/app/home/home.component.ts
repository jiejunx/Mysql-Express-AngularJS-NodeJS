import { Component, OnInit } from '@angular/core';
import { CountUpOptions } from 'countup.js';
import { HpService } from '../hp.service';
import { Statistics, StatTile, ActionTile, ReportTile } from '../hp_definitions';
import { Router, NavigationEnd } from '@angular/router';
import { ScrollToService, ScrollToConfigOptions } from '@nicky-lenaers/ngx-scroll-to';

const config_reports: ScrollToConfigOptions = {
  target: '#reports_card',
  offset: 1000
};

const config_actions: ScrollToConfigOptions = {
  target: '#actions_card',
  offset: 420
};


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {


  endVal: number;
  opts: CountUpOptions;

  useOptions() {
    this.opts = {
      decimalPlaces: 0,
      separator: ',',
      duration: 2
    };
  }

  unsetOptions() {
    this.opts = null;
  }



  stat_tiles: StatTile[] = [
    {text: 'Stores', cols: 1, rows: 2, color: 'gray', endVal: 0},
    {text: 'Products', cols: 1, rows: 2, color: 'gray', endVal: 0},
    {text: 'Manufacturers', cols: 1, rows: 2, color: 'gray', endVal: 0},
    {text: 'Managers', cols: 1, rows: 2, color: 'gray', endVal: 0},
  ];

  action_tiles: ActionTile[] = [
    {text: 'View/Add Holiday', cols: 1, rows: 2, color: '#424242', icon:"calendar_today", link: "a1"},
    {text: 'Add/Remove Manager', cols: 1, rows: 2, color: '#424242',  icon:"assignment_ind", link: "a2"},
    {text: 'Update Population', cols: 2, rows: 2, color: '#424242', icon:'group icon', link: "a3"},
  ]



  report_tiles: ReportTile[] = [
    {text: '1. View Top 100 Manufacturers', cols: 1, rows: 2, color: '#424242',  icon:"assessment", link:"r1"},
    {text: '2. View Categories and Details', cols: 1, rows: 2, color: '#424242',  icon:"assessment", link:"r2"},
    {text: '3. Actual & Predicted Rev for GPS', cols: 1, rows: 2, color: '#424242', icon:"assessment", link:"r3"},
    {text: '4. View Revenue by State by Year', cols: 1, rows: 2, color: '#424242', icon:"assessment", link:"r4"},
    {text: '5. View Groundhog Day Sales', cols: 1, rows: 2, color: '#424242',  icon:"assessment", link:"r5"},
    {text: '6. View State with Highest Volume', cols: 1, rows: 2, color: '#424242',  icon:"assessment", link:"r6"},
    {text: '7. View Revenue By Population', cols: 2, rows: 2, color: '#424242', icon:"assessment", link:"r7"},

  ]


  constructor(private hpService: HpService, private router: Router, private _scrollToService: ScrollToService) { }

  ngOnInit() {
    this.useOptions()
    this.hpService.getStatistics()
    .subscribe(
      stats => this.setStats(stats)
    )

    this.router.events.subscribe(
      val =>  {
        if(val instanceof NavigationEnd) {
          if(val.url.endsWith('reports')) {
            this._scrollToService.scrollTo(config_reports)
          }
          else if(val.url.endsWith('actions')) {
            console.log('actions')
            this._scrollToService.scrollTo(config_actions)
          }
        }
      }
    )
  }

  setStats(stats: Statistics) {
    console.log(JSON.stringify(stats[0]))
    this.stat_tiles[0].endVal = stats[0].count_store
    this.stat_tiles[1].endVal = stats[1].count_pid
    this.stat_tiles[2].endVal = stats[2].count_mfgr
    this.stat_tiles[3].endVal = stats[3].count_manager
  }

  ngAfterInit() { }


}
