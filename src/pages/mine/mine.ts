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

@Component({
  selector: 'page-mine',
  templateUrl: 'mine.html'
})
export class MinePage {

  constructor(public navCtrl: NavController) {
    WechatPlugin.isInstalled().then( (data)=> {
      alert(JSON.stringify(data));
      WechatPlugin.share().then( (data)=> {
        alert(JSON.stringify(data));
      });
    });
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



}
