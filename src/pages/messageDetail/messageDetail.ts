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
  selector: 'page-messagedetail',
  templateUrl: 'messageDetail.html',
})
export class MessageDetailPage extends BasePage {
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
  msg: any;
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
  }

  ionViewDidLoad() {
    var self = this;

    setTimeout(function () {
      self.content.scrollToBottom();
    }, 100);
    this.msg = this.navParams.get('message');
    this.getHistoryMsg();
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
    this.msgList.push(message);
    var self = this;
    this.httpclient.postNotLoading(ServiceConfig.CHAT_ADDCHAT, {
      speaker: '1',
      user1: '2',
      user2: '2',
      message: message.content,
    }, function (data) {
      self.message = null;
      self.ref.detectChanges();
      if (data.status == 1) {
      }
    });

    setTimeout(function () {
      self.content.scrollToBottom();
    }, 100);

  }

  getHistoryMsg(cb?: Function) {
    this.httpclient.post(ServiceConfig.GETMSG, {
      userId2: this.msg.user2,
      userId1: this.msg.user1,
    }, (data)=>{
      console.log(data)
      for(let d of data) {
        this.msgList.push(new ChatPageModel(d.message, '2', d.sendTime, '', this.loginUid, this.login_name));
      }

    })
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