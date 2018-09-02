import { Component } from '@angular/core';
import { NavController, NavParams, ViewController, ToastController } from 'ionic-angular';
import { BasePage } from "../base/base-page";
import { Storage } from '@ionic/storage';
import { HttpClientUtil } from '../../providers/HttpClientUtil';
import { ServiceConfig } from '../../providers/service.config'

/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})

export class RegisterPage extends BasePage {
  checknum : boolean = false;
  staff = {
    mobile: '',
    name: '',
    password: '',
    birthday:'',
    confirmPassword: '',
    graduated_school: '',
    height: '',
    weight: '',
    bust: '',
    waist: '',
    hips: '',
    age:'',
    hobbies:''
  }


  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private storage: Storage,
    public viewCtrl: ViewController,
    public toastCtrl: ToastController,
    public http: HttpClientUtil
  ) {
    super();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  gotoLogin() {
    this.navCtrl.pop();
  }

  doRegister() {
    let self = this;
    if(self.checknum){
      self.showToastText(self.toastCtrl, "此电话号已注册");
      return;
    }
    if (this.trim(this.staff.mobile) == '') {
      self.showToastText(self.toastCtrl, "请输入电话号");
      return;
    }
    else if (!(/^[1][3,4,5,7,8][0-9]{9}$/.test(this.trim(this.staff.mobile)))){
       self.showToastText(self.toastCtrl, "请输入正确的电话号");
       return;
    }
    else if (this.trim(this.staff.name) == '') {
      self.showToastText(self.toastCtrl, "请输入姓名");
      return;
    }
    else if (this.trim(this.staff.password)=='') {
      self.showToastText(self.toastCtrl, "请输入密码");
      return;
    }
    else if (this.staff.password.length<6) {
      self.showToastText(self.toastCtrl, "请输入6位以上的密码");
      return;
    }
    else if (this.trim(this.staff.confirmPassword) == '') {
      self.showToastText(self.toastCtrl, "请输入确认密码");
      return;
    }
    else if (this.staff.password != this.staff.confirmPassword) {
      self.showToastText(self.toastCtrl, "两次输入的密码不匹配。");
      return;
    }else if (this.staff.password != this.staff.confirmPassword) {
      self.showToastText(self.toastCtrl, "两次输入的密码不匹配。");
      return;
    }
    else if (this.trim(this.staff.birthday)=='') {
      self.showToastText(self.toastCtrl, '请选择生日');
      return;
    }
    else if (this.trim(this.staff.graduated_school)=='') {
      self.showToastText(self.toastCtrl, "请输入学校");
      return;
    }
    else if (this.trim(this.staff.height)=='') {
      self.showToastText(self.toastCtrl, "请输入身高");
      return;
    }
    else if (!/[1-2]\d{2}/.test (this.staff.height)) {
      self.showToastText(self.toastCtrl, "请输入正确身高");
      return;
    }
    else if (this.trim(this.staff.weight)=='') {
      self.showToastText(self.toastCtrl, "请输入体重");
      return;
    }
    else if (!/^\d{2,3}/.test (this.staff.weight)) {
      self.showToastText(self.toastCtrl, "请输入正确体重");
      return;
    }
    else if (this.trim(this.staff.bust)=='') {
      self.showToastText(self.toastCtrl, "请输入胸围");
      return;
    }else if (!/^\d{1,3}$/.test (this.staff.bust)) {
      self.showToastText(self.toastCtrl, "请输入正确胸围");
      return;
    }
    else if (this.trim(this.staff.waist)=='') {
      self.showToastText(self.toastCtrl, "请输入腰围");
      return;
    }
    else if (!/^\d{1,3}$/.test (this.staff.waist)) {
      self.showToastText(self.toastCtrl, "请输入正确腰围");
      return;
    }
    else if (this.trim(this.staff.hips)=='') {
      self.showToastText(self.toastCtrl, "请输入臀围");
      return;
    }else if (!/^\d{1,3}$/.test (this.staff.hips)) {
      self.showToastText(self.toastCtrl, "请输入正确臀围");
      return;
    }
    else {
      let self = this;
      this.http.postNotLoading(ServiceConfig.REGISTER,self.staff , function (data) {
        if (data != 0) {
          self.showToastText(self.toastCtrl, '注册成功');
          self.dismiss();
        } else {
          self.showToastText(self.toastCtrl, '注册失败');
        }
      })
    }
  }
  trim(str) {
    return str.replace(/(^\s*)|(\s*$)/g, "");
  }
  
  getphone(){
    let self = this;
    if(self.trim(self.staff.mobile)!=''){
      this.http.postNotLoading(ServiceConfig.CHECKPHONE, { mobile: self.staff.mobile}, function (data) {
        if (data ==1 ) {
         self.showToastText(self.toastCtrl, '此手机号已注册');
         self.checknum = true;
        } else{
          self.checknum = false;
        }
      })
    }
   
  }

}
