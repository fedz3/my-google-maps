import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { Network } from '@ionic-native/network';
import { Geolocation } from '@ionic-native/geolocation';
import { ConnectivityServiceProvider } from '../../providers/connectivity-service/connectivity-service';

@IonicPage({
  name: "maps"
})
@Component({
  selector: 'page-maps',
  templateUrl: 'maps.html',
})
export class MapsPage {
  msgErr: string;

  @ViewChild('map') mapElement: ElementRef;

  map: any;
  mapInitialised: boolean;
  apiKey: string;
  // isOnline: boolean;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private geolocation: Geolocation,
    private platform: Platform,
    private network: Network,
    private connectivityService: ConnectivityServiceProvider
  ) {
    this.mapInitialised = false;
  }

  ionViewDidLoad() {
    // this.loadCurrentLocation();
   this.isOnline(); 
  }

  isOnline() {
    this.network.onConnect().subscribe(() => {
      this.apiKey = 'http://maps.google.com/maps/api/js?key=AIzaSyBqE_jVvoFjZgO5EYWIgoLrX1DiTBf6vvE';
      let script = document.createElement("script");
      script.id = 'googleMaps';
      script.src = this.apiKey;

      document.body.appendChild(script);
      setTimeout(() => this.loadMap(null), 2000);
    }, () => {
      let script_map = document.getElementById('googleMaps');
      document.body.removeChild(script_map);
    });
  }

  loadCurrentLocation() {
    this.geolocation.getCurrentPosition().then((position) => {
      let latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
      this.loadMap(latLng);
    })
      .catch((err) => {
        this.msgErr = 'your location is not available';
        // console.log(JSON.stringify(err));
      });
  };

  loadMap(latLng: any) {
    latLng = latLng || new google.maps.LatLng(16.4322, 102.8236);
    let mapOptions = {
      center: latLng,
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    this.msgErr = null;
    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
    let myLat = new google.maps.LatLng(16.432245, 102.797499)
    this.addMarker(latLng);
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
