import { Component } from '@angular/core';
import { DeviceControllerService } from './services/devicecontroller/devicecontroller.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'MonsterBox';  
  value = '';
  deviceControllerService: DeviceControllerService;

  /**
   *
   */
  constructor(deviceControllerService: DeviceControllerService) {    
    this.deviceControllerService = deviceControllerService;
  }

  update(value: string) { 
    this.value = value;
    this.deviceControllerService.SetEndPoint(this.value);
   }

  clickedStart() {
    this.deviceControllerService.Start();
  }

}