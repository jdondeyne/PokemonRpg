import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { VoyagePage } from './voyage';

@NgModule({
  declarations: [
    VoyagePage,
  ],
  imports: [
    IonicPageModule.forChild(VoyagePage),
  ],
})
export class VoyageModule {}
