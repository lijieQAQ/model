import { Pipe, PipeTransform } from '@angular/core';
import { dateFormat } from './Utils';
@Pipe({
  name:"dateToStringPipe"
})
export class dateToStringPipe implements PipeTransform{
  transform(value:any, format: string):string{
    if(value!=null){
      let time=new Date(value.time);
      console.log(time)
      return dateFormat(time,format);
    }else{
      return "";
    }
  }
}
