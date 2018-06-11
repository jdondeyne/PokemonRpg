import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { CombatPage } from '../../pages/combat/combat';
import { VoyagePage } from '../../pages/voyage/voyage';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  isStarted: any;
  pokemonList: any = {}; 
  itemList: any = {}; 


  constructor(public navCtrl: NavController, private alertCtrl: AlertController, public storage: Storage) {
  	this.isStarted = false;

  	//Verifier que le jeu a déja été lancé 1 fois
  	this.storage.get('pokemonList').then((val) => {
  		console.log(val);
  		if(val == null){
  			this.creerBDDPkm();
  			this.creerBDDItem();
  		}
  	 });

  	//Verifier qu'on a déja une sauvegarde
  	this.storage.get('save.myPkmTeam').then((val) => {
  		console.log(val);
  		if(val != null){
  			this.isStarted = true;
  		}
  	 });


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
	        	this.createNewGame();
	        }
	      }
	    ]
	  });
	  alert.present();
  	}else{
  		console.log("New game");
  		this.isStarted = true;
  		this.createNewGame();
  	
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

  creerBDDPkm(){
  	this.pokemonList = {};

  	this.pokemonList = [
      {
      	id: 1,
        nom: 'Bulbizarre',
        type1: 'Plante',
        type2: 'Poison',
        tauxCapture: 45,
        imgFront: 'Sprite_6_x_001',
        imgBack: 'Sprite_6_dos_001',
        evolLvl: 16,
        moveList: [
	      {
	        nom: 'Charge',
	        type: 'Normal',
	        degats: 10,
	        precision: 80
	      },
	      {
	        nom: 'Rugissement',
	        type: 'Normal',
	        degats: 0,
	        precision: 100,
	        effet: 'Attaque-'
	      },
	      {
	        nom: 'Fouet-lianne',
	        type: 'Plante',
	        degats: 20,
	        precision: 70
	      },
	      {
	        nom: 'Tranch\'herbe',
	        type: 'Plante',
	        degats: 30,
	        precision: 60
	      }
	    ]
      },
      {
      	id: 4,
        nom: 'Salamèche',
        type1: 'Feu',
        type2: '',
        tauxCapture: 45,
        imgFront: 'Sprite_6_x_004',
        imgBack: 'Sprite_6_dos_004',
        evolLvl: 16,
        moveList: [
	      {
	        nom: 'Griffe',
	        type: 'Normal',
	        degats: 10,
	        precision: 80
	      },
	      {
	        nom: 'Mimi-queue',
	        type: 'Normal',
	        degats: 0,
	        precision: 100,
	        effet: 'Defense-'
	      },
	      {
	        nom: 'Flamèche',
	        type: 'Feu',
	        degats: 30,
	        precision: 70,
	        img: 'feu'
	      },
	      {
	        nom: 'Brouillard',
	        type: 'Poison',
	        degats: 0,
	        precision: 100
	      }
	    ]
      },
      {
      	id: 7,
        nom: 'Carapuce',
        type1: 'Eau',
        type2: '',
        tauxCapture: 45,
        imgFront: 'Sprite_6_x_007',
        imgBack: 'Sprite_6_dos_007',
        evolLvl: 16,
        moveList: [
	      {
	        nom: 'Charge',
	        type: 'Normal',
	        degats: 10,
	        precision: 80
	      },
	      {
	        nom: 'Mimi-queue',
	        type: 'Normal',
	        degats: 0,
	        precision: 100,
	        effet: 'Defense-'
	      },
	      {
	        nom: 'Ecume',
	        type: 'Eau',
	        degats: 15,
	        precision: 70,
	        effet: 'Defense-',
	        img: 'eau'
	      },
	      {
	        nom: 'Pistolet à eau',
	        type: 'Eau',
	        degats: 30,
	        precision: 70,
	        img: 'eau'
	      }
	    ]
      },
      {
      	id: 16,
        nom: 'Roucool',
        type1: 'Normal',
        type2: 'Vol',
        tauxCapture: 255,
        imgFront: 'Sprite_6_x_016',
        imgBack: 'Sprite_6_dos_016',
        evolLvl: 18,
        moveList: [
	      {
	        nom: 'Charge',
	        type: 'Normal',
	        degats: 10,
	        precision: 80
	      },
	      {
	        nom: 'Jet de Sable',
	        type: 'Sol',
	        degats: 0,
	        precision: 100,
	        effet: 'Précision-'
	      },
	      {
	        nom: 'Tornade',
	        type: 'Vol',
	        degats: 40,
	        precision: 100,
	        img: ''
	      },
	      {
	        nom: 'Vive-Attaque',
	        type: 'Normal',
	        degats: 40,
	        precision: 100,
	        img: ''
	      }
	    ]
      },
      {
      	id: 19,
        nom: 'Rattata',
        type1: 'Normal',
        type2: '',
        tauxCapture: 255,
        imgFront: 'Sprite_6_x_019',
        imgBack: 'Sprite_6_dos_019',
        evolLvl: 20,
        moveList: [
	      {
	        nom: 'Charge',
	        type: 'Normal',
	        degats: 10,
	        precision: 80
	      },
	      {
	        nom: 'Mimi-queue',
	        type: 'Normal',
	        degats: 0,
	        precision: 100,
	        effet: 'Defense-'
	      },
	      {
	        nom: 'Morsure',
	        type: 'Spectre',
	        degats: 25,
	        precision: 70,
	        effet: 'Peur',
	        img: ''
	      },
	      {
	        nom: 'Croc de mort',
	        type: 'Spectre',
	        degats: 50,
	        precision: 60,
	        img: ''
	      }
	    ]
      },
      {
      	id: 25,
        nom: 'Pikachu',
        type1: 'Electrik',
        type2: '',
        tauxCapture: 190,
        imgFront: 'Sprite_6_x_025_m',
        imgBack: 'Sprite_6_dos_025_m',
        evolLvl: -1,
        moveList: [
	      {
	        nom: 'Charge',
	        type: 'Normal',
	        degats: 10,
	        precision: 80
	      },
	      {
	        nom: 'Mimi-queue',
	        type: 'Normal',
	        degats: 0,
	        precision: 100,
	        effet: 'Defense-'
	      },
	      {
	        nom: 'Eclair',
	        type: 'Electrik',
	        degats: 20,
	        precision: 70,
	        effet: 'Paralysie',
	        img: 'foudre'
	      },
	      {
	        nom: 'Cage-eclair',
	        type: 'Electrik',
	        degats: 0,
	        precision: 50,
	        effet: 'Paralysie',
	        img: 'foudre'
	      }
	    ]
      }
    ]

  	this.storage.set('pokemonList', this.pokemonList);
  }

  creerBDDItem(){
  	this.itemList = {};

  	this.itemList = [
      {
        nom: 'Pokeball',
        enCombat: true,
        surSoi: false,
        tauxCapture: 20
      },
      {
        nom: 'Super Ball',
        enCombat: true,
        surSoi: false,
        tauxCapture: 40
      },
      {
        nom: 'Hyper Ball',
        enCombat: true,
        surSoi: false,
        tauxCapture: 60
      },
      {
        nom: 'Master Ball',
        enCombat: true,
        surSoi: false,
        tauxCapture: 100
      },
      {
        nom: 'Potion',
        enCombat: true,
        surSoi: true,
        pvRendus: 40
      },
      {
        nom: 'Super potion',
        enCombat: true,
        surSoi: true,
        pvRendus: 70
      },
      {
        nom: 'Hyper Potion',
        enCombat: true,
        surSoi: true,
        pvRendus: 100
      },
      {
        nom: 'Rappel',
        enCombat: true,
        surSoi: true
      },
      {
        nom: 'Cane',
        enCombat: false,
        surSoi: true
      },
      {
        nom: 'Super Cane',
        enCombat: false,
        surSoi: true
      },
      {
        nom: 'Mega Cane',
        enCombat: false,
        surSoi: true
      }
    ]

    this.storage.set('itemList', this.itemList);
  }

  createNewGame(){
  	let myPkmTeam = {};
  	let myItemList = {};

  	myItemList = [
      {
        item: this.itemList[4],
        quantite: 1
      },
      {
        item: this.itemList[0],
        quantite: 5
      }
    ]

    //Creer 6 slots + 1er Pkm
    myPkmTeam = [{},{},{},{},{},{}];
	myPkmTeam[0].pkm = this.pokemonList[0];
	myPkmTeam[0].lvl = 5;
	myPkmTeam[0].exp = 0;
	myPkmTeam[0].pv = {};
	myPkmTeam[0].pv.value = 100;
	myPkmTeam[0].pv.max  = 100;

    this.storage.set('save.myItemList', myItemList);
    this.storage.set('save.myPkmTeam', myPkmTeam);

  }
  	

}
