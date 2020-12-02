import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BalanceStatementPage } from './balance-statement';

@NgModule({
  declarations: [
    //BalanceStatementPage,
  ],
  imports: [
    IonicPageModule.forChild(BalanceStatementPage),
  ],
  exports: [
    //BalanceStatementPage
  ]
})
export class BalanceStatementPageModule {}
