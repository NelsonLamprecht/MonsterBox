import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule} from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import {CookieService} from 'ngx-cookie-service'
import { MessageService } from 'primeng/components/common/messageservice';

import { AppComponent } from './app.component';
import { GlobalComponentsModule } from '../modules/global-components-module';
import { DeviceControllerService } from './services/devicecontroller/devicecontroller.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    GlobalComponentsModule
  ],
  providers: [
    CookieService,
    DeviceControllerService,
    MessageService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
