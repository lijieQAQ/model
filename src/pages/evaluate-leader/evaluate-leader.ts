import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ToastController ,ViewController} from 'ionic-angular';
import { ServiceConfig } from '../../providers/service.config';
import { HttpClientUtil } from '../../providers/HttpClientUtil';
import { BasePage } from "../base/base-page";
import{Storage} from'@ionic/storage'

/**
 * Generated class for the EvaluateLeaderPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-evaluate-leader',
  templateUrl: 'evaluate-leader.html',
})
export class EvaluateLeaderPage  extends BasePage {
  
  starArray = [
    {
      "id": 1,
      "src": "../../assets/imgs/star1.png"
    },
    {
      "id": 2,
      "src": "../../assets/imgs/star1.png"
    },
    {
      "id": 3,
      "src": "../../assets/imgs/star1.png"
    },
    {
      "id": 4,
      "src": "../../assets/imgs/star1.png"
    },
    {
      "id": 5,
      "src": "../../assets/imgs/star1.png"
    }
  ];
  id:any;
  currentStar: number = 0;
  phtotUrl:String="";
  activity={
    id:0,
    type:"",
    name:"",
    title:"",
    introduction:"",
    content:"",
    minPricePoint:"",
    maxPricePoint:"",
    isCarousel:"",
    cover_photo:"",
    begin_date:"",
    endDate:"",
    createDate:"",
    leader_id:"",
    staffname:""
  };
  evaluate = {
    evaluatecontent :"",
    leaderId:"",
    start: 0,
    staffId:"",
    activityId:0
  };
  constructor(public navCtrl: NavController, public navParams: NavParams,
    public http: HttpClientUtil,public toastCtrl: ToastController,public storage:Storage,public viewCtrl: ViewController) {
    super();
    this.id = navParams.get('id');
    this.phtotUrl = ServiceConfig.getUrl();
    let self  = this;
    this.http.postNotLoading(ServiceConfig.EVALUATEACTIVITY, {
      id:this.id
     }, function(data){
       self.activity =data;
     })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EvaluateLeaderPage');
  }

  changeStars() {
    for (var i = 0; i < this.starArray.length; i++) {
      if (this.currentStar >= this.starArray[i].id) {
        this.starArray[i].src = "../../assets/imgs/star2.png";
      } else {
        this.starArray[i].src = "../../assets/imgs/star1.png";
      }
    }
  }
  clickStar  (item) {
    this.currentStar = item.id;
    this.changeStars();
  };
  
  clickPublish () {
         if(this.currentStar == 0){
             //若没点击，弹出提示
           }else{
             //TODO
           }
         };
  evaluateLeader(){
    let self  = this;
    if(this.currentStar==0){
      this.showToastText(this.toastCtrl, '请选择星级');
      return;
    }
    this.evaluate.leaderId = this.activity.leader_id;
    this.evaluate.start = this.currentStar;
    this.evaluate.activityId = this.activity.id;
    this.storage.get("user").then(user=>{
      this.evaluate.staffId = user.id;
      self.http.postNotLoading(ServiceConfig.EVALUATE, this.evaluate , function(data){
        if(data.status == 'success'){
         self.showToastText(self.toastCtrl, data.info);
         self.viewCtrl.dismiss();
        }
     })
    })
   
  }
}
