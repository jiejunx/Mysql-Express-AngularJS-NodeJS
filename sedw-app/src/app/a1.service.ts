import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Util } from './util';
import { tap, catchError } from 'rxjs/operators';



@Injectable({
  providedIn: 'root'
})
export class A1Service {

  url = "http://localhost:3000/holiday";

  constructor(private http:HttpClient, private util: Util) { }


  getHolidays(): Observable<Object[]> {
    return this.http.get<Object[]>(this.url)
    .pipe(
      tap(_ => this.util.log('fetching holidays')),
      catchError(this.util.handleError<Object[]>())
    )
  }

  addHoliday(date: string, holiday_name: string): Observable<any> {
    console.log(date)
    const httpParams = new HttpParams().set('holidaydate', date).set('holidayname', holiday_name)
    const httpOptions = {
      params: httpParams
    }
    return this.http.post<any>(this.url, null, httpOptions)
    .pipe(
      tap(_ => this.util.log('adding holiday')),
      catchError(this.util.handleError<any>())
    )
  }
}
