import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse, HttpSentEvent, HttpHeaderResponse, HttpProgressEvent, HttpUserEvent } from '@angular/common/http';
import { isNullOrUndefined } from 'util';

import { Observable, of, Subject } from 'rxjs';
import { catchError } from 'rxjs/operators';

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

  Connect(): Observable<any> {
    let subject = new Subject();
    if (this.validateEndPoint()) {
        subject.next(true)
        subject.complete();
    }
    else {
      subject.next(false);   
      subject.complete();   
    }
    return subject;
  }

  Start(): Observable<any> {    
    let subject = new Subject();
    if (this.validateEndPoint()) {      
      this.sendStart().subscribe((r: HttpResponse<string>) => {        
        if (this.validateResponse(r, this.createStartRequest())) {
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

  Stop(): Observable<boolean> {   
   let subject = new Subject<boolean>();
   if (this.validateEndPoint()) {      
     this.sendStop().subscribe((r: HttpResponse<string>) => {        
       if (this.validateResponse(r, this.createStopRequest())) {
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

  SetDelayTimeLow(value: number): Observable<boolean> {
    let subject = new Subject<boolean>();
   if (this.validateEndPoint()) {      
     this.sendSetDelayTimeLow(value).subscribe((r: HttpResponse<string>) => {        
       if (this.validateResponse(r, this.createSetDelayTimeLowRequest(value))) {
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

  SetDelayTimeHigh(value: number): Observable<boolean> {
    let subject = new Subject<boolean>();
   if (this.validateEndPoint()) {      
     this.sendSetDelayTimeHigh(value).subscribe((r: HttpResponse<string>) => {        
       if (this.validateResponse(r, this.createSetDelayTimeHighRequest(value))) {
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

  SetRepetitionsLow(value: number): Observable<boolean> {
    let subject = new Subject<boolean>();
   if (this.validateEndPoint()) {      
     this.sendSetRepetitionsLow(value).subscribe((r: HttpResponse<string>) => {        
       if (this.validateResponse(r, this.createSetRepetitionsLowRequest(value))) {
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

  SetRepetitionsHigh(value: number): Observable<boolean> {
    let subject = new Subject<boolean>();
   if (this.validateEndPoint()) {      
     this.sendSetRepetitionsHigh(value).subscribe((r: HttpResponse<string>) => {        
       if (this.validateResponse(r, this.createSetRepetitionsHighRequest(value))) {
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

  private sendSetDelayTimeLow(value: number) : Observable<any[] | HttpSentEvent | 
  HttpHeaderResponse | HttpProgressEvent | 
  HttpResponse<any> | HttpUserEvent<any>> {
    return this.http.post<any>(
      this.endpointUrl,
      this.createSetDelayTimeLowRequest(value),
      httpOptions)
      .pipe(catchError(this.handleError('sendSetDelayTimeLow', [])));
  }

  private sendSetDelayTimeHigh(value: number) : Observable<any[] | HttpSentEvent | 
  HttpHeaderResponse | HttpProgressEvent | 
  HttpResponse<any> | HttpUserEvent<any>> {
    return this.http.post<any>(
      this.endpointUrl,
      this.createSetDelayTimeHighRequest(value),
      httpOptions)
      .pipe(catchError(this.handleError('sendSetDelayTimeHigh', [])));
  } 

  private sendSetRepetitionsLow(value: number) : Observable<any[] | HttpSentEvent | 
  HttpHeaderResponse | HttpProgressEvent | 
  HttpResponse<any> | HttpUserEvent<any>> {
    return this.http.post<any>(
      this.endpointUrl,
      this.createSetRepetitionsLowRequest(value),
      httpOptions)
      .pipe(catchError(this.handleError('sendSetRepetitionsLow', [])));
  }

  private sendSetRepetitionsHigh(value: number) : Observable<any[] | HttpSentEvent | 
  HttpHeaderResponse | HttpProgressEvent | 
  HttpResponse<any> | HttpUserEvent<any>> {
    return this.http.post<any>(
      this.endpointUrl,
      this.createSetRepetitionsHighRequest(value),
      httpOptions)
      .pipe(catchError(this.handleError('sendSetRepetitionsHigh', [])));
  } 

  private validateResponse(httpResponse: HttpResponse<string>, expectedDeviceResponse: string): boolean {
    if (httpResponse.status == 200 && httpResponse.body == expectedDeviceResponse) {
      return true;
    }
    else {
      return false;
    }
  }

  private createStartRequest(): string {
    return this.createRequest("START", 0);
  }

  private createStopRequest() : string {
    return this.createRequest("STOP", 0);
  }

  private createSetDelayTimeLowRequest(value: number) : string {
    return this.createRequest("SETDELAYTIMELOW", value);
  }

  private createSetDelayTimeHighRequest(value: number) : string {
    return this.createRequest("SETDELAYTIMEHIGH", value);
  }

  private createSetRepetitionsLowRequest(value: number) : string {
    return this.createRequest("SETREPETITIONSLOW", value);
  }

  private createSetRepetitionsHighRequest(value: number) : string {
    return this.createRequest("SETREPETITIONSHIGH", value);
  }

  private createRequest(parameterName: string, parameterValue: string | number): string {
    return `${parameterName}=${parameterValue}`;
  }
}
