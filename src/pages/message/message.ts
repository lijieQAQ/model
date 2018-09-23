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

  ionViewDidEnter() {
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
      for(let d of data[0]) {
        let status = false;
        for(let msg of this.msgs) {
          if(msg.user1 == d.user2 && msg.user2 == d.user1) {
            status = true;
          }
        }
        if (!status) {
          this.msgs.push(d);
        }
      }
    })
  }
  goDeatil(item) {
    this.navCtrl.push(MessageDetailPage, {
      message: item,
      chatName: item.userName1 == this.user.name ? item.userName2: item.userName1
    })
  }
}
