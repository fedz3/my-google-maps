import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Vibration } from '@ionic-native/vibration';
import { Geolocation } from '@ionic-native/geolocation';

import { HttpClient } from '@angular/common/http';

declare var google;

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  @ViewChild('map') mapElement: ElementRef;
  map: any
  error: any
  results: any
  param: any = {}
  lat: any
  long: any
  constructor(public navCtrl: NavController, private vibration: Vibration, private http: HttpClient, private geolocation: Geolocation) {

  }

  click_vibration(): void {
    // Vibrate the device for a second
    // Duration is ignored on iOS.
    this.vibration.vibrate(1000);

    // Vibrate 2 seconds
    // Pause for 1 second
    // Vibrate for 2 seconds
    // Patterns work on Android and Windows only
    this.vibration.vibrate([2000, 1000, 2000]);

    // Stop any current vibrations immediately
    // Works on Android and Windows only
    this.vibration.vibrate(0);
  }

  ionViewDidLoad() {
    this.geolocation.getCurrentPosition().then((resp) => {
      console.log(resp.coords.latitude)
      console.log(resp.coords.longitude)
      this.lat = resp.coords.latitude
      this.long = resp.coords.longitude
    }).catch((error) => {
      // console.log('Error getting location', error);
      this.error = error
    });

    this.loadMap();
  }

  loadMap() {

    let latLng = new google.maps.LatLng(-34.9290, 138.6010);

    let mapOptions = {
      center: latLng,
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    }

    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);

  }

  send() {
    let data = this.param

    this.http.get("/api/get_users").subscribe(data => console.log(data), err => console.log(err))
  }

  onSubmit() {
    let data = this.param
    // console.log(data)
    this.http.post('/api/set_profile', data).subscribe(data => console.log(data))
  }

}
