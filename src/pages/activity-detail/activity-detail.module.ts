import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ActivityDetailPage } from './activity-detail';

@NgModule({
  declarations: [
    ActivityDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(ActivityDetailPage),
  ],
})
export class ActivityDetailPageModule {}
