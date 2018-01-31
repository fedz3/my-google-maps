import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class ConnectivityServiceProvider {

  OnlineStatus: boolean;
  // onConnected: any;

  constructor(
    private http: HttpClient,
  ) {
    // console.log(navigator.onLine)
  }
}
