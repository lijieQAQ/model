import { Component } from '@angular/core';
import { NavController, ToastController, ActionSheetController } from 'ionic-angular';
import { HttpClientUtil } from '../../providers/HttpClientUtil';
import { ServiceConfig } from '../../providers/service.config';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { MediaCapture, MediaFile, CaptureError, CaptureImageOptions, CaptureVideoOptions } from '@ionic-native/media-capture';
import {BasePage} from '../base/base-page';
@Component({
  selector: 'page-personalDisplay',
  templateUrl: 'personalDisplay.html'
})
export class PersonalDisplayPage extends BasePage{
  image_url_list: Array<string> = [];
  video_url_list: Array<string> = [];
  constructor(public navCtrl: NavController,
              private camera: Camera,
              private http: HttpClientUtil,
              private toastCtrl: ToastController,
              private actionSheetCtrl: ActionSheetController,
              private capture: MediaCapture) {
    super();
  }
  // 拍照或视频
  presentActionSheet() {
    let self = this;
    let actionSheet = this.actionSheetCtrl.create({
      title: '请选择',
      buttons: [
        {
          text: '相册',
          handler: () => {
            self.takePhotos(0);
          }
        },{
          text: '拍照',
          handler: () => {
            self.takePhotos(1);
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
  takePhotos(status) {
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
      self.updateFile(filePath, 0);
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
          self.updateFile(filePath, 1);
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
  updateFile(filePath, mediaType) {
    // mediaType 0照片，1视频
    let self = this;
    this.http.uploadFile(mediaType, filePath,function(data) {
      if (data["status"] == 1) {
        if (mediaType == 0) {
          self.image_url_list.push(data["data"]["info"]["url"]);
        } else {
          self.video_url_list.push(data["data"]["info"]["url"]);
        }
      } else {
        self.showToastText(self.toastCtrl, data["info"]);
      }
    });
  }
}
