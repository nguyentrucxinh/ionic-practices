import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook';
import { GooglePlus } from '@ionic-native/google-plus';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  userData = null;
  isLoggedInFb: boolean = false;
  isLoggedInGg: boolean = false;

  constructor(public navCtrl: NavController, private fb: Facebook, private googlePlus: GooglePlus) {
  }

  loginWithFb() {
    this.fb.login(['public_profile', 'email'])
      .then((res: FacebookLoginResponse) => {
        alert('Logged into Facebook!' + res);

        this.fb.api('me?fields=id,name,email,first_name,picture.width(720).height(720).as(picture_large)', [])
          .then(profile => {
            this.userData = { email: profile['email'], first_name: profile['first_name'], picture: profile['picture_large']['data']['url'], username: profile['name'] };

            this.isLoggedInFb = true;
          });
      })
      .catch(e => {
        alert('Error logging into Facebook' + e);
      });


    // this.fb.logEvent(this.fb.EVENTS.EVENT_NAME_ADDED_TO_CART);
  }

  loginWithGg() {
    this.googlePlus.login({})
      .then(res => {
        alert(res);
        this.userData = { email: res['email'], first_name: res['displayName'], picture: res['imageUrl'], username: res['userId'] };

        this.isLoggedInGg = true;
      })
      .catch(err => alert('Error' + err));
  }

  logoutWithGg() {
    this.googlePlus.logout()
      .then(res => {
        alert(res);
        this.userData = null;

        this.isLoggedInGg = false;
      })
      .catch(err => alert(err));
  }

  logoutWithFb() {
    this.fb.logout()
      .then(res => {
        alert(res);
        this.userData = null;

        this.isLoggedInFb = false;
      })
      .catch(err => alert(err));
  }

}
