import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Util } from './util';
import { tap, catchError } from 'rxjs/operators';
import { StoreIDDisplay } from './action2/action2.component';



@Injectable({
  providedIn: 'root'
})
export class A2Service {

  nameUrl = "http://localhost:3000/manager/get-name";
  emailUrl = "http://localhost:3000/manager/get-email";
  url = "http://localhost:3000/manager";
  addManagerUrl = "http://localhost:3000/manager/add";
  removeManagerUrl = "http://localhost:3000/manager/remove";
  assignUrl = "http://localhost:3000/manager/assign";
  assignRelUrl = "http://localhost:3000/manager/get-assign";
  unassignUrl = "http://localhost:3000/manager/unassign";
  storeListUrl = "http://localhost:3000/manager/storelist";

  paramsAll = new HttpParams().set('option', "all");
  paramsActive = new HttpParams().set('option', "active");
  paramsInactive = new HttpParams().set('option', "inactive");

  data: Object[];
  displayedColumns: string[] = ['Email', 'ManagerName', 'Status'];


  constructor(private http: HttpClient,
    private util: Util) { }

  searchManager(selectedName: string, selectedEmail: string): Observable<any> {
    var newParams = new HttpParams().set('option', "all").set("managername", selectedName)
      .set("email", selectedEmail)
    const httpOptions = { params: newParams }
    return this.http.get<any>(this.url, httpOptions).
      pipe(
        tap(_ => console.log("searching manager")),
        catchError(this.util.handleError<any>())
      )
  }

  getAllEmail(): Observable<any> {
    const httpOptions = { params: this.paramsAll }
    return this.http.get<any>(this.emailUrl, httpOptions).
      pipe(
        tap(_ => console.log("fetching all emails")),
        catchError(this.util.handleError<any>())
      )
  }

  getActiveEmail(): Observable<any> {
    const httpOptions = { params: this.paramsActive }
    return this.http.get<any>(this.emailUrl, httpOptions).
      pipe(
        tap(_ => console.log("fetching active emails")),
        catchError(this.util.handleError<any>())
      )

  }

  getInactiveEmail(): Observable<any> {
    const httpOptions = { params: this.paramsInactive }
    return this.http.get<any>(this.emailUrl, httpOptions).
      pipe(
        tap(_ => console.log("fetching inactive emails")),
        catchError(this.util.handleError<any>())
      )

  }

  getAllName(): Observable<any> {
    const httpOptions = { params: this.paramsAll }
    return this.http.get<any>(this.nameUrl, httpOptions).
      pipe(
        tap(_ => console.log("fetching all names")),
        catchError(this.util.handleError<any>())
      )

  }

  getActiveName(): Observable<any> {
    const httpOptions = { params: this.paramsActive }
    return this.http.get<any>(this.nameUrl, httpOptions).
      pipe(
        tap(_ => console.log("fetching active names")),
        catchError(this.util.handleError<any>())
      )

  }

  getInactiveName(): Observable<any> {
    const httpOptions = { params: this.paramsInactive }
    return this.http.get<any>(this.nameUrl, httpOptions).
      pipe(
        tap(_ => console.log("fetching inactive names")),
        catchError(this.util.handleError<any>())
      )

  }

  getUnassignManagerStoreList(): Observable<any> {
    return this.http.get<any>(this.assignRelUrl).
      pipe(
        tap(_ => console.log("fetching unassignable managers with store ids")),
        catchError(this.util.handleError<any>())
      )
  }

  lookupManagerName(selectedName: string): Observable<any> {
    var newParams = new HttpParams().set('option', "all").set("managername", selectedName)
    const httpOptions = { params: newParams }
    return this.http.get<any>(this.emailUrl, httpOptions)
  }


  lookupManagerEmail(selectedEmail: string): Observable<any> {
    var newParams = new HttpParams().set('option', "all").set("email", selectedEmail)
    const httpOptions = { params: newParams }
    return this.http.get<any>(this.nameUrl, httpOptions)
  }

  addManager(addedName: string, addedEmail: string): Observable<any> {

    var params = new HttpParams().set("email", addedEmail).set("managername", addedName);
    const httpOptions = {
      params: params
    };
    return this.http.post(this.addManagerUrl, null, httpOptions)
  }

  removeManager(removeName: string, removeEmail: string): Observable<any> {
    var params = new HttpParams().set("email", removeEmail).set("managername", removeName);
    const httpOptions = {
      params: params
    }
    return this.http.post(this.removeManagerUrl, null, httpOptions)
  }

  getManagerStoreList(selectedEmail: string): Observable<StoreIDDisplay> {
    var params = new HttpParams().set("manageremail", selectedEmail)
    const httpOptions = {
      params: params
    }
    return this.http.get<StoreIDDisplay>(this.assignRelUrl, httpOptions)
  }

  unassignManager(selectedEmail: string, selectedStoreNumber: string): Observable<any> {
    var params = new HttpParams().set("manageremail", selectedEmail).set("storenumber", selectedStoreNumber);
    const httpOptions = {
      params: params
    }
    return this.http.post(this.unassignUrl, null, httpOptions)
  }

  getStoreList(): Observable<any> {
    return this.http.get(this.storeListUrl).pipe(
      tap(_ => console.log("fetching store list"))
    )
  }

  assignManager(selectedEmail: string, selectedStoreNumber: string): Observable<any> {
    var params = new HttpParams().set("manageremail", selectedEmail).set("storenumber", selectedStoreNumber);
    const httpOptions = {
      params: params
    }
    return this.http.post(this.assignUrl, null, httpOptions)
  }
}
