import { Component } from '@angular/core';
import { NavController, PopoverController } from 'ionic-angular';
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
  constructor(public navCtrl: NavController,
                public http: HttpClientUtil,
                public popoverCtrl: PopoverController) {
    this.phtotUrl = ServiceConfig.getUrl();
  }
  ionViewDidEnter() {
    this.getCarouselList();
    this.getActivityList();
  }
  open($event) {
    const popover = this.popoverCtrl.create(MySelectComponent, {}, {
      cssClass: 'my-select-popover',
    });
    popover.present({
      ev:$event
    });
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
