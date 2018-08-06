import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, Slides } from 'ionic-angular';

/**
 * Generated class for the ImageCheckPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-image-check',
  templateUrl: 'image-check.html',
})
export class ImageCheckPage {
  @ViewChild(Slides) slides: Slides;

  index: number;
  imgArr: Array<string> = [];

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public viewCtrl: ViewController) {
                this.index = navParams.get('index');
                this.imgArr = navParams.get('imgs');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ImageCheckPage');
    // 设置开始的下标
    this.slides.initialSlide = this.index;
  }

  dismiss() {
    this.viewCtrl.dismiss(this.imgArr);
  }

}
