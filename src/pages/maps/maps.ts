import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { Network } from '@ionic-native/network';
import { Geolocation } from '@ionic-native/geolocation';

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
  apiKey: string;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private geolocation: Geolocation,
    private network: Network,
    private loadingCtrl: LoadingController,
  ) {

  }

  ionViewDidLoad() {
    // this.loadCurrentLocation();
    this.isOnline();
    // this.network.onConnect().subscribe((data) => {
    //   console.log('OK');
    //   console.log(JSON.stringify(data));
    // }, err => {
    //   console.log(JSON.stringify(err));
    // })
    
  }

  isOnline() {
    
    let loading = this.loadingCtrl.create({
      content: 'Load อยู่เด้อ อย่าฟ้าวหลาย'
    });

    loading.present();

    this.network.onConnect().subscribe((data) => {
      console.log('is Online !', JSON.stringify(data.type));
      loading.dismiss();

      this.apiKey = 'http://maps.google.com/maps/api/js?key=AIzaSyBqE_jVvoFjZgO5EYWIgoLrX1DiTBf6vvE&callback=mapInit';
      let script = document.createElement("script");
      script.id = 'googleMaps';
      script.src = this.apiKey;
      
      document.body.appendChild(script);
      
      window['mapInit'] = () => {
        this.loadMap(null);
      }

    }, (err) => {
      console.log('Your NOT Online !', JSON.stringify(err));
      this.msgErr = 'Your NOT Online !';
      loading.dismiss();
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
    let lat = 16.4322;
    let long = 102.8236;
    this.addInfoWindow(marker, content, name, lat, long);

  };

  addInfoWindow(marker, content, name, lat, long) {

    let infoWindow = new google.maps.InfoWindow({
      content: content
    });

    google.maps.event.addListener(marker, 'click', () => {
      infoWindow.open(this.map, marker);
      let myLinkLocation = 'geo:' + lat + ',' + long + '?q=' + name;

      window.open(myLinkLocation, '_system');
    });

  };
}
