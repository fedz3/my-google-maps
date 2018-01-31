import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Platform } from 'ionic-angular/platform/platform';
import { Network } from '@ionic-native/network';

@Injectable()
export class ConnectivityServiceProvider {

  onDevice: boolean;

  constructor(
    private http: HttpClient,
    private platform: Platform,
    private network: Network
  ) {
    this.onDevice = this.platform.is('cordova');
    console.log(this.onDevice)
    console.log(this.network.type)
    
  }



}
