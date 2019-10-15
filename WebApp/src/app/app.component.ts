import { Component } from '@angular/core';
import { isNullOrUndefined } from 'util';

import { CookieService } from 'ngx-cookie-service';
import { MessageService } from 'primeng/components/common/messageservice';

import { DeviceControllerService } from './services/devicecontroller/devicecontroller.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {  
  private MonsterBox_Hostname_Cookie: string = "MonsterBox_Hostname";
  delaytimelow: number = 0;
  delaytimehigh: number = 0;
  repetitionslow: number = 0;
  repetitionshigh: number = 0;
  deviceControllerHostName: string;
  deviceEndPoint: string;

  constructor(
    private cookieService: CookieService, 
    private messageService: MessageService,
    private deviceControllerService: DeviceControllerService) {
    var cookie = this.cookieService.get(this.MonsterBox_Hostname_Cookie);
    if (!isNullOrUndefined(cookie)) {
      this.deviceControllerHostName = cookie;
    }
  }
  
  clickedConnect() {
    this.deviceControllerService.SetEndPoint(this.deviceControllerHostName).subscribe(q => {
      this.deviceEndPoint = q;
      this.cookieService.set(this.MonsterBox_Hostname_Cookie, this.deviceControllerHostName);
    });
  }

  clickedStart() {
    this.deviceControllerService.Start().subscribe(response => {
      if (response == true) {
        this.messageService.add({key:'deviceresponse', severity:'success', summary:'Start: Accepted'});
      }
      else {
        this.messageService.add({key:'deviceresponse',severity: 'error', summary:'Start: Invalid Response'})
      }
    });    
  }

  clickedStop() {
    this.deviceControllerService.Stop().subscribe(response => {
      if (response == true) {
        this.messageService.add({key:'deviceresponse', severity:'success', summary:'Stop: Accepted'});
      }
      else {
        this.messageService.add({key:'deviceresponse',severity: 'error', summary:'Stop: Invalid Response'})
      }
    });    
  }

  changeDelayTimeLow(event: MouseEvent) {
    this.deviceControllerService.ChangeDelayTimeLow().subscribe();
  }

}