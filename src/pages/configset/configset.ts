import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams ,AlertController,App} from 'ionic-angular';
import { LoginPage } from '../../pages/login/login';
import {Storage} from '@ionic/storage';

/**
 * Generated class for the ConfigsetPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-configset',
  templateUrl: 'configset.html',
})
export class ConfigsetPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,public alertCtrl: AlertController,private app: App,private storage: Storage) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ConfigsetPage');
  }
  lianxi(){
    const confirm = this.alertCtrl.create({
      title: '',
      message: '我们的电话是15004600310',
      buttons: [
        {
          text: '确定',
          handler: () => {
           
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
   logout(){
    this.storage.remove("user");
    this.app.getRootNav().setRoot(LoginPage);
   }

}
