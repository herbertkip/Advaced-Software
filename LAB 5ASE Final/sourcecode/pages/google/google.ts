import { Component } from '@angular/core';
import {LoadingController, Platform} from 'ionic-angular';
import firebase from 'firebase';
import {AngularFireAuth} from "angularfire2/auth";
import { GooglePlus } from '@ionic-native/google-plus';

@Component({
  selector: 'page-google',
  templateUrl: 'google.html',
})
export class GooglePage {

  isGoogleLoggedIn:boolean = false;
  userProfile: any = null;
  constructor(public loadingCtrl: LoadingController, private plt: Platform, public afAuth: AngularFireAuth, private googlePlus: GooglePlus) {
  }

  ionViewWillEnter(){

    let loading = this.loadingCtrl.create({
      content: 'Please wait...',
      showBackdrop: false
    });
    loading.present()

    firebase.auth().onAuthStateChanged( user => {
      if (user){
        this.userProfile = user;
        this.isGoogleLoggedIn = true
        loading.dismiss()
      } else {
        this.userProfile = null;
        this.isGoogleLoggedIn = false
        loading.dismiss()
      }
    });

  }

  googleLogout(){
    let loading = this.loadingCtrl.create({
      content: 'Please wait...',
      showBackdrop: false
    });
    loading.present()
    if (this.plt.is('cordova')) {
      this.googlePlus.logout()
          .then( res => {

            console.log(res);
            this.isGoogleLoggedIn = false
            this.userProfile = null
            loading.dismiss()
          })
          .catch(e => {
            loading.dismiss()
            console.log('Error logout from Google', e)
          });
    } else{

      this.afAuth.auth.signOut().then( res => {

        console.log(res);
        this.isGoogleLoggedIn = false
        this.userProfile = null
        loading.dismiss()
      })
          .catch(e => {
            loading.dismiss()
            console.log('Error logout from Google', e)
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
      return this.googlePlus.login({
        'webClientId': '692821017998-7fc1k5b78inv10mc2bi0dcbtcppji6pb.apps.googleusercontent.com',
        'offline': true
      }).then( response => {

        const googleCredential = firebase.auth.GoogleAuthProvider
            .credential(response.idToken);

        firebase.auth().signInWithCredential(googleCredential)
            .then( success => {

              this.isGoogleLoggedIn = true;
              loading.dismiss()
            });

          }).catch((error) => {
            loading.dismiss()
            console.error(error)
          });
    } else{
      this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider).then(result => {
        if (result) {
          this.isGoogleLoggedIn = true;
          loading.dismiss()
        }
      }).catch(error => {
        loading.dismiss()
        console.error(error)
      })
    }
  }
}
