import { Injectable } from '@angular/core';
import { Util } from './util';
import { HttpClient } from '@angular/common/http';
import { Observable} from 'rxjs';
import { catchError, tap} from 'rxjs/operators';
import { Category } from './r2_definitions';

@Injectable({
  providedIn: 'root'
})
export class R2Service {

  private r2URL = 'http://localhost:3000/r2';

  constructor(private http:HttpClient, private util: Util) { }

      /** Report 2 GET Category reports from server */
      getCategory(): Observable<Category[]> {
        return this.http.get<Category[]>(this.r2URL)
        .pipe(
          tap(_ => this.util.log('fetched category report')),
          catchError(this.util.handleError<Category[]>())
        );
      }

}
