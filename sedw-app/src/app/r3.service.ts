import { Injectable } from '@angular/core';
import { Util } from './util';
import { HttpClient } from '@angular/common/http';
import { Observable} from 'rxjs';
import { catchError, tap} from 'rxjs/operators';
import { CategoryProductPred } from './r3_definitions';
@Injectable({
  providedIn: 'root'
})
export class R3Service {

  private r3URL = 'http://localhost:3000/r3';

  constructor(private http:HttpClient, private util: Util) { }

  getR3Result(): Observable<CategoryProductPred[]> {
    return this.http.get<CategoryProductPred[]>(this.r3URL)
    .pipe(
      tap(_ => this.util.log('fetched report3')),
      catchError(this.util.handleError<CategoryProductPred[]>())
    );
  }
}
