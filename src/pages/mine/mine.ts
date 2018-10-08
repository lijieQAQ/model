import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { PersonInformationPage } from "../person-information/person-information";
import { ActivityCollectionPage } from '../activity-collection/activity-collection';
import { ActivityParticipatePage } from '../activity-participate/activity-participate';
import{ActivityApplyPage} from '../activity-apply/activity-apply';
import{ActivityTakePartInPage} from '../activity-take-part-in/activity-take-part-in';
import{ActivityEvaluatePage} from '../activity-evaluate/activity-evaluate';
import { HttpClientUtil } from '../../providers/HttpClientUtil';
import { ServiceConfig } from '../../providers/service.config';
import { WechatPlugin } from '../../providers/wechat.plugin';
import{ConfigsetPage} from "../../pages/configset/configset";
import {Storage} from '@ionic/storage';

@Component({
  selector: 'page-mine',
  templateUrl: 'mine.html'
})
export class MinePage {
  user={};
  constructor(public navCtrl: NavController,private storage: Storage) {
    this.storage.get('user').then(e => {
      Object.assign(this.user, e);
      console.log(this.user);
    })
  }
  goToPage(){
     this.navCtrl.push(PersonInformationPage);
  }
  goToCollectionPage(){
     this.navCtrl.push(ActivityCollectionPage);
  }

  goToParticipatePage(){
    this.navCtrl.push(ActivityParticipatePage);
 }

 goToApplyPage(){
  this.navCtrl.push(ActivityApplyPage);
}

goToTakePartInPage(){
  this.navCtrl.push(ActivityTakePartInPage);
}

goToEvaluatePage(){
  this.navCtrl.push(ActivityEvaluatePage);
}
toSetConfig(){
  this.navCtrl.push(ConfigsetPage);
}



}
