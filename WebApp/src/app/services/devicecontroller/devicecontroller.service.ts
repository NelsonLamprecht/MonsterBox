import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse, HttpSentEvent, HttpHeaderResponse, HttpProgressEvent, HttpUserEvent } from '@angular/common/http';
import { isNullOrUndefined } from 'util';

import { Observable, of, throwError, Subject } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

const headers = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });
const httpOptions: { headers; observe; responseType; } = {
  headers: headers,
  observe: 'response',
  responseType: 'text' as 'json'
};

@Injectable({
  providedIn: 'root'
})
export class DeviceControllerService {
  endpointUrl: string;
  validEndPoint: boolean = false;

  constructor(private http: HttpClient) { }

  SetEndPoint(endpoint: string): Observable<string> {
    if (!isNullOrUndefined(endpoint) && endpoint.length > 0) {
      this.endpointUrl = `http://` + endpoint + "/monsterbox";
      return of(this.endpointUrl);
    }
    return of(null);
  }

  Start(): Observable<any> {
    //compose new observable
    let subject = new Subject();
    if (this.validateEndPoint()) {      
      this.sendStart().subscribe((r: HttpResponse<string>) => {        
        if (this.validateStartResponse(r)) {
          subject.next(true);          
        }
        else {
          subject.next(false);          
        }        
        subject.complete();
      });         
    }
    else {
      subject.next(false);
      subject.complete();
    }
    return subject;
  }

  Stop(): Observable<any> {
   //compose new observable
   let subject = new Subject();
   if (this.validateEndPoint()) {      
     this.sendStop().subscribe((r: HttpResponse<string>) => {        
       if (this.validateStopResponse(r)) {
         subject.next('x');          
       }
       else {
         subject.next(false);          
       }        
       subject.complete();
     });         
   }
   else {
     subject.next(false);
     subject.complete();
   }
   return subject;
  }

  ChangeDelayTimeLow(): Observable<string> {
    throw new Error("Method not implemented.");
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      //this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  private validateEndPoint(): boolean {
    if (!isNullOrUndefined(this.endpointUrl)) {
      return true;
    }
    return false;
  }  

  private sendStart() : Observable<any[] | HttpSentEvent | 
  HttpHeaderResponse | HttpProgressEvent | 
  HttpResponse<any> | HttpUserEvent<any>> {
    return this.http.post<any>(
      this.endpointUrl,
      this.createStartRequest(),
      httpOptions)
      .pipe(catchError(this.handleError('sendStart', [])));
  }

  private sendStop() : Observable<any[] | HttpSentEvent | 
  HttpHeaderResponse | HttpProgressEvent | 
  HttpResponse<any> | HttpUserEvent<any>> {
    return this.http.post<any>(
      this.endpointUrl,
      this.createStopRequest(),
      httpOptions)
      .pipe(catchError(this.handleError('sendStop', [])));
  }

  private validateStartResponse(httpResponse: HttpResponse<string>): boolean {
    if (httpResponse.status == 200 && httpResponse.body == "START=0") {
      return true;
    }
    else {
      return false;
    }
  }

  private validateStopResponse(httpResponse: HttpResponse<string>): boolean {
    if (httpResponse.status == 200 && httpResponse.body == "STOP=0") {
      return true;
    }
    else {
      return false;
    }
  }

  private createStartRequest() {
    return this.createRequest("START", 0);
  }

  private createStopRequest() {
    return this.createRequest("STOP", 0);
  }

  private createRequest(parameterName: string, parameterValue: string | number): string {
    return `${parameterName}=${parameterValue}`;
  }
}
