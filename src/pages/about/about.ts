import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';

@IonicPage({
  "name": "About"
})
@Component({
  selector: 'page-about',
  templateUrl: 'about.html',
})


export class AboutPage {
  private user:myImageData[] = []

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private http: HttpClient) { 
      
    }

  ionViewDidLoad() {
    
    // this.user.userId = 1
    // user.id = 1
    // user.title = 'hello'
    // user.body = 'hello body'

    this.http.get<myImageData[]>('https://jsonplaceholder.typicode.com/posts')
    .subscribe(res => {
      console.log(res)
      // this.user = res
    })
    console.log(this.user)
  }

}

interface myImageData {
  userId?:number,
  id?:number,
  title?:string,
  body?:string
}