import { Component ,ViewChild, ElementRef} from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the PaypalPaymentPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
declare let window: any;
@IonicPage()
@Component({
  selector: 'page-paypal-payment',
  templateUrl: 'paypal-payment.html',
})
export class PaypalPaymentPage {

  @ViewChild('paypalbuttoncontainer') paypalbuttoncontainer: ElementRef;


  value: any=[];
  paymentAmount: string;
  currency: string = 'INR';
  currencyIcon: string = '₹';
  app_id: any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    let payinfo = this.navParams.get('paypalPayinfo');
    this.paymentAmount = payinfo.amount;
  }

  ionViewDidLoad(){
    const _this = this;
    setTimeout(() => {
      console.log('rendering button runs');
      // Render the PayPal button into #paypal-button-container
      window.paypal.Buttons({

        // Set up the transaction
        createOrder: function (data, actions) {
          return actions.order.create({
            purchase_units: [{
              amount: {
                currency_code: _this.currency,
                currencyIcon: _this.currencyIcon,
                value: _this.paymentAmount
              }
            }]
          });
        },

        // Finalize the transaction
        onApprove: function (data, actions) {
          return actions.order.capture()
            .then(function (details) {
              _this.paymentSuccess();
              // Show a success message to the buyer
              console.log('Transaction completed by ',details, 'and' + details.payer.name.given_name + '!');
            })
            .catch(err => {
              console.log(err);
              alert(err);
            });
        }
      }).render('#paypal-button-container');
    }, 500)
  }

  paymentSuccess(){
    alert('your payment has been successfull');
  }

}
