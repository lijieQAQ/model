import {Component, ViewChild, ChangeDetectorRef} from '@angular/core';
import {NavController, NavParams, Content, ModalController, ToastController, Platform} from 'ionic-angular';
import {Camera, CameraOptions} from '@ionic-native/camera';
import {ChatPageModel} from '../../model/chat/ChatPageModel';
import {ImageCheckPage} from '../image-check/image-check';
import {HttpClientUtil} from "../../providers/HttpClientUtil";
import {BasePage} from "../base/base-page";
import {JPushService} from 'ionic2-jpush';
import {ServiceConfig} from "../../providers/service.config";
import {Keyboard} from '@ionic-native/keyboard';

@Component({
  selector: 'page-message',
  templateUrl: 'message.html',
})
export class MessagePage extends BasePage {
  @ViewChild(Content) content: Content;

  loginUid = "";//from

  lastId = "";
  msgList = new Array<ChatPageModel>();
  message = null;
  shopid = "";
  nickname = "";
  login_name = "";//to
  keyboardHeight = "0px";
  loadMoreData = true;
  scrollTo = 0;
  textareaRows = 1;

  constructor(private keyboard: Keyboard,
              private ref: ChangeDetectorRef,
              public jpush: JPushService,
              public platform: Platform,
              public toastCtrl: ToastController,
              public httpclient: HttpClientUtil,
              private modalCtrl: ModalController,
              private camera: Camera,
              public navCtrl: NavController,
              public navParams: NavParams) {
    super();
    this.shopid = navParams.get("shopid");
    this.nickname = navParams.get("nickname");
    this.login_name = navParams.get("login_name");


    platform.ready().then(() => {

      jpush.receiveNotification().subscribe(res => {
        let from = res.extras.from;
        let img = res.extras.img;
        let content = res.extras.content;
        if (from == this.login_name) {
          var message = new ChatPageModel(content, img ? "1" : "2", "", img, from, this.loginUid);
          this.msgList.push(message);
          this.ref.detectChanges();
          setTimeout(function () {
            this.content.scrollToBottom();
          }, 100);
        }
      })
      jpush.receiveMessage().subscribe(res => {
        let from = res.extras.from;
        let img = res.extras.img;
        let content = res.extras.content;
        if (from == this.login_name) {
          var message = new ChatPageModel(content, img ? "1" : "2", "", img, from, this.loginUid);
          this.msgList.push(message);
          this.ref.detectChanges();
          setTimeout(function () {
            this.content.scrollToBottom();
          }, 100);
        }
      })
    })

    if (platform.is("ios")) {
      this.keyboard.disableScroll(true);
      keyboard.onKeyboardShow().subscribe(e => {
        this.keyboardHeight = e.keyboardHeight + "px";
        this.ref.detectChanges();
      });

      keyboard.onKeyboardHide().subscribe(e => {
        this.keyboardHeight = "0px";
        //this.send();
        // this.ref.detectChanges();
      });
    }
    this.getHistoryMsg();
  }

  ionViewDidLoad() {
    var self = this;

    setTimeout(function () {
      self.content.scrollToBottom();
    }, 100);

  }

  // 选择照片
  selectPhoto() {
    var self = this;
    const options: CameraOptions = {
      quality: 50,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      sourceType: 0,
      mediaType: this.camera.MediaType.PICTURE,
      targetWidth: 500,
      targetHeight: 500
    }
    this.camera.getPicture(options).then((imagePath) => {
      self.updateFile(imagePath);
    }, (err) => {
      //that.showToastText(that.toastCtrl, err.toString());
    });
  }

  send() {
    if (this.message) {
      this.sendMessage(new ChatPageModel(this.message, "1", "", "", this.loginUid, this.login_name));
    }
  }

  // 查看图片
  checkImg(imgUrl) {
    let imageCheckModal = this.modalCtrl.create(ImageCheckPage, {
      "imgs": [imgUrl]
    });
    imageCheckModal.present();
  }

  toShop() {
    // this.navCtrl.push(ShopDetailPage, {
    //   shopid: this.shopid
    // })
  }

  updateFile(filePath) {
    let self = this;
    this.httpclient.uploadFile(0, filePath, function (data) {
      if (data["status"] == 1) {
        self.sendMessage(new ChatPageModel("", "2", "", data["data"]["info"]["url"], self.loginUid, self.login_name));
      } else {
        self.showToastText(self.toastCtrl, data["info"]);
      }
    });
  }

  sendMessage(message: ChatPageModel) {

    console.log(JSON.stringify(message));
    this.msgList.push(message);
    var self = this;
    /*this.httpclient.postNotLoading(ServiceConfig.CHAT_ADDCHAT, {
      "content": message.content,
      "img": message.img,
      "to": message.to
    }, function (data) {
      self.message = null;
      self.ref.detectChanges();
      if (data.status == 1) {
      }
    });*/

    setTimeout(function () {
      self.content.scrollToBottom();
    }, 100);

  }

  getHistoryMsg(cb?: Function) {
    var self = this;
    // this.httpclient.getNotLoading(ServiceConfig.CHAT_GETCHATINFO, {
    //   "alias": this.login_name,
    //   "id": this.lastId
    // }, function (data) {
    //
    //   if (data.status == 1) {
    //     let list = data.data.lists;
    //     //let message_light=data.data.lists.length;
    //     if (list.length > 0) {
    //       let index = 0;
    //       list.forEach(item => {
    //         let from;
    //         let to;
    //         if (index == (list.length - 1)) {
    //           self.lastId = item.id;
    //         }
    //         if (item.type == 0) {
    //           from = self.loginUid;
    //           to = self.login_name;
    //         } else {
    //           to = self.loginUid;
    //           from = self.login_name;
    //         }
    //         if (!item.content) { //图片
    //
    //           self.msgList.unshift(new ChatPageModel("", "2", "", item.img, from, to));
    //         } else { //文字
    //           self.msgList.unshift(new ChatPageModel(item.content, "1", "", "", from, to));
    //         }
    //         if ((index % 8) == 0) {
    //           self.msgList.unshift(new ChatPageModel("", "3", item.send_time, "", "", ""));
    //         }
    //         index++;
    //
    //       });
    //       if (!cb) {
    //         setTimeout(function () {
    //           self.content.scrollToBottom();
    //         }, 100);
    //       }
    //
    //     } else {
    //       self.loadMoreData = false;
    //     }
    //
    //
    //   }
    //   if (cb) {
    //     cb();
    //   }
    //
    // });

  }

  doRefresh(refresher) {
    let self = this;
    this.getHistoryMsg(function () {
      refresher.complete();
      setTimeout(function () {
        self.content.scrollToTop();
      }, 100);

    });

  }


}
