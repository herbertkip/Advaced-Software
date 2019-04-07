import { Component } from '@angular/core';
import {NavController} from 'ionic-angular';
import { FacebookPage } from '../../pages/facebook/facebook';
import { GooglePage } from '../../pages/google/google';
import { LinkedinPage } from '../../pages/linkedin/linkedin';
import {TwitterPage} from "../../pages/twitter/twitter";
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(private navCtrl: NavController) {
  }
  facebookLogin(){
    this.navCtrl.push(FacebookPage)
  }

  googleLogin(){
    this.navCtrl.push(GooglePage)
  }

  linkedinLogin(){
    this.navCtrl.push(LinkedinPage)
  }

  twitterLogin() {
    this.navCtrl.push(TwitterPage)
  }
}
