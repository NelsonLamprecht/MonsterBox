import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { isNullOrUndefined } from 'util';

import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { MonsterBoxRequest } from 'src/app/models/monsterboxrequest';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'   
  })
};

@Injectable({
  providedIn: 'root'
  })
export class DeviceControllerService {
  endpointUrl: string;
  mbRequest: MonsterBoxRequest;


  constructor(private http: HttpClient) {
  }

  SetEndPoint(endpoint: string): void {
    this.endpointUrl = `http://` + endpoint + "/monsterbox"
  }

  Start(): Observable<MonsterBoxRequest> {
    if (this.validateEndPoint()) {      
      return this.http.post<MonsterBoxRequest>(this.endpointUrl, this.mbRequest, httpOptions)
        .pipe(
          catchError(this.handleError('Start', this.mbRequest))
        );
    }
    return of(null);
  }

  handleError(eventName: string, object: any): any {
    throw new Error("Method not implemented.");
  }

  private validateEndPoint(): boolean {
    if (!isNullOrUndefined(this.endpointUrl)) {
      console.log(this.endpointUrl);
      return true;
    }
    return false;
  }
}
