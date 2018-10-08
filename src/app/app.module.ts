import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { HttpClientModule } from '@angular/common/http';
import { IonJPushModule } from 'ionic2-jpush'
import { HttpClientUtil } from '../providers/HttpClientUtil';
import { dateToStringPipe, activityListPipe, activityListSortPipe } from '../providers/common.pipe';
import { MyApp } from './app.component';

import { PersonalDisplayPage } from '../pages/personalDisplay/personalDisplay';
import { MessagePage } from '../pages/message/message';
import { MessageDetailPage } from '../pages/messageDetail/messageDetail';
import { HomePage } from '../pages/home/home';
import { MinePage } from '../pages/mine/mine';
import { TabsPage } from '../pages/tabs/tabs';
import { PersonInformationPage } from '../pages/person-information/person-information';
import { ActivityCollectionPage } from '../pages/activity-collection/activity-collection';
import { ActivityParticipatePage }from '../pages/activity-participate/activity-participate';
import { ActivityEvaluatePage } from '../pages/activity-evaluate/activity-evaluate';
import { ActivityApplyPage } from '../pages/activity-apply/activity-apply';
import { ActivityTakePartInPage } from '../pages/activity-take-part-in/activity-take-part-in';
import { LoginPage } from '../pages/login/login';
import { RegisterPage } from "../pages/register/register"
import { MySelectComponent } from "../components/my-select/my-select"
import { ActivityDetailPage } from "../pages/activity-detail/activity-detail"
import { ImageCheckPage } from "../pages/image-check/image-check"
import { EvaluateLeaderPage } from "../pages/evaluate-leader/evaluate-leader"
import{ConfigsetPage} from"../pages/configset/configset"

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Camera } from '@ionic-native/camera';
import { MediaCapture } from '@ionic-native/media-capture';
import { Transfer } from '@ionic-native/transfer';
import { Keyboard } from '@ionic-native/keyboard';
import { IonicStorageModule } from '@ionic/storage'
import { JPush } from '@jiguang-ionic/jpush';
import { WechatPlugin } from '../providers/wechat.plugin';
@NgModule({
  declarations: [
    MyApp,
    PersonalDisplayPage,
    MessagePage,
    MessageDetailPage,
    HomePage,
    MinePage,
    dateToStringPipe,
    activityListPipe,
    activityListSortPipe,
    TabsPage,
    LoginPage,
    PersonInformationPage,
    ActivityCollectionPage,
    ActivityParticipatePage,
    ActivityEvaluatePage,
    ActivityApplyPage,
    ActivityTakePartInPage,
    MySelectComponent,
    RegisterPage,
    ImageCheckPage,
    ActivityDetailPage,
    ConfigsetPage,
    EvaluateLeaderPage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonJPushModule,
    IonicModule.forRoot(MyApp, {
      tabsHideOnSubPages: 'true',
      backButtonText: '',
      iconMode: 'ios',
      mode: 'ios',
    }),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    PersonalDisplayPage,
    MessagePage,
    MessageDetailPage,
    HomePage,
    MinePage,
    TabsPage,
    LoginPage,
    PersonInformationPage,
    ActivityCollectionPage,
    ActivityParticipatePage,
    ActivityEvaluatePage,
    ActivityApplyPage,
    ActivityTakePartInPage,
    MySelectComponent,
    RegisterPage,
    ImageCheckPage,
    ActivityDetailPage,
    ConfigsetPage,
    EvaluateLeaderPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    HttpClientUtil,
    Camera,
    MediaCapture,
    Transfer,
    Keyboard,
    WechatPlugin,
    JPush,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
