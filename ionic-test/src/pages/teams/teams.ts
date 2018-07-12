import { EliteApi } from './../../shared/elite-api.service';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { TeamDetailPage, TeamHomePage } from '../pages'
import { EliteApi } from '../../shared/shared'

/**
 * Generated class for the TeamsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-teams',
  templateUrl: 'teams.html',
})
export class TeamsPage {

  // teams = [
  //   { id: 1, name: 'HC Elite' },
  //   { id: 2, name: 'Team Takeover' },
  //   { id: 3, name: 'DC Thunder' }
  // ]

  teams = []

  constructor(public navCtrl: NavController, public navParams: NavParams
    , private eliteApi: EliteApi) {
  }

  ionViewDidLoad() {
    let selectedTourney = this.navParams.data

    this.eliteApi.getTournamentData(selectedTourney.id).subscribe(data => {
      this.teams = data.teams
    })
  }

  itemTapped($event, team) {
    this.navCtrl.push(TeamHomePage, team)
  }

}
