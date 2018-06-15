import { Component } from '@angular/core';
import { NavController, AlertController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';

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
  isCaptured: any;
  imgEffet:any;
  imgEffetEnemy:any;
  typeCombat: any;
  idLieu: any;

  pokemonList: any = {};
  itemList: any = {};

  myPkmTeam: any = {};
  enemyPkmTeam: any = {};
  myAttackingPkm: any = {};
  enemyAttackingPkm: any = {};
  myItemList: any = {};


  constructor(public navCtrl: NavController, private alertCtrl: AlertController, 
  			 	private navParams:NavParams, public storage: Storage) {
  	this.attackPanel = false;
  	this.message= "";
  	this.isAttacking = false;
  	this.isCaptured = false;
  	this.imgEffet = "";
  	this.imgEffetEnemy = "";
  	this.myItemList = [];
  	this.typeCombat = "";
  	this.idLieu = 0;

  	this.enemyAttackingPkm = {};
  	this.myAttackingPkm = {};
  	this.enemyAttackingPkm.pv = {};
  	this.myAttackingPkm.pv = {};
  	this.enemyAttackingPkm.pkm = {};
  	this.myAttackingPkm.pkm = {};
  	this.enemyAttackingPkm.pkm.moveList = [];
  	this.myAttackingPkm.pkm.moveList = [];

  }

  ionViewWillEnter(){
  	this.typeCombat = this.navParams.get('type');
  	this.idLieu = this.navParams.get('lieu');

  	this.storage.get('pokemonList').then((val) => {
  		this.pokemonList = val;
  	});

  	this.storage.get('itemList').then((val) => {
  		this.itemList = val;
  	});

  	this.storage.get('save.myPkmTeam').then((val) => {
  		this.myPkmTeam = val;
  		this.myAttackingPkm = this.myPkmTeam[0];
  		this.creerEnemyTeam(this.typeCombat);
  	});

  	this.storage.get('save.myItemList').then((val) => {
  		this.myItemList = val;
  		console.log(this.myItemList);
  	});


  }


  attack(){
  	this.attackPanel = true;
  }

  back(){
  	this.attackPanel = false;
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
	        	if(this.estEnVie('bot') == true){
			  		this.enemyTurn();
			  	}
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
    for(i = 0; i < this.myItemList.length ; i++) {
      if(this.myItemList[i] != null){
	      alert.addInput({
	          type: 'radio',
	          label: this.myItemList[i].item.nom + ' - x' + this.myItemList[i].quantite ,
	          value: this.myItemList[i]
	      });
	      }
    }

    alert.addButton('Retour');
    alert.addButton({
      text: 'Utiliser',
      handler: data => {
      	if(data.enCombat == false){
      		console.log('Objet hors combat:', data);
    		this.message = data.nom + " doit être utilisé hors combat.";
    	}else{
    		console.log('Objet utilisé:', data);
    		//MAJ quantité
    		data.quantite = data.quantite - 1;
    		this.storage.set('save.myItemList', this.myItemList);

      		if(data.bonusBall != null || data.bonusBall != ""){
      			//C'est une pokeball
      			if(this.typeCombat == "sauvage"){
            		this.message = "Vous utilisez " + data.item.nom + " sur " + this.enemyAttackingPkm.pkm.nom;
            		this.capture(data, this.enemyAttackingPkm);
            	}else{
            		this.message = "Vous ne pouvez pas capturer les pkm des autres dresseurs!";
            	}
      		}else{
      			if(data.pvRendus != null || data.pvRendus != "" ){
      				//C'est une potion
      				this.message = "Vous utilisez " + data.nom + " sur " + this.myAttackingPkm.pkm.nom;
	            	this.myAttackingPkm.pv.value = this.myAttackingPkm.pv.value + data.pvRendus;
	            	//TODO -> storage
      			}
      		}

      		if(this.estEnVie('bot') == true){
	  			this.enemyTurn();
	  		}
    	}
      }
    });
    alert.present();
  }

  useAttack(attack){

  	console.log(attack);
  	this.message = this.myAttackingPkm.pkm.nom + " utilise " + attack.nom + " !";
  	this.isAttacking = true;

  
  	setTimeout(() => {

  		this.resoudreAttaque(attack, this.myAttackingPkm);

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
				if(this.typeCombat == 'sauvage'){
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
				  		if(this.estEnVie('bot') == true){
					  		this.enemyTurn();
					  	}
				  	}
			  	}else{
			  		this.message = "Vous ne pouvez pas fuir un combat de dresseurs!";
			  	}
	        }
	      }
	    ]
	  });
	  alert.present();

  }

  enemyTurn(){
	let randomNbAtk: any;
	let attack: any;
	

	setTimeout(() => {
			if(this.enemyAttackingPkm.pv.value > 0 && this.isCaptured == false){
			  	//choisir un attaque au hasard
			  	randomNbAtk =Math.floor(Math.random() * (4)) + 0;
			  	attack = this.enemyAttackingPkm.pkm.moveList[randomNbAtk];

			  	this.message = this.enemyAttackingPkm.pkm.nom + " ennemi utilise " + attack.nom + " !";
			  	this.imgEffet = attack.img;
			/*  	this.isAttacking = true;*/

			  	setTimeout(() => {
				  	this.resoudreAttaque(attack,this.enemyAttackingPkm);
				  	this.isAttacking = false;

			  	}, 1000);
		    }else{
		    	this.isAttacking = false;
		    }
  	}, 1000);
  }


  checkDeath(event, bar){
  	//console.log(event);

  	//si pkm meurt -> changement de Pkm
  	if(event.value <= 0){
  		if(bar == 'joueur'){
  			//Verifier qu'il reste un pkm en vie
/*  			let estEnVie = false;
  			for(let i=0; i<this.myPkmTeam.length; i++){
  				if(this.myPkmTeam[i].pkm != null){
	  				if(this.myPkmTeam[i].pv.value > 0){
	  					estEnVie = true;
	  					break;
	  				}
  				}
  			}*/

  			this.message = this.myAttackingPkm.pkm.nom + " est KO!";
	  		this.isAttacking = true;

  			if(this.estEnVie('joueur') == true){
	  			setTimeout(() => {
	  				this.switchPkm('mort');
	  			}, 1000);
  			}else{
  				//GAME OVER
  				setTimeout(() => {
	  				this.message = "Tous vos pokemons sont KO, retour au dernier centre Pkm.";
	  				//Téléportation centre Pkm
	  				setTimeout(() => {
	  					this.navCtrl.push(VoyagePage);
	  				}, 1000);
	  			}, 2000);
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
  				if(this.typeCombat == 'sauvage'){
  					this.message = "Le " + this.enemyAttackingPkm.pkm.nom + " sauvage a été vaincu.";
	  				setTimeout(() => {
				  		this.navCtrl.push(VoyagePage);
				    }, 1000);
				}else{
					this.message = "L'adversaire a été vaincu!";
					if(this.typeCombat == 'rocket'){
						this.enemyAttackingPkm.pkm.imgFront ='team-rocket';
						setTimeout(() => {
					  		this.message = this.typeCombat + ": La team rocket s\'envolle vers d'autres cieuuuuux!";
					  		setTimeout(() => {
					  			this.navCtrl.push(VoyagePage);
					    	}, 2000);
					    }, 1000);
				    }else{
				    	this.enemyAttackingPkm.pkm.imgFront ='rival'
						setTimeout(() => {
					  		this.message = this.typeCombat + ": Je vais continuer à m\'entrainer.";
					  		setTimeout(() => {
					  			this.navCtrl.push(VoyagePage);
					    	}, 2000);
					    }, 1000);
				    }
					
				}
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


  resoudreAttaque(attack, attaquant){

  	let randomNb, randomNbEffet, coef, pkmAttaquant, pkmDefenseur: any;
  	pkmAttaquant = attaquant;

  	randomNb = Math.floor((Math.random() * 100) + 1);
  	randomNbEffet = Math.floor((Math.random() * 100) + 1);

  	if(pkmAttaquant == this.myAttackingPkm){
  		pkmDefenseur = this.enemyAttackingPkm;
  	}else{
  		pkmDefenseur = this.myAttackingPkm;
  	}

  	coef = this.getCoefTypeAttack(attack.type, pkmDefenseur.pkm.type1, pkmDefenseur.pkm.type2);

  	if(randomNb <= attack.precision){
  		//console.log(randomNb + "/" + attack.precision + "- reussi - " + attack.degats + "x" + coef + "degats.");
  		console.log(randomNb + "/" + attack.precision + "- reussi");

  		let formule = ((((pkmAttaquant.lvl * 0.4) + 2) * attack.degats / (pkmDefenseur.pkm.defenseBase)) + 2) * coef;
  		formule = Math.round(formule);
  		console.log("pvPerdus -> ((((" + pkmAttaquant.lvl + " x 0.4) + 2) x " + attack.degats + " / ( " + pkmDefenseur.pkm.defenseBase + " )) + 2) x " + coef + "= " + formule);

  		
  		if(attack.degats == 0){
  			//Cas ou c'est une attaque a effet
  			this.message = pkmAttaquant.pkm.nom +  " applique " + attack.effet;
  		}else{
  			pkmDefenseur.pv.value = pkmDefenseur.pv.value - formule;
  			
  			switch (coef) {
  			case 0:
  				this.message = "Aucun effet!";
  				break;
  			case 0.5:
  				this.message = "Ce n\'est pas très efficace!";
  				break;
  			case 2:
  				this.message = "C\'est très efficace!";
  				break;
  			default:
  				this.message = pkmAttaquant.pkm.nom + " inflige " + formule + " de dégats!" ;
/*  				if(randomNbEffet <= 25){
  					setTimeout(() => {
						this.message = pkmAttaquant.pkm.nom +  " applique " + attack.effet;
					}, 2000);
  				}*/
  				break;
  			}
  		}
  		
  	}else{
  		console.log(randomNb + "/" + attack.precision + "- raté");
  		this.message = pkmAttaquant.pkm.nom + " rate sa cible!";
  	}

  	this.attackPanel = false;
  	if(pkmAttaquant == this.myAttackingPkm){
			this.imgEffetEnemy = "";
  	}else{
  		this.imgEffet = "";
  	}
	  	
  }


  capture(pokeball, pokemon){

  	pokemon.statutPkm = 1;

  	let formule = (1 - (2/3 * pokemon.pv.value/pokemon.pv.max)) * pokemon.pkm.tauxCapture * pokeball.item.bonusBall * pokemon.statutPkm ;
  	console.log("(1 - (2/3 x " + pokemon.pv.value + " / " + pokemon.pv.max + ")) x " + pokemon.pkm.tauxCapture +  " x " + pokeball.item.bonusBall +  " x " + pokemon.statutPkm + " = " + formule);

  	setTimeout(() => {		
	  	if(formule >= 150){
	  		this.isCaptured = true;
	  		this.message = pokemon.pkm.nom + " est capturé!";
	  		console.log("Pokémon capturé");
	  		//Ajouter a l'équipe
	  		for(let i=1; i < 6; i++){
	  			if(this.myPkmTeam[i] == null || this.myPkmTeam[i] == null){
	  				this.myPkmTeam[i] = this.enemyAttackingPkm;
	  				//storage
	  				this.storage.set('save.myPkmTeam', this.myPkmTeam);
	  				break;
	  			}
	  		}
	  		
	  		setTimeout(() => {
				this.navCtrl.push(VoyagePage);
			}, 2000);

	  	}else{
	  		this.message = "Ah, " + pokemon.pkm.nom + " s\'est échapé!"
	  		console.log("Pokemon échappé");

	  	}
  	}, 2000);

  }

  creerEnemyTeam(typeCombat){

  	let randomNb, randomLvl: any;
	this.enemyPkmTeam = [{},{},{},{},{},{}];

	switch (typeCombat) {
		case "sauvage":
  			randomNb = Math.floor(Math.random() * this.pokemonList.length);
  			this.enemyPkmTeam[0].pkm = this.pokemonList[randomNb];
  			randomLvl = Math.floor((Math.random() * 3) + 1);
			this.enemyPkmTeam[0].lvl = randomLvl;
			this.enemyPkmTeam[0].pv = {};
			this.enemyPkmTeam[0].pv.value = 100;
			this.enemyPkmTeam[0].pv.max  = 100;
			this.message = "Un " + this.enemyPkmTeam[0].pkm.nom + " sauvage apparait!";
			break;
/*		case "rival":
			break;
		case "rocket":
			break;*/
		default:
			for(let i = 0; i < 3 ; i++) {
				randomNb = Math.floor(Math.random() * this.pokemonList.length);
	  			this.enemyPkmTeam[i].pkm = this.pokemonList[randomNb];
	  			randomLvl = Math.floor((Math.random() * 5) + 1);
				this.enemyPkmTeam[i].lvl = randomLvl;
				this.enemyPkmTeam[i].pv = {};
				this.enemyPkmTeam[i].pv.value = 100;
				this.enemyPkmTeam[i].pv.max  = 100;

			}
			this.message = "Un dresseur veut se battre!";
			this.enemyAttackingPkm.pkm.imgFront ='rival';
			setTimeout(() => {
				this.message = "Le dresseur envoie " + this.enemyPkmTeam[0].pkm.nom + " !";
			}, 2000);
			break;
	}

	this.enemyAttackingPkm = this.enemyPkmTeam[0];
  }

  getCoefTypeAttack(typeAttack, typePkm1, typePkm2){
  	let coef = 1;

  	switch (typeAttack) {
		case "Normal":
			switch(typePkm1){
				case "Roche":
					coef = 0.5;
					break;
				case "Spectre":
					coef = 0;
					break;
				case "Acier":
					coef = 0.5;
					break;
				default:
					coef = 1;
					break;
			}
			break;
		case "Feu":
			switch(typePkm1){
				case "Feu":
					coef = 0.5;
					break;
				case "Eau":
					coef = 0.5;
					break;
				case "Plante":
					coef = 2;
					break;
				case "Glace":
					coef = 2;
					break;
				case "Insecte":
					coef = 2;
					break;
				case "Roche":
					coef = 0.5;
					break;
				case "Dragon":
					coef = 0.5;
					break;
				case "Acier":
					coef = 2;
					break;
				default:
					coef = 1;
					break;
			}
			break;
		case "Eau":
			switch(typePkm1){
				case "Feu":
					coef = 2;
					break;
				case "Eau":
					coef = 0.5;
					break;
				case "Plante":
					coef = 0.5;
					break;
				case "Sol":
					coef = 2;
					break;
				case "Roche":
					coef = 2;
					break;
				case "Dragon":
					coef = 0.5;
					break;
				default:
					coef = 1;
					break;
			}
			break;
		case "Plante":
			switch(typePkm1){
				case "Feu":
					coef = 0.5;
					break;
				case "Eau":
					coef = 2;
					break;
				case "Plante":
					coef = 0.5;
					break;
				case "Poison":
					coef = 0.5;
					break;
				case "Sol":
					coef = 2;
					break;
				case "Vol":
					coef = 0.5;
					break;
				case "Insecte":
					coef = 0.5;
					break;
				case "Roche":
					coef = 2;
					break;
				case "Dragon":
					coef = 0.5;
					break;
				case "Acier":
					coef = 0.5;
					break;
				default:
					coef = 1;
					break;
			}
			break;
		case "Electrik":
			switch(typePkm1){
				case "Eau":
					coef = 2;
					break;
				case "Plante":
					coef = 0.5;
					break;
				case "Electrik":
					coef = 0.5;
					break;
				case "Sol":
					coef = 0;
					break;
				case "Vol":
					coef = 2;
					break;
				case "Dragon":
					coef = 0.5;
					break;
				default:
					coef = 1;
					break;
			}
			break;
		case "Glace":
			switch(typePkm1){
				case "Feu":
					coef = 0.5;
					break;
				case "Eau":
					coef = 0.5;
					break;
				case "Plante":
					coef = 2;
					break;
				case "Glace":
					coef = 0.5;
					break;
				case "Sol":
					coef = 2;
					break;
				case "Vol":
					coef = 2;
					break;
				case "Dragon":
					coef = 2;
					break;
				case "Acier":
					coef = 0.5;
					break;
				default:
					coef = 1;
					break;
			}
			break;	
		case "Combat":
			switch(typePkm1){
				case "Normal":
					coef = 2;
					break;
				case "Glace":
					coef = 2;
					break;
				case "Poison":
					coef = 0.5;
					break;
				case "Vol":
					coef = 0.5;
					break;
				case "Psy":
					coef = 0.5;
					break;
				case "Insecte":
					coef = 0.5;
					break;
				case "Roche":
					coef = 2;
					break;
				case "Spectre":
					coef = 0;
					break;
				case "Ténèbres":
					coef = 2;
					break;
				case "Acier":
					coef = 2;
					break;
				default:
					coef = 1;
					break;
			}
			break;
		case "Poison":
			switch(typePkm1){
				case "Plante":
					coef = 2;
					break;
				case "Poison":
					coef = 0.5;
					break;
				case "Sol":
					coef = 0.5;
					break;
				case "Roche":
					coef = 0.5;
					break;
				case "Spectre":
					coef = 0.5;
					break;
				case "Acier":
					coef = 0;
					break;
				default:
					coef = 1;
					break;
			}
			break;
		case "Sol":
			switch(typePkm1){
				case "Feu":
					coef = 2;
					break;
				case "Plante":
					coef = 0.5;
					break;
				case "Electrik":
					coef = 2;
					break;
				case "Poison":
					coef = 2;
					break;
				case "Vol":
					coef = 0;
					break;
				case "Insecte":
					coef = 0.5;
					break;
				case "Roche":
					coef = 2;
					break;
				case "Acier":
					coef = 2;
					break;
				default:
					coef = 1;
					break;
			}
			break;
		case "Vol":
			switch(typePkm1){
				case "Plante":
					coef = 2;
					break;
				case "Electrik":
					coef = 0.5;
					break;
				case "Combat":
					coef = 2;
					break;
				case "Insecte":
					coef = 2;
					break;
				case "Roche":
					coef = 0.5;
					break;
				case "Acier":
					coef = 0.5;
					break;
				default:
					coef = 1;
					break;
			}
			break;
		case "Psy":
			switch(typePkm1){
				case "Combat":
					coef = 2;
					break;
				case "Poison":
					coef = 2;
					break;
				case "Psy":
					coef = 0.5;
					break;
				case "Ténèbres":
					coef = 0;
					break;
				case "Acier":
					coef = 0.5;
					break;
				default:
					coef = 1;
					break;
			}
			break;
		case "Insecte":
			switch(typePkm1){
				case "Feu":
					coef = 0.5;
					break;
				case "Plante":
					coef = 2;
					break;
				case "Combat":
					coef = 0.5;
					break;
				case "Poison":
					coef = 0.5;
					break;
				case "Vol":
					coef = 0.5;
					break;
				case "Psy":
					coef = 2;
					break;
				case "Spectre":
					coef = 0.5;
					break;
				case "Ténèbres":
					coef = 2;
					break;
				case "Acier":
					coef = 0.5;
					break;
				default:
					coef = 1;
					break;
			}
			break;
		default:
			coef = 1;
			break; 

  	}

  return coef;

  }

}
