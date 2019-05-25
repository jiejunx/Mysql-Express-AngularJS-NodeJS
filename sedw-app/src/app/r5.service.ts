import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Util } from './util';
import { Observable } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { r5result } from './r5_definitions';

@Injectable({
  providedIn: 'root'
})
export class R5Service {

  private r5URL = 'http://localhost:3000/r5';

  constructor(private http:HttpClient, private util: Util) { }



  /** Report 5 */
  getR5Result(): Observable<r5result[]> {
    return this.http.get<r5result[]>(this.r5URL)
    .pipe(
      tap(_ => this.util.log('fetched all states')),
      catchError(this.util.handleError<r5result[]>())
    );
  }
}
