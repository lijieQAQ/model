export class ChatPageModel {
  content: string; //消息内容
  type: string;//消息类型 1文字 2图片 3时间
  send_time: string;//发送时间
  img: string;//图片路径
  from: string;//发送人
  //from_nickname:string;//发送人昵称
  to: string;//接收人
  //shopid:string;//店铺ID
  constructor(content: string, type: string, send_time: string, img: string, from: string, to: string) {
    this.content = content;
    this.type = type;
    this.send_time = send_time;
    this.img = img;
    this.from = from;
    this.to = to;
   // this.from_nickname=nickname;
   // this.shopid=shopid;
  }

}