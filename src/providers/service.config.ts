

export class ServiceConfig {
    private static ISDEBUG = true;
    public static PAGESIZE = 10;

    public static getUrl() {
        if (this.ISDEBUG) {
            //测试环境URL
            return "http://192.168.10.70:8081/";
        } else {
            //生产环境URL
            return "http://222.223.193.205:28084/";
        }
    }
  public static GETACTIVITYLIST = 'leader/getActivityList'; // 获取活动列表
  // 上传文件
  public static UPLOAD_IMAGE = "backManagement/uploadPhoto"// 上传图片
  public static UPLOAD_VIDEO = "backManagement/uploadVideo"// 上传视频
}