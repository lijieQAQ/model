import { Component } from '@angular/core';
import { NavController, NavParams ,AlertController} from 'ionic-angular';
import { HttpClientUtil } from '../../providers/HttpClientUtil';
import { ServiceConfig } from '../../providers/service.config';
import{ActivityDetailPage} from '../../pages/activity-detail/activity-detail'
import{Storage} from'@ionic/storage'

/**
 * Generated class for the ActivityApplyPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-activity-apply',
  templateUrl: 'activity-apply.html',
  
})
export class ActivityApplyPage {
  activityList =[];
  phtotUrl = "";
  pageNumber: number = 0;
  length:number = 1;
  constructor(public navCtrl: NavController, public navParams: NavParams,public http: HttpClientUtil,public alertCtrl: AlertController,public storage:Storage) {
    this.phtotUrl = ServiceConfig.getUrl();
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
        type:"a",
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
  
  deleteApply($event,id){
    $event.stopPropagation();
    let self = this;
      const confirm = this.alertCtrl.create({
        title: '',
        message: '确定退出报名?',
        buttons: [
          {
            text: '确定',
            handler: () => {
              self.storage.get("user").then(user=>{
                self.http.postNotLoading(ServiceConfig.DELETEAPPLYACTIVITY, {
                  activityId:id,
                  activitytype:"a",
                  status:'0',
                  staffId:user.id
                }, function(data){
                  self.pageNumber = 0;
                  self.activityList = [];
                  self.getActivityList();
                })
              })
              
            }
          },
          {
            text: '取消',
            handler: () => {
            }
          }
        ]
      });
      confirm.present();
   
  }
  activityDetail(id){
    this.navCtrl.push(ActivityDetailPage,{id:id});
  }
  doRefresh(){
    console.log("aaaa");
  }


  

  doInfinite(infiniteScroll) {
      if (this.length!=0) {
        this.pageNumber = this.pageNumber+1;
        this.getActivityList().then(data=>{
          infiniteScroll.complete();
        })
      }else{
        infiniteScroll.enable(false);
      }
  }
}
