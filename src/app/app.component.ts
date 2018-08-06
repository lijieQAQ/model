import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { TabsPage } from '../pages/tabs/tabs';

import { JPushService } from 'ionic2-jpush'
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = TabsPage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen,
              public jpush: JPushService) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.jpush.init()
        .then(res => {
          alert(JSON.stringify(res));
          /**
           * 获取ID
           */
          this.jpush.setAlias('123').then((res) => {
            alert("设置别名成功" + '123' + JSON.stringify(res));
          }).catch((err) => {
            alert(JSON.stringify(err));
          });
        })
        .catch(err => alert(JSON.stringify(err)))
      let openNotification = this.jpush.openNotification()
        .subscribe( res => {
          alert(JSON.stringify(res));
          alert('收到点击通知事件')
        })


      let receiveNotification = this.jpush.receiveNotification()
        .subscribe( res => {
          alert(JSON.stringify(res));
          alert('收到通知')
        })

      let receiveMessage = this.jpush.receiveMessage()
        .subscribe( res => {
          alert(JSON.stringify(res));
          alert('收到自定义消息')
        })

      let backgroundNotification = this.jpush.backgroundNotification()
        .subscribe( res => {
          alert(JSON.stringify(res));
          alert('收到后台通知')
        })

      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
}
