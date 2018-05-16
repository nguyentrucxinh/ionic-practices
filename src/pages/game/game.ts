import { EliteApi } from './../../shared/shared';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { TeamHomePage } from '../pages';
/**
 * Generated class for the GamePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-game',
  templateUrl: 'game.html',
})
export class GamePage {

  game: any

  constructor(public navCtrl: NavController, public navParams: NavParams
    , private eliteApi: EliteApi) {
  }

  ionViewDidLoad() {
    this.game = this.navParams.data
  }

  teamTapped(teamId) {
    let tourneyData = this.eliteApi.getCurrentTourney()
    let team = tourneyData.teams.find(t => t.id === teamId)
    this.navCtrl.push(TeamHomePage, team)
  }

}
