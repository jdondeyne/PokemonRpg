import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';

import { CombatPage } from '../../pages/combat/combat';
import { VoyagePage } from '../../pages/voyage/voyage';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  isStarted: any;

  constructor(public navCtrl: NavController, private alertCtrl: AlertController) {
  	this.isStarted = false;
  }


  startNewGame(){
  	if(this.isStarted == true){
  		let alert = this.alertCtrl.create({
	    title: 'Nouvelle partie?',
	    message: 'Cela écrasera votre sauvegarde actuelle.',
	    buttons: [
	      {
	        text: 'Non',
	        role: 'cancel'
	      },
	      {
	        text: 'Oui',
	        handler: () => {
	        	//Ecraser sauvegarde
	        	console.log("New game");
	        }
	      }
	    ]
	  });
	  alert.present();
  	}else{
  		console.log("New game");
  		this.isStarted = true;
  	}
  	
  }

  continueGame(){
  	console.log("Continue");
  }

  goToVoyagePage(){
  	this.navCtrl.push(VoyagePage);
  }

  goToCombatPage(){
  	this.navCtrl.push(CombatPage);
  }

  goToOptionsPage(){
  	console.log("-> Options page");
  }
  	

}
