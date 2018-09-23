

export class ServiceConfig {
    private static ISDEBUG = true;
    public static PAGESIZE = 10;

    public static getUrl() {
        if (this.ISDEBUG) {
            //测试环境URL
            return "http://192.168.43.174:8081/";
        } else {
            //生产环境URL
            return "http://222.223.193.205:28084/";
        }
    }
  public static GETACTIVITYLIST = 'leader/getActivityList'; // 获取活动列表
  // 上传文件
  public static UPLOAD_IMAGE = "backManagement/uploadPhoto"// 上传图片
  public static UPLOAD_VIDEO = "backManagement/uploadVideo"// 上传视频
  public static CHAT_ADDCHAT = "message/send"// 发消息
  public static GETMSGLIST = "message/getMsgList"// 获取消息
  public static GETMSG = "message/getMsg"// 获取消息
  public static FINDBYSTAFFID = "leader/findByStaffId"// 获取模特照片
  public static SAVEANDUPDATE = "leader/saveAndUpdate"// 发布
  public static APPLYACTIVITYLIST = "model/getActivityList"// 获取各种活动
  public static PERSONINFORMATION ="model/getPersonInformation"// 获取模特信息
  public static PERSONUPDATE = "model/updatePerson"//修改模特个人信息
  public static LOGIN ="login/userLogin"//登陆
  public static REGISTER ="login/register"//注册
  public static CHECKPHONE ="login/checkphone"//验证电话号
  public static GETACTIVITYBYID = "model/getActivityById"//根据id获取活动
  public static COLLECTEDACTIVITY = "model/collectedActivity" //收藏活动
  public static FINDACTIVITYSTATUS = "model/findActivityStatus"//查看此活动是否已经报名，收藏
  public static DELETEAPPLYACTIVITY ="model/deleteApplyActivity"
}
