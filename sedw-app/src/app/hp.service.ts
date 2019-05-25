import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Statistics } from './hp_definitions';
import { catchError, map, tap} from 'rxjs/operators';
import { Util } from './util';



@Injectable({
  providedIn: 'root'
})
export class HpService {

  private statsURL = 'http://localhost:3000/stats';

  constructor(private http:HttpClient, private util:Util) { }

  getStatistics(): Observable<Statistics> {
    return this.http.get<Statistics>(this.statsURL)
    .pipe(
      tap(_ => this.util.log("fetching statistics")),
      catchError(this.util.handleError<Statistics>())
    )
  }

}
