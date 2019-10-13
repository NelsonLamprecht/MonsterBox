import { Component } from '@angular/core';
import { DeviceControllerService } from './services/devicecontroller/devicecontroller.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'MonsterBox';    
  delaytimelow: number = 0;
  delaytimehigh: number = 0;
  repetitionslow: number = 0;
  repetitionshigh: number = 0;
  deviceControllerHostName = '';
  deviceControllerService: DeviceControllerService;
  deviceEndPoint = '';
  constructor(deviceControllerService: DeviceControllerService) {    
    this.deviceControllerService = deviceControllerService;
  }  
  
  clickedConnect() {
    this.deviceControllerService.SetEndPoint(this.deviceControllerHostName).subscribe(q => {
      this.deviceEndPoint = q;
    });
  }

  clickedStart() {
    this.deviceControllerService.Start().subscribe(d=> {
      console.log(d);
    });    
  }

  clickedStop() {
    this.deviceControllerService.Stop().subscribe();
  }

  changeDelayTimeLow(event: MouseEvent) {
    this.deviceControllerService.ChangeDelayTimeLow().subscribe();
  }

}