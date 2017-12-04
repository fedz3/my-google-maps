import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
// import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/retry';
import 'rxjs/add/operator/take';
import { HttpErrorResponse } from '@angular/common/http/src/response';
import { Observable } from 'rxjs/Observable';
import Rx  from "rxjs/Rx";

@IonicPage({
  "name": "About"
})
@Component({
  selector: 'page-about',
  templateUrl: 'about.html',
})


export class AboutPage {
  private posts: MyPosts[] = []

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private http: HttpClient) {

  }

  ionViewDidLoad() {
    this.getPosts()
    // let source = Rx.Observable.create(1, 2, 3, 4, 5).take(3)
    // let myNumbers = source
    // console.log(myNumbers)
  }

  

  getPosts(): void {
    this.http.get<MyPosts[]>('https://jsonplaceholder.typicode.com/posts', { observe: 'response' })
      .retry(3)
      .subscribe({
        next: (resp) => this.posts = resp.body,
        error: (err:HttpErrorResponse) => console.log(err),
        complete: () => console.log('Completed !')
      })
  }

}

interface MyPosts {
  userId?: number,
  id?: number,
  title?: string,
  body?: string,
  pop: string
}