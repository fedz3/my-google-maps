import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Vibration } from '@ionic-native/vibration';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  results: any
  param:any = {}

  constructor(public navCtrl: NavController, private vibration: Vibration, private http: HttpClient) {

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
