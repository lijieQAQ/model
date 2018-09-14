import { Component } from '@angular/core';
import { NavController, ToastController, ActionSheetController } from 'ionic-angular';
import { HttpClientUtil } from '../../providers/HttpClientUtil';
import { ServiceConfig } from '../../providers/service.config';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { MediaCapture, MediaFile, CaptureError, CaptureImageOptions, CaptureVideoOptions } from '@ionic-native/media-capture';
import {BasePage} from '../base/base-page';
import {LoginPage} from "../login/login";
import {Storage} from '@ionic/storage';

@Component({
  selector: 'page-personalDisplay',
  templateUrl: 'personalDisplay.html'
})
export class PersonalDisplayPage extends BasePage{
  image_url_list: Array<string> = [];
  video_url_list: Array<string> = [];
  noMakeUp: Array<string> = [];
  makeUp: Array<string> = [];
  body: Array<string> = [];
  modelCard: Array<string> = [];
  url: string = '';
  id: number;
  user: any;
  constructor(public navCtrl: NavController,
              private camera: Camera,
              private http: HttpClientUtil,
              private storage: Storage,
              private toastCtrl: ToastController,
              private actionSheetCtrl: ActionSheetController,
              private capture: MediaCapture) {
    super();
    this.url = ServiceConfig.getUrl();
  }
  ionViewDidEnter() {
    this.storage.get('user').then(e => {
      if (e) {
        this.user = e;
        this.getStaffPic;
      } else {
        this.navCtrl.push(LoginPage);
      }
    })
  }
  getStaffPic() {
    let self = this;
    this.http.post(ServiceConfig.FINDBYSTAFFID, {
      staffId: this.user.id
    }, data => {
      console.log(data);
      if(data.status == 'success') {
        if(data.data.videoPath != '')
        this.video_url_list = data.data.videoPath.split(',');
        if(data.data.makeUp != '')
        this.makeUp = data.data.makeUp.split(',');
        if(data.data.noMakeUp != '')
        this.noMakeUp = data.data.noMakeUp.split(',');
        if(data.data.body != '')
        this.body = data.data.body.split(',');
        if(data.data.modelCard != '')
        this.modelCard = data.data.modelCard.split(',');
        this.id = data.data.id;
      }
    })
  }
  // 提交
  submit() {
    let self = this;
    this.http.post(ServiceConfig.SAVEANDUPDATE, {
      staffId: 1,
      id: this.id,
      videoPath: this.video_url_list.toString(),
      makeUp: this.makeUp.toString(),
      noMakeUp: this.noMakeUp.toString(),
      body: this.body.toString(),
      modelCard: this.modelCard.toString(),
    }, function(data){
      if(data.status == 'success') {
      }
    })
  }
  // 拍照或视频
  presentActionSheet(type) {
    let self = this;
    let actionSheet = this.actionSheetCtrl.create({
      title: '请选择',
      buttons: [
        {
          text: '相册',
          handler: () => {
            self.takePhotos(0, type);
          }
        },{
          text: '拍照',
          handler: () => {
            self.takePhotos(1, type);
          }
        },{
          text: '取消',
          role: 'cancel',
          handler: () => {
          }
        }
      ]
    });
    actionSheet.present();
  }
// 拍照
  takePhotos(status, type) {
    let self = this;
    const options: CameraOptions = {
      quality: 50,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      sourceType: status, // sourceType 0表示相册，1表示相机
      mediaType: this.camera.MediaType.PICTURE,
      targetWidth: 500,
      targetHeight: 500
    }
    this.camera.getPicture(options).then((filePath) => {
      console.log(filePath);
      self.updateFile(filePath, 0, type);
    }, (err) => {
      console.error(err);
    });
  }
  // 录制视频
  mediaCapture() {
    let self = this;
    // 设置最长录制时间为 9s
    let options: CaptureVideoOptions = { duration: 9 };
    this.capture.captureVideo(options)
      .then(
        (data: MediaFile[]) => {
          let filePath = data[0].fullPath;
          console.log(data,filePath);
          self.updateFile(filePath, 1, '');
        },
        (err: CaptureError) => {
          console.error(err);
        }
      );
  }

  // 删除文件
  /*
  // type 0照片，1视频
  */
  deleteFile(type ,index) {
    if (type == 0) {
      this.image_url_list.splice(index,1);
    } else {
      this.video_url_list.splice(index,1);
    }
  }

  // request
  // 上传图片和视频
  updateFile(filePath, mediaType, type) {
    // mediaType 0照片，1视频
    let self = this;
    this.http.uploadFile(mediaType, filePath, data => {
      if (data["status"] == 'success') {
        if (mediaType == 0) {
          if(type === 'nomakeup') {
            self.noMakeUp.push(data["data"]);
          } else if(type === 'makeup'){
            self.makeUp.push(data["data"]);
          } else if(type === 'body'){
            self.body.push(data["data"]);
          } else {
            self.modelCard.push(data["data"]);
          }
        } else {
          self.video_url_list.push(data["data"]);
        }
      } else {
        self.showToastText(self.toastCtrl, data["info"]);
      }
    });
  }
}
