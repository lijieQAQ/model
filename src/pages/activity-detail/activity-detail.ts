import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ViewController,ToastController,AlertController} from 'ionic-angular';
import { HttpClientUtil } from '../../providers/HttpClientUtil';
import { ServiceConfig } from '../../providers/service.config';
import {Storage} from '@ionic/storage';
import { BasePage } from "../base/base-page";
import {MessageDetailPage} from "../messageDetail/messageDetail";
import {WechatPlugin} from '../../providers/wechat.plugin';

/**
 * Generated class for the ActivityDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-activity-detail',
  templateUrl: 'activity-detail.html',
})
export class ActivityDetailPage extends BasePage {
  id:any;
  userId: string;
  activity={
    id:"",
    type:"",
    name:"",
    title:"",
    introduction:"",
    content:"",
    minPricePoint:"",
    maxPricePoint:"",
    isCarousel:"",
    coverPhoto:"",
    beginDate:"",
    endDate:"",
    createDate:""
  };
  phtotUrl:String="";
  collectedStatus:boolean=false;
  apply:boolean=false;
  applyNum:number;
  constructor(public navCtrl: NavController, public navParams: NavParams,public viewCtrl: ViewController,public http: HttpClientUtil,private storage: Storage,public toastCtrl: ToastController,public alertCtrl: AlertController) {
    super();
    this.id = navParams.get('id');
    this.phtotUrl = ServiceConfig.getUrl();
    let self  = this;
    this.http.postNotLoading(ServiceConfig.GETACTIVITYBYID, {
     id:this.id
    }, function(data){
      self.activity =data;
      self.storage.get("user").then(user => {
        let staffId = user.id;
        self.userId = user.id;
        self.http.postNotLoading(ServiceConfig.FINDACTIVITYSTATUS, {
          activityId:self.id,
          staffId:staffId
         }, function(data){
             if(data.status=="success"){
              self.collectedStatus = data.data.collected;
              self.apply = data.data.apply;
              self.http.postNotLoading(ServiceConfig.FINDAPPLYNUM, {
                activityId:self.id
               }, function(data){
                    self.applyNum = data;
              })
             }
         })
      })

    })

    


    this.http.postNotLoading(ServiceConfig.UPDATEACTLOOK, {
      activityId:self.id
     }, function(data){
     })
 


  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ActivityDetailPage');
  }
  goBack(){
    this.viewCtrl.dismiss();
  }

  collected(id){
    let self =this;
    this.storage.get("user").then(e => {
      let staffId = e['id'];
      this.http.postNotLoading(ServiceConfig.COLLECTEDACTIVITY, {
        activityId:this.id,
        activitytype:"s",
        staffId:staffId,
        status:"1"
       }, function(data){
        if(data.status == 'success') {
          self.collectedStatus = true;
          self.showToastText(self.toastCtrl, "收藏成功");
        }
       })

    });
  }

  applyActivity(id){
    let self =this;
    this.storage.get("user").then(e => {
      let staffId = e['id'];
      this.http.postNotLoading(ServiceConfig.FINDSTAFFPIC, {
        staffId:staffId
       }, function(data){
        if(data.status == 'fail'){
          const confirm = self.alertCtrl.create({
            title: '',
            message: '请上传素颜，带妆，全身照片，模卡',
            buttons: [
              {
                text: '确定',
                handler: () => {
                 
                }
              }
            ]
          });
          confirm.present();
        }else{
          self.http.postNotLoading(ServiceConfig.COLLECTEDACTIVITY, {
            activityId:self.id,
            activitytype:"a",
            staffId:staffId
          }, function(data){
            if(data.status == 'success') {
              self.apply = true;
              self.showToastText(self.toastCtrl, "报名成功");
            }
          })
        }
      
       })



    });
  }
  // 联系领队
  contactLeader() {
    this.navCtrl.push(MessageDetailPage, {message: {user1: this.userId, user2: 2}})
  }
  share() {
    WechatPlugin.isInstalled().then( (data)=> {
      WechatPlugin.shareText(this.activity.title).then( (data)=> {
        alert(JSON.stringify(data));
      });
    });
    // WechatPlugin.isInstalled().then( (data)=> {
    //   WechatPlugin.shareMedia({
    //     title: "Hi, there",
    //       description: "This is description.",
    //       thumb: "www/img/thumbnail.png",
    //       mediaTagName: "TEST-TAG-001",
    //       messageExt: "这是第三方带的测试字段",
    //       messageAction: "<action>dotalist</action>",
    //       media: "YOUR_MEDIA_OBJECT_HERE"
    //   }).then( (data)=> {
    //     alert(JSON.stringify(data));
    //   });
    // });
  }

}
