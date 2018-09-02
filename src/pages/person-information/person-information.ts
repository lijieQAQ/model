import { Component } from '@angular/core';
import { NavController, NavParams,ToastController } from 'ionic-angular';
import { HttpClientUtil } from '../../providers/HttpClientUtil';
import { ServiceConfig } from '../../providers/service.config';
import {BasePage} from "../base/base-page";


/**
 * Generated class for the PersonInformationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-person-information',
  templateUrl: 'person-information.html',
})
export class PersonInformationPage extends BasePage {
  edit:number=1;
  dis:boolean = true;
  personInformation = {
    name:'',
    sex:'',
    trasex:'',
    birthday:'',
    national:'',
    height:'',
    weight:'',
    measurements:'',
    mobile:'',
    introduction:'',
   
  };
  constructor(public navCtrl: NavController, public navParams: NavParams,
    public http: HttpClientUtil ,public toastCtrl: ToastController) {
      super();
  }

  ionViewDidEnter() {
    this.getInformation();
    console.log('ionViewDidLoad PersonInformationPage');
  }

  getInformation() {
    let self = this;
    console.log(this.personInformation);
    this.http.postNotLoading(ServiceConfig.PERSONINFORMATION,{}, function(data){
      self.personInformation= data;
      if(self.personInformation.sex=='1'){
        self.personInformation.trasex = '男'
      }else{
        self.personInformation.trasex = '女'
      }
    })
  }
  editPerson(){
    this.edit = 2;
    this.dis = false
  }
  savePerson(){
    let self = this;
    this.http.postNotLoading(ServiceConfig.PERSONUPDATE,self.personInformation, function(data){
        if(data>0){
          self.showToastText(self.toastCtrl, '修改成功');
          self.edit = 1;
          self.dis= true;
        }
    })
  }

}
