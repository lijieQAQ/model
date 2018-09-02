import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { BasePage } from "../base/base-page";
import { MessageDetailPage } from "../messageDetail/messageDetail";
import { ServiceConfig } from "../../providers/service.config";
import { HttpClientUtil } from "../../providers/HttpClientUtil";
import { Storage } from '@ionic/storage';
import {TabsPage} from "../tabs/tabs";
import {LoginPage} from "../login/login";
@Component({
  selector: 'page-message',
  templateUrl: 'message.html',
})
export class MessagePage extends BasePage {
  msgs = [];
  user: any
  constructor(public navCtrl: NavController,
              private http: HttpClientUtil,
              private storage: Storage) {
    super();
  }

  ionViewDidLoad() {
    this.storage.get('user').then(e => {
      if (e) {
        this.user = e;
        this.getMsgList();
        return;
      } else {
        this.navCtrl.push(LoginPage);
      }
    })
  }
  getMsgList() {
    this.http.post(ServiceConfig.GETMSGLIST, {
      userId: this.user.id,
    }, (data)=>{
      this.msgs = data[0];
    })
  }
  goDeatil(item) {
    this.navCtrl.push(MessageDetailPage, {
      message: item,
      chatName: item.userName1 == this.user.name ? item.userName2: item.userName1
    })
  }
}
