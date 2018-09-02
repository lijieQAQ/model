import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HttpClientUtil } from '../../providers/HttpClientUtil';
import { ServiceConfig } from '../../providers/service.config';


/**
 * Generated class for the ActivityCollectionPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-activity-collection',
  templateUrl: 'activity-collection.html',
})
export class ActivityCollectionPage {

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
      type:"s"
    }, function(data){
      self.activityList = data;
    })
  }

}