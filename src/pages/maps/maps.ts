import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';

declare var google;

@IonicPage({
  name: "maps"
})
@Component({
  selector: 'page-maps',
  templateUrl: 'maps.html',
})
export class MapsPage {
  msgErr: string;
  statusErr: boolean = true;

  @ViewChild('map') mapElement: ElementRef;

  map: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, private geolocation: Geolocation) { }

  ionViewDidLoad() {
    // this.loadMap(null);
    this.loadCurrentLocation()
  }

  loadCurrentLocation() {
    this.geolocation.getCurrentPosition().then((position) => {
      let latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
      this.loadMap(latLng);
    })
      .catch((err) => {
        // alert('your location is not available')
        this.msgErr = 'your location is not available';
        this.statusErr = false;
        console.log(err);
      });
  };

  loadMap(latLng: any) {
    latLng = latLng || new google.maps.LatLng(16.4322, 102.8236);
    let mapOptions = {
      center: latLng,
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
    let myLat = new google.maps.LatLng(16.432245, 102.797499)
    this.addMarker(latLng)
  };

  addMarker(LatLng: any) {
    LatLng = LatLng || this.map.getCenter()
    let marker = new google.maps.Marker({
      map: this.map,
      animation: google.maps.Animation.DROP,
      position: LatLng
    });

    let content = "<h4>Information!</h4>";

    this.addInfoWindow(marker, content);

  };

  addInfoWindow(marker, content) {

    let infoWindow = new google.maps.InfoWindow({
      content: content
    });

    google.maps.event.addListener(marker, 'click', () => {
      infoWindow.open(this.map, marker);
    });

  };
}
