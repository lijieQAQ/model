import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { HttpClientUtil } from '../../providers/HttpClientUtil';
import { ServiceConfig } from '../../providers/service.config';
import{EvaluateLeaderPage} from '../../pages/evaluate-leader/evaluate-leader';
import{Storage} from'@ionic/storage'
import{ActivityDetailPage} from '../../pages/activity-detail/activity-detail'
/**
 * Generated class for the ActivityEvaluatePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-activity-evaluate',
  templateUrl: 'activity-evaluate.html',
})
export class ActivityEvaluatePage {

  activityList =[];
  phtotUrl = "";
  pageNumber: number = 0;
  length:number = 1;
  constructor(public navCtrl: NavController, public navParams: NavParams,public http: HttpClientUtil,public storage:Storage) {
    this.phtotUrl = ServiceConfig.getUrl();
    this.getActivityList();
  }

  ionViewDidEnter() {
    this.activityList=[];
    this.getActivityList();
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad ActivityApplyPage');
  }


  getActivityList(): Promise<any>  {
    let self = this;
    return new Promise((resolve) => {
    this.storage.get("user").then(user=>{
      this.http.postNotLoading(ServiceConfig.APPLYACTIVITYLIST, {
        staffId:user.id,
        type:"dp",
        pageNumber: this.pageNumber,
        pageSize: ServiceConfig.PAGESIZE
      }, function(data){
        if(data.status == 'success') {
          if(data.data.content.length > 0) {
            for(let d of data.data.content) {
              self.activityList.push(d);
            }
          }else{
              self.length = 0
          }
        }
        resolve();
      })
    })
  })
   
  }

  activityEvaluate(id){
    this.navCtrl.push(EvaluateLeaderPage,{id:id});
  }
  activityDetail(id){
    this.navCtrl.push(EvaluateLeaderPage,{id:id});
  }

  doInfinite(infiniteScroll) {
    if (this.length != 0) {
      this.pageNumber = this.pageNumber + 1;
      this.getActivityList().then(data => {
        infiniteScroll.complete();
      })
    } else {
      infiniteScroll.enable(false);
    }

  }
}
