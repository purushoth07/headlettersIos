import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PaymentRecordListPage } from './payment-record-list';

@NgModule({
  declarations: [
    //PaymentRecordListPage,
  ],
  imports: [
    IonicPageModule.forChild(PaymentRecordListPage),
  ],
  exports: [
    //PaymentRecordListPage
  ]
})
export class PaymentRecordListPageModule {}
