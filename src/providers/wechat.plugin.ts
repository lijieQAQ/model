declare var Wechat: any;


export class WechatPlugin {

  public static isInstalled() {
    return new Promise((resolve, reject) => {
      Wechat.isInstalled(result => {
        resolve(result);
      }, error => {
        reject(error);
      });
    });
  }
  public static shareText(content) {
    return new Promise((resolve, reject) => {
      Wechat.share({
        text: content,
        scene: Wechat.Scene.TIMELINE   // share to Timeline
      }, result => {
        resolve(result);
      }, error => {
        reject(error);
      });
    });
  }
  public static shareMedia(message) {
    return new Promise((resolve, reject) => {
      Wechat.share({
        message: message,
        scene: Wechat.Scene.TIMELINE   // share to Timeline
      }, result => {
        resolve(result);
      }, error => {
        reject(error);
      });
    });
  }
}
