import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from "rxjs";
import { Platform , LoadingController} from 'ionic-angular';
import { ServiceConfig } from './service.config';
import { BasePage } from "../pages/base/base-page";
import { Transfer, FileUploadOptions, TransferObject } from '@ionic-native/transfer';

@Injectable()

export class HttpClientUtil extends BasePage {

  constructor(public http: HttpClient,
              public platform: Platform,
              public transfer: Transfer,
              public loadingCtrl:LoadingController) {
              super();
  }

  // post 和 get请求

  public post(url: string, paramObj: any, cb?: Function) {
    this.startLoading(this.loadingCtrl);
    if (url.indexOf('http') == -1) {
      url = ServiceConfig.getUrl() + url;
    }
    console.log("请求地址:" + url);
    console.log("参数:"+JSON.stringify(paramObj));
     let headers = new HttpHeaders({'Content-Type': 'application/json;charset=utf-8'});
     return this.http.post(url, paramObj, {headers: headers}).catch(this.handleError).subscribe(data => {
       this.stopLoading();
      cb(data);
    });
   }

   public postNotLoading(url: string, paramObj: any, cb?: Function) {
    if (url.indexOf('http') == -1) {
      url = ServiceConfig.getUrl() + url;
    }
    console.log("请求地址:" + url);
    console.log("参数:"+JSON.stringify(paramObj));
     let headers = new HttpHeaders({'Content-Type': 'application/json;charset=utf-8'});
     return this.http.post(url, paramObj, {headers: headers}).catch(this.handleError).subscribe(data => {
      cb(data);
    });
   }


  public get(url, params?: Object, cb?: Function) {
     this.startLoading(this.loadingCtrl)
    if (url.indexOf('http') == -1) {
      url = ServiceConfig.getUrl() + url;
    }
    console.log("请求地址:" + url);
    console.log("参数:"+JSON.stringify(params));
    const httpParams = new HttpParams();
    if (params) {
      for (var key in params) {
        httpParams.set(key, params[key])
      }
    }
    let headers = new HttpHeaders({'Content-Type': 'application/json;charset=utf-8'});
    let options = { params: httpParams, headers: headers };
    return this.http.get(url, options).catch(this.handleError).subscribe(data => {
      this.stopLoading();
      cb(data);

    });
  }

  public getNotLoading(url, params?: Object, cb?: Function) {
    if (url.indexOf('http') == -1) {
      url = ServiceConfig.getUrl() + url;
    }
    console.log("请求地址:" + url);
    console.log("参数:"+JSON.stringify(params));
    const httpParams = new HttpParams();
    if (params) {
      for (var key in params) {
        httpParams.set(key, params[key])
      }
    }
    let headers = new HttpHeaders({'Content-Type': 'application/json;charset=utf-8'});
    let options = { params: httpParams, headers: headers };
    return this.http.get(url, options).catch(this.handleError).subscribe(data => {
      cb(data);
    });
  }
// upload 上传文件
  /*
  fileType: 文件类型 (0照片，1视频)
  filePath: 文件路径
  */
  UploadFileType: {
    PICTURE: number;
    VIDEO: number;
  };
  public uploadFile(fileType: number ,filePath, cb?: Function) {
    this.startLoading(this.loadingCtrl);
    let that = this;
    const fileTransfer: TransferObject = this.transfer.create();
    let options : FileUploadOptions;

    let url = '';
    if (fileType == 0) {
      url = ServiceConfig.getUrl() + ServiceConfig.UPLOAD_IMAGE;
      options  = {
        fileKey: 'file',
        fileName: 'image.jpg',
        mimeType: 'image/jpeg'
      }
    } else if (fileType == 1) {
      url = ServiceConfig.getUrl() + ServiceConfig.UPLOAD_VIDEO;
      options  = {
        fileKey: 'file',
        fileName: 'video.mp4',
        mimeType: 'video/mp4'
      }
    } else {
      console.log('请传入正确的文件类型');
      return;
    }
    console.log('=====url======' + url);

    fileTransfer.upload(filePath, url, options)
      .then((data) => {
        that.stopLoading();
        cb(JSON.parse(data.response));
      }, (err) => {
        that.stopLoading();
        cb({"status":0,"info":err.toString()});
      })
  }
  // other

  getData<T>(jsonDict: any): Observable<T> {
    if (!jsonDict || (typeof jsonDict != 'object')) {
      return Observable.throw("无效的请求参数: " + jsonDict);
    }
    let newJsonDict = jsonDict;
    let url = "";
    if (jsonDict["jsonFile"] && jsonDict["jsonFile"].length > 0) {
      url = jsonDict["jsonFile"];
      return this.getFromJsonFile(url);
    }

  }

  private getFromJsonFile(url) {
    return this.http.get(url).map(res => {
      return res;
    }).catch(this.handleError);
  }

  private toBodyString(obj) {
     let ret = [];
     for (let key in obj) {
       key = encodeURIComponent(key);
       let values = obj[key];
       if (values && values.constructor == Array) {//数组
         let queryValues = [];
         for (let i = 0, len = values.length, value; i < len; i++) {
           value = values[i];
           queryValues.push(this.toQueryPair(key, value));
         }
         ret = ret.concat(queryValues);
       } else { //字符串
         ret.push(this.toQueryPair(key, values));
       }
     }
     return ret.join('&');
   }

   private toQueryPair(key, value) {
     if (typeof value == 'undefined') {
       return key;
     }
     return key + '=' + encodeURIComponent(value === null ? '' : String(value));
   }

  private handleError(error: Response | any) {
    console.error("origin error: " + error);
    let errMsg: string;
    if (error instanceof Response) {
      errMsg = error.toString();
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error("error: " + errMsg);
    this.stopLoading();
    return Observable.throw(errMsg);
  }
}
