import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { BasePage } from "../base/base-page";
import { MessageDetailPage } from "../messageDetail/messageDetail";
import {ServiceConfig} from "../../providers/service.config";
import {HttpClientUtil} from "../../providers/HttpClientUtil";

@Component({
  selector: 'page-message',
  templateUrl: 'message.html',
})
export class MessagePage extends BasePage {
  msgs = [];
  constructor(public navCtrl: NavController,
              private http: HttpClientUtil) {
    super();
  }

  ionViewDidLoad() {
    this.getMsgList();
  }
  getMsgList() {
    this.http.post(ServiceConfig.GETMSGLIST, {
      userId: 1,
    }, (data)=>{
      this.msgs = data[0];
    })
  }
  goDeatil(item) {
    this.navCtrl.push(MessageDetailPage, {
      message: item
    })
  }
}
