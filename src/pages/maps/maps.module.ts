import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { MapsPage } from './maps';
import { HttpClientModule } from '@angular/common/http';
import { ConnectivityServiceProvider } from '../../providers/connectivity-service/connectivity-service';

@NgModule({
  declarations: [
    MapsPage,
  ],
  imports: [
    IonicPageModule.forChild(MapsPage),
    HttpClientModule
  ],
  providers: [
    Geolocation,
    ConnectivityServiceProvider
  ]
})
export class MapsPageModule { }
