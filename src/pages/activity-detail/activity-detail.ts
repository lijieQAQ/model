import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ViewController,ToastController} from 'ionic-angular';
import { HttpClientUtil } from '../../providers/HttpClientUtil';
import { ServiceConfig } from '../../providers/service.config';
import {Storage} from '@ionic/storage';
import { BasePage } from "../base/base-page";
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
  constructor(public navCtrl: NavController, public navParams: NavParams,public viewCtrl: ViewController,public http: HttpClientUtil,private storage: Storage,public toastCtrl: ToastController) {
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
        self.http.postNotLoading(ServiceConfig.FINDACTIVITYSTATUS, {
          activityId:self.id,
          staffId:staffId
         }, function(data){
             if(data.status=="success"){
              self.collectedStatus = data.data.collected;
              self.apply = data.data.apply;
              console.log(typeof(self.collectedStatus));
              console.log((typeof(self.apply)));
             }
         })
      })
     
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
        staffId:staffId
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
      this.http.postNotLoading(ServiceConfig.COLLECTEDACTIVITY, {
        activityId:this.id,
        activitytype:"a",
        staffId:staffId
       }, function(data){
        if(data.status == 'success') {
          self.apply = true;
          self.showToastText(self.toastCtrl, "报名成功");
        }
       })

    });
  }

}
