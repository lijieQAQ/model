import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientUtil } from '../providers/HttpClientUtil';
import { dateToStringPipe } from '../providers/common.pipe';
import { MyApp } from './app.component';

import { PersonalDisplayPage } from '../pages/personalDisplay/personalDisplay';
import { MessagePage } from '../pages/message/message';
import { HomePage } from '../pages/home/home';
import { MinePage } from '../pages/mine/mine';
import { TabsPage } from '../pages/tabs/tabs';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Camera } from '@ionic-native/camera';
import { MediaCapture } from '@ionic-native/media-capture';
import { Transfer } from '@ionic-native/transfer';
@NgModule({
  declarations: [
    MyApp,
    PersonalDisplayPage,
    MessagePage,
    HomePage,
    MinePage,
    dateToStringPipe,
    TabsPage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp, {
      tabsHideOnSubPages: 'true',
      backButtonText: '',
      iconMode: 'ios',
      mode: 'ios',
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    PersonalDisplayPage,
    MessagePage,
    HomePage,
    MinePage,
    TabsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    HttpClientUtil,
    Camera,
    MediaCapture,
    Transfer,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}