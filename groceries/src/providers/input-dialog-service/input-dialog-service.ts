import { Injectable } from '@angular/core';
import { GroceriesServiceProvider } from '../../providers/groceries-service/groceries-service';
import { AlertController } from 'ionic-angular';

/*
  Generated class for the InputDialogServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class InputDialogServiceProvider {

  constructor(public alertCtrl: AlertController, public dataService: GroceriesServiceProvider) {
    console.log('Hello InputDialogServiceProvider Provider');
  }


  showPrompt(item?, index?) {
    const prompt = this.alertCtrl.create({
      title: item ? 'Edit Item' : 'Add Item',
      message: item? "Editing Item..." : 'Adding Item',
      inputs: [
        {
          name: 'name',
          placeholder: 'Item Name',
          value: item ? item.name : null
        },
        {
          name: 'quantity',
          placeholder: 'Item Quantity',
          value: item ? item.quantity : null
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Add',
          handler: item => {
            console.log('Saved clicked');
            if (index !== undefined) {
              this.dataService.editItem(item, index);
            }
            else {
              this.dataService.addItem(item);
            }
          }
        }
      ]
    });
    prompt.present();
  }

}
