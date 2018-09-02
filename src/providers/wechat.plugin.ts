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
  public static share() {
    return new Promise((resolve, reject) => {
      Wechat.share({
        text: "This is just a plain string",
        scene: Wechat.Scene.TIMELINE   // share to Timeline
      }, result => {
        resolve(result);
      }, error => {
        reject(error);
      });
    });
  }
}
