import { Component } from '@angular/core';
import { LoadingController, NavController, NavParams, Loading } from 'ionic-angular';

import { TeamsPage } from '../pages'
import { EliteApi } from '../../shared/shared'

/**
 * Generated class for the TournamentsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-tournaments',
  templateUrl: 'tournaments.html',
})
export class TournamentsPage {

  tournaments: any;

  constructor(public navCtrl: NavController, public navParams: NavParams
    , private eliteApi: EliteApi
    , private loadingController: LoadingController) {
  }

  itemTapped($event, tourney) {
    this.navCtrl.push(TeamsPage, tourney)
  }

  ionViewDidLoad() {
    let loader = this.loadingController.create({
      content: 'Getting tournaments...'
      // spinner: 'dots'
    })

    loader.present().then(() => {
      this.eliteApi.getTournaments().then(data => {
        this.tournaments = data
        loader.dismiss()
      })
    })
  }

}
