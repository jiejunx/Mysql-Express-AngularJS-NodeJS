import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Util } from './util';
import { Observable } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { TopManufacturer } from './r1_definitions';

@Injectable({
  providedIn: 'root'
})
export class A3Service {

  cityUrl = "http://localhost:3000/population/get-city";
  stateUrl = "http://localhost:3000/population/get-state";
  popUrl = "http://localhost:3000/population";

  constructor(private http:HttpClient, private util: Util) { }

  getCityList(): Observable<string[]> {
    return this.http.get<string[]>(this.cityUrl).
    pipe(
      tap(_ => this.util.log('fetched city list')),
      catchError(this.util.handleError<string[]>())
    )
  }

  getStateList(): Observable<string[]> {
    return this.http.get<string[]>(this.stateUrl).
    pipe(
      tap(_ => this.util.log('fetched state list')),
      catchError(this.util.handleError<string[]>())
    )
  }

  getStateForCityList(selected_city:string): Observable<string[]> {
    const httpParams = new HttpParams().set('cityname', selected_city)
    const httpOptions = {
      params: httpParams
    }
    return this.http.get<string[]>(this.stateUrl, httpOptions)
    .pipe(
      tap(_ => this.util.log('fetched state for city list')),
      catchError(this.util.handleError<string[]>())
    )
  }

  getCityForStateList(selected_state: string): Observable<string[]> {
    const httpParams = new HttpParams().set('state', selected_state)
    const httpOptions = {
      params: httpParams
    }
    return this.http.get<string[]>(this.cityUrl, httpOptions)
    .pipe(
      tap(_ => this.util.log('fetched city for state list')),
      catchError(this.util.handleError<string[]>())
    )
  }

  updatePopulation(selected_city: string, selected_state: string, population:number) : Observable<any> {
    const httpParams = new HttpParams().set('state', selected_state).set('cityname', selected_city)
    .set("population", population.toString())
    const httpOptions = {
      params: httpParams
    }
    return this.http.post<any>(this.popUrl, null, httpOptions)
    .pipe(
      tap(_ => this.util.log('updating population of the city')),
      catchError(this.util.handleError<any>())
    )
  }



  getPopulation(selected_city:string, selected_state: string): Observable<Object[]> {

    const httpParams = new HttpParams().set('cityname', selected_city)
    .set('state', selected_state)
    const httpOptions = {
      params: httpParams
  }


  
    // const httpOptions = {
    //   headers: new HttpHeaders({ "cityname":selected_city,"state":selected_state})
      
    // };
    // httpOptions.headers.set('contentType', 'text/plain')
    // .set("Access-Control-Allow-Origin", "*")
    // .set("Access-Control-Allow-Headers", "*")
    // .set("Access-Control-Allow-Methods", "*")
  
    return this.http.get<Object[]>(this.popUrl, httpOptions)
    .pipe (
      tap(_ => this.util.log('fetched population of the city')),
      catchError(this.util.handleError<string[]>())
    )
  }
}
