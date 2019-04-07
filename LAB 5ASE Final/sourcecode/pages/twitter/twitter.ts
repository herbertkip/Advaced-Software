import { Component } from '@angular/core';
import {LoadingController, Platform} from 'ionic-angular';
import firebase from 'firebase';
import {AngularFireAuth} from "angularfire2/auth";
import { TwitterConnect } from '@ionic-native/twitter-connect';

@Component({
  selector: 'page-twitter',
  templateUrl: 'twitter.html',
})
export class TwitterPage {

  isTwitterLoggedIn:boolean = false;
  userProfile: any = null;
  constructor(public loadingCtrl: LoadingController, private plt: Platform, public afAuth: AngularFireAuth, private twitterConnect: TwitterConnect) {
  }
  twitterLogout(){
    let loading = this.loadingCtrl.create({
      content: 'Please wait...',
      showBackdrop: false
    });
    loading.present()
    if (this.plt.is('cordova')) {
      this.twitterConnect.logout()
          .then( res => {
            this.isTwitterLoggedIn = false
            this.userProfile = null
            loading.dismiss()
          })
          .catch(e => {
            loading.dismiss()
            console.log('Error logout from twitter', e)
          });
    } else{

      this.afAuth.auth.signOut().then( res => {

        this.isTwitterLoggedIn = false
        this.userProfile = null
        loading.dismiss()
      })
          .catch(e => {
            loading.dismiss()
            console.log('Error logout from twitter', e)
          });
    }
  }

  loginUser(): Promise<any> {
    let loading = this.loadingCtrl.create({
      content: 'Please wait...',
      showBackdrop: false
    });
    loading.present()

    if (this.plt.is('cordova')) {
      return this.twitterConnect.login().then(response => {

        const twitterCredential = firebase.auth.TwitterAuthProvider.credential(response.token, response.secret);

        this.afAuth.auth.signInWithCredential(twitterCredential)
            .then(res => {

              this.isTwitterLoggedIn = true;
              this.userProfile = res
              loading.dismiss()
            })
      }).catch((error) => {
        loading.dismiss()
        console.error(error)
      });
    } else{

      this.afAuth.auth.signInWithPopup(new firebase.auth.TwitterAuthProvider).then(result => {
        if (result) {

          this.isTwitterLoggedIn = true;
          this.userProfile = result.user
          loading.dismiss()
        }
      }).catch(error => {
        loading.dismiss()
        console.error(error)
      })
    }
  }
}
