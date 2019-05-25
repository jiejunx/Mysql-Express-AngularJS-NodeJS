import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Util } from './util';
import { Observable } from 'rxjs';
import { r4result, r4stateResult } from './r4_definitions';
import { tap, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class R4Service {

  private r4URL = 'http://localhost:3000/r4'

  constructor(private http:HttpClient, private util: Util) { }

      /** Report 4 - all states*/
      getR4Result(): Observable<r4result[]> {
      return this.http.get<r4result[]>(this.r4URL)
      .pipe(
        tap(_ => this.util.log('fetched all states')),
        catchError(this.util.handleError<r4result[]>())
      );
    }

        /** Report 4-by state */
    getR4stateResult(stateName: string): Observable<r4stateResult[]> {
      const r4stateURL = `${this.r4URL}/${stateName}`;

      console.log("GET: " + r4stateURL);

      return this.http.get<r4stateResult[]>(r4stateURL)
      .pipe(
        tap(_ => this.util.log('fetched state result')),
        catchError(this.util.handleError<r4stateResult[]>())
      );
    }
}
