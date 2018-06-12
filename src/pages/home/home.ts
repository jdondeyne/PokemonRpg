import { Component } from '@angular/core';
import { NavController, AlertController, LoadingController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { CombatPage } from '../../pages/combat/combat';
import { VoyagePage } from '../../pages/voyage/voyage';
import { StarterPage } from '../../pages/starter/starter';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  isStarted: any;
  pokemonList: any = {}; 
  itemList: any = {}; 


  constructor(public navCtrl: NavController, private alertCtrl: AlertController, public storage: Storage, public loadingCtrl: LoadingController) {

    let loading = this.loadingCtrl.create({
      content: 'Création BDD Pkm...'
    });
    loading.present();

  	this.isStarted = false;

  	//Verifier que le jeu a déja été lancé 1 fois
  	this.storage.get('pokemonList').then((val) => {
  		console.log(val);
  		if(val == null){
  			this.creerBDDPkm();
  			this.creerBDDItem();
  		}
  		loading.dismiss();
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
	        degats: 40,
	        precision: 100
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
	        degats: 50,
	        precision: 70
	      },
	      {
	        nom: 'Tranch\'herbe',
	        type: 'Plante',
	        degats: 70,
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
	        degats: 40,
	        precision: 90
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
	        degats: 50,
	        precision: 80,
	        effet: 'Brulure'
	        img: 'feu'
	      },
	      {
	        nom: 'Brouillard',
	        type: 'Poison',
	        degats: 0,
	        precision: 100,
	        effet: 'Précision-'
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
	        degats: 40,
	        precision: 100
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
	        degats: 35,
	        precision: 90,
	        effet: 'Defense-',
	        img: 'eau'
	      },
	      {
	        nom: 'Pistolet à eau',
	        type: 'Eau',
	        degats: 60,
	        precision: 80,
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
	        degats: 40,
	        precision: 100
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
	        degats: 60,
	        precision: 90,
	        img: ''
	      },
	      {
	        nom: 'Vive-Attaque',
	        type: 'Normal',
	        degats: 30,
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
	        degats: 40,
	        precision: 100
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
      	id: 23,
        nom: 'Abo',
        type1: 'Poison',
        type2: '',
        tauxCapture: 255,
        imgFront: 'Sprite_6_x_023',
        imgBack: 'Sprite_6_dos_023',
        evolLvl: 22,
        moveList: [
	      {
	        nom: 'Ligotage',
	        type: 'Normal',
	        degats: 15,
	        precision: 90,
	        effet: 'Repetition'
	      },
	      {
	        nom: 'Groz\'Yeux',
	        type: 'Normal',
	        degats: 0,
	        precision: 100,
	        effet: 'Defense-'
	      },
	      {
	        nom: 'Dard-venin',
	        type: 'Poison',
	        degats: 15,
	        precision: 100,
	        effet: 'Empoisonné',
	        img: ''
	      },
	      {
	        nom: 'Morsure',
	        type: 'Ténèbres',
	        degats: 60,
	        precision: 100,
	        effet: 'Peur',
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
	        degats: 40,
	        precision: 100
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
	        degats: 60,
	        precision: 80,
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
      },
      {
      	id: 41,
        nom: 'Nosferapti',
        type1: 'Poison',
        type2: 'Vol',
        tauxCapture: 255,
        imgFront: 'Sprite_6_x_041',
        imgBack: 'Sprite_6_dos_041',
        evolLvl: 22,
        moveList: [
	      {
	        nom: 'Vampirisme',
	        type: 'Inscecte',
	        degats: 80,
	        precision: 100,
	        effet: 'Soin',
	      },
	      {
	        nom: 'Ultrason',
	        type: 'Normal',
	        degats: 0,
	        precision: 55,
	        effet: 'Confusion'
	      },
	      {
	        nom: 'Etonnement',
	        type: 'Spectre',
	        degats: 30,
	        precision: 100,
	        effet: 'Peur',
	        img: ''
	      },
	      {
	        nom: 'Morsure',
	        type: 'Ténèbres',
	        degats: 60,
	        precision: 100,
	        effet: 'Peur',
	        img: ''
	      }
	    ]
      },
      {
      	id: 109,
        nom: 'Smogo',
        type1: 'Poison',
        type2: '',
        tauxCapture: 190,
        imgFront: 'Sprite_6_x_109',
        imgBack: 'Sprite_6_dos_109',
        evolLvl: 35,
        moveList: [
	      {
	        nom: 'Gaz Toxik',
	        type: 'Poison',
	        degats: 0,
	        precision: 90,
	        effet: 'Empoisonné',
	      },
	      {
	        nom: 'Charge',
	        type: 'Normal',
	        degats: 40,
	        precision: 100
	      },
	      {
	        nom: 'Purédpois',
	        type: 'Poison',
	        degats: 30,
	        precision: 70,
	        effet: 'Empoisonné',
	        img: ''
	      },
	      {
	        nom: 'Brouillard',
	        type: 'Normal',
	        degats: 0,
	        precision: 100,
	        effet: 'Précision-',
	        img: ''
	      }
	    ]
      },
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
/*	myPkmTeam[0].pkm = this.pokemonList[0];
	myPkmTeam[0].lvl = 5;
	myPkmTeam[0].exp = 0;
	myPkmTeam[0].pv = {};
	myPkmTeam[0].pv.value = 100;
	myPkmTeam[0].pv.max  = 100;*/

    this.storage.set('save.myItemList', myItemList);
    this.storage.set('save.myPkmTeam', myPkmTeam);

    this.navCtrl.push(StarterPage);

  }
  	

}
