import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { isNullOrUndefined } from 'util';

import { Observable, of, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { MonsterBoxRequest } from 'src/app/models/monsterboxrequest';

const headers = new HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded'});
const options = {headers: headers, responseType: 'text' as 'json'};

@Injectable({
  providedIn: 'root'
})
export class DeviceControllerService {
  endpointUrl: string;
  validEndPoint: boolean = false;

  constructor(private http: HttpClient) {  }

  SetEndPoint(endpoint: string): Observable<string> {
    this.endpointUrl = `http://` + endpoint + "/monsterbox";    
    return of(this.endpointUrl);    
  }

  Start(): Observable<any> {
    if (this.validateEndPoint()) {      
      var x = this.http.post<any>(
        this.endpointUrl,
        this.createStartRequest(),
        options)
        .pipe(
          catchError(err => {
            console.log('Handling error locally and rethrowing it...', err);
            return throwError(err);
          }));
      console.log(x);
    }
    return of(null);
  }

  Stop(): Observable<any> {
    if (this.validateEndPoint()) {      
      return this.http.post<any>(
        this.endpointUrl,
        this.createStopRequest(),
        options)
        .pipe(
          catchError(err => {
            console.log('Handling error locally and rethrowing it...', err);
            return throwError(err);
          }));
    }
    return of(null);
  }

  ChangeDelayTimeLow() {
    throw new Error("Method not implemented.");
  }

  private handleError(eventName: string, object: any): any {
    throw new Error("Method not implemented.");
  }

  private validateEndPoint(): boolean {
    if (!isNullOrUndefined(this.endpointUrl)) {
      console.log(this.endpointUrl);
      return true;
    }
    return false;
  }

  private createStartRequest() {
    return this.createRequest("START",0);
  }

  private createStopRequest() {
    return this.createRequest("STOP",0);
  }

  private createRequest(parameterName: string, parameterValue: string | number) : string {
    return `${parameterName}=${parameterValue}`;
  }
}
