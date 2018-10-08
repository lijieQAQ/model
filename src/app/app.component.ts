import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { TabsPage } from '../pages/tabs/tabs';
import { LoginPage } from '../pages/login/login';
import {Storage} from '@ionic/storage';
import { JPushService } from 'ionic2-jpush'
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any ;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen,
              public jpush: JPushService,private storage: Storage) {
    platform.ready().then(() => {
      this.storage.get('user').then(e => {
        if (e) {
           this.rootPage = TabsPage; 
        }else{
          this.rootPage =LoginPage;
        }
      })
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      let openNotification = this.jpush.openNotification()
        .subscribe( res => {
        })


      let receiveNotification = this.jpush.receiveNotification()
        .subscribe( res => {
        })

      let receiveMessage = this.jpush.receiveMessage()
        .subscribe( res => {
        })

      let backgroundNotification = this.jpush.backgroundNotification()
        .subscribe( res => {
        })

      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
}
