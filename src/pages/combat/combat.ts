import { Component } from '@angular/core';
import { NavController, AlertController, NavParams } from 'ionic-angular';

import { VoyagePage } from '../../pages/voyage/voyage';

@Component({
  selector: 'page-combat',
  templateUrl: 'combat.html',
})
export class CombatPage {

 attackPanel: any;
  message: any;
  moveList: any;
  isAttacking: any;
  imgEffet:any;
  imgEffetEnemy:any;

  pokemonList: any = {};
  myPkmTeam: any = {};
  enemyPkmTeam: any = {};
  myAttackingPkm: any = {};
  enemyAttackingPkm: any = {};
  itemList: any = {};

  constructor(public navCtrl: NavController, private alertCtrl: AlertController, private navParams:NavParams) {
  	this.attackPanel = false;
  	this.message= "";
  	this.isAttacking = false;
  	this.imgEffet = "";
  	this.imgEffetEnemy = "";

  	this.pokemonList = [
      {
      	id: 1,
        nom: 'Bulbizarre',
        type1: 'Plante',
        type2: 'Poison',
        TauxCapture: 45,
        imgFront: 'Sprite_6_x_001',
        imgBack: 'Sprite_6_dos_001',
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
        TauxCapture: 45,
        imgFront: 'Sprite_6_x_004',
        imgBack: 'Sprite_6_dos_004',
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
        TauxCapture: 45,
        imgFront: 'Sprite_6_x_007',
        imgBack: 'Sprite_6_dos_007',
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
      	id: 25,
        nom: 'Pikachu',
        type1: 'Electrik',
        type2: '',
        TauxCapture: 190,
        imgFront: 'Sprite_6_x_025_m',
        imgBack: 'Sprite_6_dos_025_m',
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

    this.itemList = [
      {
        nom: 'Pokeball',
        quantite: 10,
        enCombat: true,
        surSoi: false
      },
      {
        nom: 'Potion',
        quantite: 8,
        enCombat: true,
        surSoi: true
      },
      {
        nom: 'Super potion',
        quantite: 5,
        enCombat: true,
        surSoi: true
      },
      {
        nom: 'Rappel',
        quantite: 2,
        enCombat: true,
        surSoi: true
      },
      {
        nom: 'Cane',
        quantite: 1,
        enCombat: false,
        surSoi: true
      }
    ]


    // ########################### Generer Mon pkm ###########################

	this.myPkmTeam = [{},{},{},{},{},{}];

	for(let i = 0; i < 4 ; i++) {
		this.myPkmTeam[i].pkm = this.pokemonList[i];
		this.myPkmTeam[i].lvl = i+1;
		this.myPkmTeam[i].exp = 0;
		this.myPkmTeam[i].pv = {};
		this.myPkmTeam[i].pv.value = i*10;
		this.myPkmTeam[i].pv.max  = 150;
	}

	console.log(this.myPkmTeam);

	this.myAttackingPkm = this.myPkmTeam[1];

	console.log(this.myAttackingPkm);

	// ########################### Generer pkm adverse ###########################

	this.enemyPkmTeam = [{},{},{},{},{},{}];

	this.enemyPkmTeam[0].pkm = this.pokemonList[2];
	this.enemyPkmTeam[0].lvl = 1;
	this.enemyPkmTeam[0].exp = 0;
	this.enemyPkmTeam[0].pv = {};
	this.enemyPkmTeam[0].pv.value = 10;
	this.enemyPkmTeam[0].pv.max  = 200;

	this.enemyPkmTeam[1].pkm = this.pokemonList[3];
	this.enemyPkmTeam[1].lvl = 1;
	this.enemyPkmTeam[1].exp = 0;
	this.enemyPkmTeam[1].pv = {};
	this.enemyPkmTeam[1].pv.value = 20;
	this.enemyPkmTeam[1].pv.max  = 150;

	this.enemyAttackingPkm = this.enemyPkmTeam[0];

  }


  attack(){
  	this.attackPanel = true;
  }

  switchPkm(raison){
  	let alert = this.alertCtrl.create();
    alert.setTitle('Changer de Pokémon');

    let i:any;
    for(i = 0; i < this.myPkmTeam.length ; i++) {
      if(this.myPkmTeam[i].pkm != null){
      	if(this.myPkmTeam[i].pv.value > 0){
	      alert.addInput({
	          type: 'radio', 
	          label: this.myPkmTeam[i].pkm.nom + ' - lvl ' + this.myPkmTeam[i].lvl + ' - ' + this.myPkmTeam[i].pv.value + '/' + this.myPkmTeam[i].pv.max + 'pv',
	          value: this.myPkmTeam[i]
	      });
	    }else{
	    	alert.addInput({
	          type: 'radio', 
	          label: this.myPkmTeam[i].pkm.nom + ' - lvl ' + this.myPkmTeam[i].lvl + ' - KO',
	          value: this.myPkmTeam[i]
	      });
	    }
	  }
    }

    if(raison == 'switch'){
    	alert.addButton('Retour');
	}

    alert.addButton({
      text: 'Choisir',
      handler: data => {
        if(data.pv.value == 0){
			console.log('Pokemon KO.', data);
			this.message = "Changement impossible, " + data.pkm.nom + " est KO.";
			this.switchPkm(raison);
        }else{
        	if(data == this.myAttackingPkm){
        		this.message = data.pkm.nom + " est déja au combat!";
        	}else{
	        	console.log('Pokemon echangé:', data);
	        	this.message = data.pkm.nom + " en avant!";
	        	this.myAttackingPkm = data;
	        	//--> Tour adverse
	        	this.enemyTurn();
        	}
        }
      }
    });
    alert.present();
  }

  useItem(){
  	let alert = this.alertCtrl.create();
    alert.setTitle('Choisir un objet à utiliser');

    let i:any;
    for(i = 0; i < this.itemList.length ; i++) {
      if(this.itemList[i] != null){
	      alert.addInput({
	          type: 'radio',
	          label: this.itemList[i].nom + ' - x' + this.itemList[i].quantite ,
	          value: this.itemList[i]
	      });
	      }
    }

    alert.addButton('Retour');
    alert.addButton({
      text: 'Utiliser',
      handler: data => {
      	if(data.enCombat == true){
      		console.log('Objet utilisé:', data);

      		switch (data.nom) {
	            case 'Potion':
	            	this.message = "Vous utilisez " + data.nom + " sur " + this.myAttackingPkm.pkm.nom;
	            	this.myAttackingPkm.pv.value = this.myAttackingPkm.pv.value + 40;
	                break;
	            case 'Pokeball':
	            	this.message = "Vous utilisez " + data.nom + " sur " + this.enemyAttackingPkm.pkm.nom;
	                break;
	            default:
	            	console.log("Objet inconnu");
	            	break;
        	}

/*      		if(data.surSoi == true){
      			this.message = "Vous utilisez " + data.nom + " sur " + this.myAttackingPkm.pkm.nom;
      		}else{
				this.message = "Vous utilisez " + data.nom + " sur " + this.enemyAttackingPkm.pkm.nom;
      		}*/
      		this.enemyTurn();
    	}else{
    		console.log('Objet hors combat:', data);
    		this.message = data.nom + " doit être utilisé hors combat.";
    	}
      }
    });
    alert.present();
  }

  useAttack(attack){
  	console.log(attack);
  	this.message = this.myAttackingPkm.pkm.nom + " utilise " + attack.nom + " !";
  	this.isAttacking = true;
  	this.imgEffetEnemy = attack.img;

  	let randomNb: any;
  	randomNb = Math.floor((Math.random() * 100) + 1);

  	setTimeout(() => {

	  	if(randomNb <= attack.precision){
	  		console.log(randomNb + "/" + attack.precision + "- reussi");
	  		this.message = "C\'est très efficace!";
	  		this.enemyAttackingPkm.pv.value = this.enemyAttackingPkm.pv.value - attack.degats;
	  		//--> Tour adverse
	  	}else{
	  		console.log(randomNb + "/" + attack.precision + "- raté");
	  		this.message = this.myAttackingPkm.pkm.nom + " rate sa cible!";
	  		//--> Tour adverse
	  	}

	  	//this.isAttacking = false;
	  	this.attackPanel = false;
	  	this.imgEffetEnemy = "";

	  	//--> Tour adverse
	  	if(this.estEnVie('bot') == true){
	  		this.enemyTurn();
	  	}
  		
	 
  	}, 1000);

  }

  run(){

	let alert = this.alertCtrl.create({
	    title: 'Prendre la fuite?',
	    message: 'Vous quitterez le combat.',
	    buttons: [
	      {
	        text: 'Non',
	        role: 'cancel',
	        handler: () => {}
	      },
	      {
	        text: 'Oui',
	        handler: () => {
				let randomNb: any;
			  	randomNb = Math.floor((Math.random() * 100) + 1);
			  	if(randomNb > 30){
			  		this.message = "Vous prenez la fuite!";
			  		console.log(randomNb + " > 30 - réussi");
			  		//--> Retour ecran voyage
			  		setTimeout(() => {
			  			this.navCtrl.push(VoyagePage);
			  		}, 1000);
			  	}else{
			  		this.message = "Impossible de fuir!";
			  		console.log(randomNb + " <= 30 - raté");
			  		//--> Tour adverse
			  	}
	        }
	      }
	    ]
	  });
	  alert.present();

  }

  enemyTurn(){
	let randomNb, randomNbAtk: any;
	let attack: any;

	setTimeout(() => {
	  	//choisir un attaque au hasard
	  	randomNbAtk =Math.floor(Math.random() * (4)) + 0;
	  	attack = this.enemyAttackingPkm.pkm.moveList[randomNbAtk];

	  	this.message = this.enemyAttackingPkm.pkm.nom + " utilise " + attack.nom + " !";
	  	this.imgEffet = attack.img;
	/*  	this.isAttacking = true;*/

	  	randomNb = Math.floor((Math.random() * 100) + 1);

	  	setTimeout(() => {

		  	if(randomNb <= attack.precision){
		  		console.log(randomNb + "/" + attack.precision + "- reussi");
		  		this.message = "C\'est très efficace!";
		  		this.myAttackingPkm.pv.value = this.myAttackingPkm.pv.value - attack.degats;
		  		//--> Tour adverse
		  	}else{
		  		console.log(randomNb + "/" + attack.precision + "- raté");
		  		this.message = this.enemyAttackingPkm.pkm.nom + " rate sa cible!";
		  		//--> Tour adverse
		  	}
			
			this.isAttacking = false;
			this.imgEffet = "";
		  

	  	}, 1000);
  	}, 1000);
  }


  checkDeath(event, bar){
  	//console.log(event);

  	//si pkm meurt -> changement de Pkm
  	if(event.value <= 0){
  		if(bar == 'joueur'){
  			//Verifier qu'il reste un pkm en vie
  			let estEnVie = false;
  			for(let i=0; i<this.myPkmTeam.length; i++){
  				if(this.myPkmTeam[i].pkm != null){
	  				if(this.myPkmTeam[i].pv.value > 0){
	  					estEnVie = true;
	  					break;
	  				}
  				}
  			}

  			this.message = this.myAttackingPkm.pkm.nom + " est KO!";
	  		this.isAttacking = true;

  			if(estEnVie == true){
	  			setTimeout(() => {
	  				this.switchPkm('mort');
	  			}, 1000);
  			}else{
  				//GAME OVER
  				setTimeout(() => {
	  				this.message = "Tous vos pokemons sont KO, retour au dernier centre Pkm.";
	  				//Téléportation centre Pkm
	  			}, 1000);
  			}

  		}else{
  			this.message = this.enemyAttackingPkm.pkm.nom + " est KO!";

  			//Verifier qu'il reste un pkm en vie
  			if(this.estEnVie('bot') == true){
  				//Faire changer de pkm le PC
				for(let i=0; i<this.enemyPkmTeam.length; i++){
					if(this.enemyPkmTeam[i].pkm != null){
						if(this.enemyPkmTeam[i].pv.value > 0){
							this.message = "L'adversaire envoie " + this.enemyPkmTeam[i].pkm.nom;
							setTimeout(() => {
								this.enemyAttackingPkm = this.enemyPkmTeam[i];
				  			}, 1000);
				  			break;
						}
					}
				}
			}else{
  				//Combat réussi
  				this.message = "L'adversaire a été vaincu!";
  				setTimeout(() => {
			  		this.navCtrl.push(VoyagePage);
			    }, 1000);
  			}
  		}
  		
  	}
  }


  estEnVie(joueur){

  	let team:any;
  	let estEnVie = false;

  	if(joueur == 'joueur'){
  		team = this.myPkmTeam;
  	}else{
  		team = this.enemyPkmTeam;
  	}

	for(let i = 0; i < team.length; i++){
		if(team[i].pkm != null){
			if(team[i].pv.value > 0){
				estEnVie = true;
				break;
			}
		}
	}

  	return estEnVie;
  }

}
