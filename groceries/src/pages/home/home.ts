import { Component, Input } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { GroceriesServiceProvider } from '../../providers/groceries-service/groceries-service';
import { InputDialogServiceProvider } from '../../providers/input-dialog-service/input-dialog-service';
import { SocialSharing } from '@ionic-native/social-sharing';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  title = "Grocery List";

  

  constructor(public navCtrl: NavController, public toastCtrl: ToastController, public alertCtrl: AlertController, public dataService: GroceriesServiceProvider, public inputDialogService: InputDialogServiceProvider, public socialSharing: SocialSharing) {

  }

  loadItems() {
    return this.dataService.getItems();
  }

  removeItem(item, index) {
    console.log("Removing Item - ", item, index);
    const toast = this.toastCtrl.create({
      message: 'Removing Item -- ' + index + "...",
      duration: 3000
    });
    toast.present();


    this.dataService.removeItem(index);
    
  }

  shareItem(item, index) {
    console.log("Sharing Item - ", item, index);
    const toast = this.toastCtrl.create({
      message: 'Sharing Item -- ' + index + "...",
      duration: 3000
    });
    toast.present();

    let message = "Grocery Item -- Name : " + item.name + " - Quantity: " + item.quantity;
    let subject = "Shared via Groceries App!";

    this.socialSharing.share(message, subject).then(() => {

      console.log("Shared Successfully!");
      //Sharing via email is possible
    }).catch((error) => {
      console.error("Error while sharing ", error);
      //Sharing via email is not possible
    });
    


    
  }
  

  editItem(item, index) {
    console.log("Removing Item - ", item, index);
    const toast = this.toastCtrl.create({
      message: 'Edit Item -- ' + index + "...",
      duration: 3000
    });
    toast.present();
    this.inputDialogService.showPrompt(item, index);

    
  }


  addItem() {
    console.log("Adding Item");
    this.inputDialogService.showPrompt();
  }

  

}
