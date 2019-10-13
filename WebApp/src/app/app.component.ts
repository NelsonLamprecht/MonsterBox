import { Component } from '@angular/core';
import { DeviceControllerService } from './services/devicecontroller/devicecontroller.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'MonsterBox';  
  deviceControllerHostName = '';
  delaytimelow: number = 0;
  delaytimehigh: number = 0;
  repetitionslow: number = 0;
  repetitionshigh: number = 0;
  deviceControllerService: DeviceControllerService;

  constructor(deviceControllerService: DeviceControllerService) {    
    this.deviceControllerService = deviceControllerService;
  }

  changedHostName(event) {    
    console.log(event);
  }
  
  clickedConnect() {
    console.log(this.deviceControllerHostName);
  }

  clickedStart() {
    this.deviceControllerService.Start().subscribe();
  }

  clickedStop() {
    this.deviceControllerService.Stop().subscribe();
  }

  changeDelayTimeLow(event: MouseEvent) {
    this.deviceControllerService.ChangeDelayTimeLow().subscribe();
  }

}