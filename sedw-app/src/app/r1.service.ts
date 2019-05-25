import { Injectable } from '@angular/core';
import { Observable} from 'rxjs';
import { catchError, tap} from 'rxjs/operators';
import { TopManufacturer, MfgrProductListDD } from './r1_definitions'
import { HttpClient } from '@angular/common/http';
import { MfgrSummaryDD } from './r1_definitions';
import { Util } from './util';

@Injectable({
  providedIn: 'root'
})
export class R1Service {

  private report1URL = 'http://localhost:3000/r1'

  constructor(private http:HttpClient, private util: Util) { }

  /** GET top 100 manufacturers from server */
  getTop100(): Observable<TopManufacturer[]> {
    return this.http.get<TopManufacturer[]>(this.report1URL)
    .pipe(
      tap(_ => this.util.log('fetched top 100 manufacturers')),
      catchError(this.util.handleError<TopManufacturer[]>())
    )
  }

  /** GET top drill down detail summary for a  manufacturer from server */
  getMfgrSummaryDD(MfgrName: string): Observable<MfgrSummaryDD> {

    const url = `${this.report1URL}/summary/${MfgrName.replace(/ /g, '_')}`
    console.log("GET: " + url)
    return this.http.get<MfgrSummaryDD>(url)
    .pipe(
      tap(_ => this.util.log("fetching Mfgr summary")),
      catchError(this.util.handleError<MfgrSummaryDD>(`getMfgrSummaryDD id=${MfgrName}`))
    )
  }

  /** GET product list for a manufacturer from server */
  getMfgrProductListDD(MfgrName: string) {
    const url = `${this.report1URL}/plist/${MfgrName.replace(/ /g, '_')}`
    console.log("GET: " + url)
    return this.http.get<MfgrProductListDD[]>(url)
    .pipe(
      tap(_ => this.util.log("fetching product list")),
      catchError(this.util.handleError<MfgrProductListDD[]>(`getMfgrProductListDD id ${MfgrName}`))
    )
  }
}



