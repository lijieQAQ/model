import {Component} from '@angular/core';
import {NavController, ToastController} from 'ionic-angular';
import {HttpClientUtil} from '../../providers/HttpClientUtil';
import {BasePage} from "../base/base-page";
import {FormBuilder, Validators, FormGroup} from '@angular/forms';
import {ServiceConfig} from '../../providers/service.config'
import {Storage} from '@ionic/storage';
import {TabsPage} from '../tabs/tabs'
import {RegisterPage} from "../register/register"
import { JPush } from '@jiguang-ionic/jpush';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage extends BasePage {

  loginForm: FormGroup;
  mobile: any;
  password: any;

  constructor(public navCtrl: NavController,
              public formBuilder: FormBuilder,
              public http: HttpClientUtil,
              private storage: Storage,
              private jpush: JPush,
              public toastCtrl: ToastController) {
    super();
    let self = this;
    this.storage.get('user').then(e => {
      if (e) {
        self.navCtrl.push(TabsPage);
        return;
      }
    })
    this.loginForm = formBuilder.group({
      mobile: ['', Validators.compose([Validators.minLength(11), Validators.maxLength(11), Validators.required, Validators.pattern("^[1][3,4,5,6,7,8,9][0-9]{9}$")])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(6)])]
    })
    this.mobile = this.loginForm.controls['mobile'];
    this.password = this.loginForm.controls['password'];
  }


  login(value) {
    let self = this;
    this.http.postNotLoading(ServiceConfig.LOGIN, {mobile: value.mobile, password: value.password}, function (data) {
      if (data != null) {
        self.storage.set('user', data);
        this.jpush.init()
          .then(res => {
            this.jpush.setAlias(data.mobile)
              .then((res) => {
                console.log(res);
            }).catch((err) => {
              console.log(err);
            });
          })
          .catch(err => alert(JSON.stringify(err)))
        self.navCtrl.push(TabsPage);
      } else {
        self.showToastText(self.toastCtrl, '账户密码错误');
      }
    })
  }

  pushRegisterPage() {
    this.navCtrl.push(RegisterPage);
  }

}
