import {Loading, LoadingController, ToastController, AlertController} from "ionic-angular";


export class BasePage
{
  private loading:Loading;
  public isLoading:boolean;

  // 全局加载
  startLoading(loadingCtrl: LoadingController) {
    this.loading = loadingCtrl.create({
      content: '请稍候...'
    });
    this.isLoading = true;
    this.loading.present();
  }
  stopLoading() {
    if(!this.isLoading) {
      return;
    }
    this.isLoading = false;
    if(this.loading) {
      this.loading.dismiss();
    }
  }
  // 全局toast
  showToastText(toastCtrl: ToastController, text) {
    let toast = toastCtrl.create({
      message: text,
      duration: 1000,
      position: 'top'
    });
    toast.present();
  }
  // 全局Alert
  showAlert(alertCtrl: AlertController ,title: string, message: string) {
    let alert = alertCtrl.create({
      title: title,
      subTitle: message,
      buttons: ['确定']
    });
    alert.present();
  }
  showConfirm(alertCtrl: AlertController, title: string, message: string, cancelHander: Function, sureHander: Function) {
    let confirm = alertCtrl.create({
      title: title,
      message: message,
      buttons: [
        {
          text: '取消',
          handler: () => {
            cancelHander();
          }
        },
        {
          text: '确定',
          handler: () => {
            sureHander();
          }
        }
      ]
    });
    confirm.present();
  }

}
