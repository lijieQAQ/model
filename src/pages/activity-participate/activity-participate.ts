import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { HttpClientUtil } from '../../providers/HttpClientUtil';
import { ServiceConfig } from '../../providers/service.config';

/**
 * Generated class for the ActivityParticipatePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-activity-participate',
  templateUrl: 'activity-participate.html',
})
export class ActivityParticipatePage {

  activityList =[];
  phtotUrl = "";
  constructor(public navCtrl: NavController, public navParams: NavParams,public http: HttpClientUtil) {
    this.phtotUrl = ServiceConfig.getUrl();
  }
  ionViewDidEnter() {
    this.getActivityList();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ActivityApplyPage');
  }

  getActivityList() {
    let self = this;
    this.http.postNotLoading(ServiceConfig.APPLYACTIVITYLIST, {
      type:"c"
    }, function(data){
      self.activityList = data;
    })
  }

}