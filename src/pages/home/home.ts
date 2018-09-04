import { Component } from '@angular/core';
import { NavController, PopoverController, ActionSheetController } from 'ionic-angular';
import { HttpClientUtil } from '../../providers/HttpClientUtil';
import { ServiceConfig } from '../../providers/service.config';
import { MySelectComponent  } from '../../components/my-select/my-select';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  pageNumber: number = 0;
  carouselList = [];
  activityList = [];
  phtotUrl: string = '';
  active_type: string = '';
  date: string = '';
  price: string = '';
  orderByType: string = '';
  constructor(public navCtrl: NavController,
                public http: HttpClientUtil,
                public actionSheetCtrl: ActionSheetController,
                public popoverCtrl: PopoverController) {
    this.phtotUrl = ServiceConfig.getUrl();
  }
  ionViewDidEnter() {
    this.getCarouselList();
    this.getActivityList();
  }
  presentActionSheetType() {
    const actionSheet = this.actionSheetCtrl.create({
        title:'分类',
        buttons: [
        {
          text: '全类型',
          handler: () => {
            this.active_type = '';
          }
        },{
          text: '展会模特',
          handler: () => {
            this.active_type = '1';
          }
        },{
            text: '商务饭局',
            handler: () => {
              this.active_type = '2';
            }
          },{
          text: '取消',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    actionSheet.present();
  }
  presentActionSheetOrderBy() {
    const actionSheet = this.actionSheetCtrl.create({
      title:'分类',
      buttons: [
        {
          text: '时间',
          handler: () => {
            this.orderByType = 'date';
          }
        },{
          text: '价格',
          handler: () => {
            this.orderByType = 'price';
          }
        },{
          text: '取消',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    actionSheet.present();
  }
  presentActionSheetDate() {
    const actionSheet = this.actionSheetCtrl.create({
      title:'分类',
      buttons: [
        {
          text: '全时段',
          handler: () => {
            this.date = '';
          }
        },{
          text: '今天',
          handler: () => {
            this.date = 'today';
          }
        },{
          text: '本周',
          handler: () => {
            this.date = 'week';
          }
        },{
          text: '本月',
          handler: () => {
            this.date = 'month';
          }
        },{
          text: '取消',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    actionSheet.present();
  }
  presentActionSheetPrice() {
    const actionSheet = this.actionSheetCtrl.create({
      title:'分类',
      buttons: [
        {
          text: '全价位',
          handler: () => {
            this.date = '';
          }
        },{
          text: '500以下',
          handler: () => {
            this.price = 'low';
          }
        },{
          text: '500-1000',
          handler: () => {
            this.price = 'mid';
          }
        },{
          text: '100一上',
          handler: () => {
            this.price = 'high';
          }
        },{
          text: '取消',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    actionSheet.present();
  }
  getCarouselList() {
    let self = this;
    this.http.post(ServiceConfig.GETACTIVITYLIST, {
      pageNumber: this.pageNumber,
      isCarousel: '1',
      pageSize: ServiceConfig.PAGESIZE
    }, function(data){
      if(data.status == 'success') {
        self.carouselList = data.data.content;
        console.log(self.carouselList)
      }
    })
  }
  getActivityList() {
    let self = this;
    this.http.postNotLoading(ServiceConfig.GETACTIVITYLIST, {
      pageNumber: this.pageNumber,
      isCarousel: '0',
      pageSize: ServiceConfig.PAGESIZE
    }, function(data){
      if(data.status == 'success') {
        if(data.data.content.length > 0) {
          for(let d of data.data.content) {
            self.activityList.push(d);
          }
        }
        console.log(self.carouselList)
      }
    })
  }
}
