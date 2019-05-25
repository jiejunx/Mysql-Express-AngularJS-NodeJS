import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Util } from './util';
import { Observable } from 'rxjs';
import { r6year } from './r6_definitions';
import { r6month } from './r6_definitions';
import { r6result, r6detail } from './r6_definitions';
import { tap, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class R6Service {

  private r6URLyear = 'http://localhost:3000/r6/year';
  private r6URLmonth = 'http://localhost:3000/r6/month';
  private r6URL = 'http://localhost:3000/r6';


  constructor(private http:HttpClient, private util: Util) { }

   /** Report 4 - all states*/
   getR6yearResult(): Observable<r6year[]> {
    return this.http.get<r6year[]>(this.r6URLyear)
    .pipe(
      tap(_ => this.util.log('fetched all available year month')),
      catchError(this.util.handleError<r6year[]>())
    );
  }

  getR6monthResult(): Observable<r6month[]> {
    return this.http.get<r6month[]>(this.r6URLmonth)
    .pipe(
      tap(_ => this.util.log('fetched all available year month')),
      catchError(this.util.handleError<r6month[]>())
    );
  }



      /** Report 6-by year month */
    getR6YearMonth(year: String, month: String): Observable<r6result[]> {


      const suburl = year + '&' + month;

      const r6ymURL = `${this.r6URL}/${suburl}`;
      console.log(r6ymURL);

      console.log("GET: " + r6ymURL);

      return this.http.get<r6result[]>(r6ymURL)
      .pipe(
        tap(_ => this.util.log('fetched state result')),
        catchError(this.util.handleError<r6result[]>())
      );
    }


      /** GET top drill down detail summary for a  manufacturer from server */
  getDetail(year: string, month: string, State: string, CatName: string ): Observable<r6detail[]> {
    const suburl = year + '&' + month;

    const url = `${this.r6URL}/${suburl}/${State}/${CatName.replace(/ /g, '_')}`;
    console.log("GET: " + url);
    return this.http.get<r6detail[]>(url)
    .pipe(
      tap(_ => this.util.log("fetching Mfgr summary")),
      catchError(this.util.handleError<r6detail[]>(`getMfgrSummaryDD id=${State}`))
    )
  }
}

