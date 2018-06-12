import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { VoyagePage } from '../../pages/voyage/voyage';
/**
 * Generated class for the Starter page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@Component({
  selector: 'page-starter',
  templateUrl: 'starter.html',
})
export class StarterPage {

  message: any;
  hasFinished: any;
  showName: any;
  showStarters: any;
  nom: any;
  nbMessage: any;
  pokemonList: any;
  myPkmTeam: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public storage: Storage, private alertCtrl: AlertController) {
  	this.hasFinished = false;
  	this.showName = false;
  	this.showStarters = false;
  	this.nbMessage = 0;
  	this.myPkmTeam = [{},{},{},{},{},{}];
  	this.message = "Oh bonjour, tu dois être le nouveau dresseur, mais quel est ton nom?"
  	setTimeout(() => {
  		this.showName = true;
  		this.hasFinished = true;
  	}, 2000);

  }

  ionViewDidLoad() {
  	this.storage.get('pokemonList').then((val) => {
  		console.log(val);
  		this.pokemonList = val;
  	 });
  }

  next(){

  	switch (this.nbMessage) {
  		case 0:
  			this.message = "D\'accord, tu t'appelle " + this.nom ;
  			this.showName = false;
  			break;
  		case 1:
  			this.message = "Le monde est rempli de créatures étonnantes que l\'on appelle Pokemon." ;
  			break;
  		case 2:
  			this.message = "Dans ta quête, tu aura besoin d'un compagnon, lequel choisi-tu?" ;
			this.showStarters = true;
  			break;
  		default:
  			// code...
  			break;
  	}

  	this.nbMessage++;
  }


  chooseStarter(pokemon){
  	let nomPokemon = "";
  	let messageAlert= "";

  	switch (pokemon) {
  		case "bulbizarre":
  			messageAlert = "Le pokemon tout en herbe?";
  			nomPokemon = this.pokemonList[0].nom;
			this.myPkmTeam[0].pkm = this.pokemonList[0];
  			break;
  		case "salameche":
  			messageAlert = "Le pokemon tout feu tout flamme?";
  			nomPokemon = this.pokemonList[1].nom;
			this.myPkmTeam[0].pkm = this.pokemonList[1];
  			break;
  		case "carapuce":
  			messageAlert = "Le pokemon tortue?";
  			nomPokemon = this.pokemonList[2].nom;
			this.myPkmTeam[0].pkm = this.pokemonList[2];
  			break;
  		default:
  			messageAlert = "ERREUR lors du switch";
  			break;
  	}


  	let alert = this.alertCtrl.create({
	    title: 'Tu veux ' + nomPokemon + ' ?',
	    message: messageAlert,
	    buttons: [
	      {
	        text: 'Non',
	        role: 'cancel'
	      },
	      {
	        text: 'Oui',
	        handler: () => {
	        	this.showStarters = false;
				this.myPkmTeam[0].lvl = 5;
				this.myPkmTeam[0].exp = 0;
				this.myPkmTeam[0].pv = {};
				this.myPkmTeam[0].pv.value = 100;
				this.myPkmTeam[0].pv.max  = 100;
				this.storage.set('save.myPkmTeam', this.myPkmTeam);
				this.navCtrl.push(VoyagePage);
	        }
	      }
	    ]
	  });
	  alert.present();
  }

}
