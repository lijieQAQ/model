import { Pipe, PipeTransform } from '@angular/core';
import { dateFormat } from './Utils';
@Pipe({
  name:"dateToStringPipe"
})
export class dateToStringPipe implements PipeTransform{
  transform(value:any, format: string):string{
    if(value!=null){
      let time=new Date(value.time);
      return dateFormat(time,format);
    }else{
      return "";
    }
  }
}
@Pipe({
  name:"activityListSortPipe"
})
export class activityListSortPipe implements PipeTransform{
  transform(value:any, params: string):any{
    if(value.length > 0) {
      if(params != '') {
        return value.sort(compare(params == 'price' ? 'maxPricePoint' : 'beginDate'));
      }
    } else {
      return value;
    }

  }
}
@Pipe({
  name:"activityListPipe"
})
export class activityListPipe implements PipeTransform{
  transform(value:any, params1: string, params2: string):any{
    if(value.length > 0) {
      let arr = value.filter(function (item) {
        if(params1 != '' && params2 == '') {
          if(params1 == 'today') {
            if(item.beginDate.day == new Date().getDate() && item.beginDate.month == new Date().getMonth() && new Date(item.beginDate.time).getFullYear() == new Date().getFullYear()) {
              return item;
            }
          }
          if(params1 == 'week') {
            if(7 < item.beginDate.day - new Date().getDate() || item.beginDate.day - new Date().getDate() > -7) {
              return item;
            }
          }
          if(params1 == 'month') {
            if(item.beginDate.month == new Date().getMonth() && new Date(item.beginDate.time).getFullYear() == new Date().getFullYear()) {
              return item;
            }
          }
        } else if(params1 != '' && params2 != '') {
          if(params1 == 'today') {
            if(item.beginDate.day == new Date().getDate() && item.beginDate.month == new Date().getMonth() && new Date(item.beginDate.time).getFullYear() == new Date().getFullYear()) {
              if(params2 == 'low') {
                if(Number(item.maxPricePoint) < 500) {
                  return item;
                }
              } else if(params2 == 'mid') {
                if(Number(item.maxPricePoint) < 1000 && Number(item.minPricePoint) >= 500) {
                  return item;
                }
              } else if(params2 == 'high') {
                if(Number(item.maxPricePoint) > 1000) {
                  return item;
                }
              }
            }
          }
          if(params1 == 'week') {
            if(7 < item.beginDate.day - new Date().getDate() || item.beginDate.day - new Date().getDate() > -7) {
              if(params2 == 'low') {
                if(Number(item.maxPricePoint) < 500) {
                  return item;
                }
              } else if(params2 == 'mid') {
                if(Number(item.maxPricePoint) < 1000 && Number(item.minPricePoint) >= 500) {
                  return item;
                }
              } else if(params2 == 'high') {
                if(Number(item.maxPricePoint) > 1000) {
                  return item;
                }
              }
            }
          }
          if(params1 == 'month') {
            if(item.beginDate.month == new Date().getMonth() && new Date(item.beginDate.time).getFullYear() == new Date().getFullYear()) {
              if(params2 == 'low') {
                if(Number(item.maxPricePoint) < 500) {
                  return item;
                }
              } else if(params2 == 'mid') {
                if(Number(item.maxPricePoint) < 1000 && Number(item.minPricePoint) >= 500) {
                  return item;
                }
              } else if(params2 == 'high') {
                if(Number(item.maxPricePoint) > 1000) {
                  return item;
                }
              }
            }
          }
        } else if(params1 == '' && params2 != '') {
          if(params2 == 'low') {
            if(Number(item.maxPricePoint) < 500) {
              return item;
            }
          } else if(params2 == 'mid') {
            if(Number(item.maxPricePoint) < 1000 && Number(item.minPricePoint) >= 500) {
              return item;
            }
          } else if(params2 == 'high') {
            if(Number(item.maxPricePoint) > 1000) {
              return item;
            }
          }
        } else {
          return item;
        }
      });
      return arr;
    } else {
      return value;
    }
  }
}
var compare = function (prop) {
  return function (obj1, obj2) {
    var val1 = obj1[prop];
    var val2 = obj2[prop];
    if (!isNaN(Number(val1)) && !isNaN(Number(val2))) {
      val1 = Number(val1);
      val2 = Number(val2);
    }
    if(val1.time != undefined && val1.time != null) {
      val1 = val1.time;
      val2 = val2.time;
    }
    if (val1 < val2) {
      return -1;
    } else if (val1 > val2) {
      return 1;
    } else {
      return 0;
    }
  }
}
