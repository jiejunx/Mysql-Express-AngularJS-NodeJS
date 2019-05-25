import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Util } from './util';
import { Observable } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { r7result } from './r7_definitions';

@Injectable({
  providedIn: 'root'
})
export class R7Service {

  private r7URL = 'http://localhost:3000/r7';

  constructor(private http:HttpClient, private util: Util) { }



  /** Report 5 */
  getR7Result(): Observable<r7result[]> {
    return this.http.get<r7result[]>(this.r7URL)
    .pipe(
      tap(_ => this.util.log('fetched all states')),
      catchError(this.util.handleError<r7result[]>())
    );
  }
}



