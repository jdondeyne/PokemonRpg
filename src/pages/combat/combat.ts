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
  imgEffet:any;
  imgEffetEnemy:any;
  typeCombat: any;
  idLieu: any;

  pokemonList: any = {};
/*  itemList: any = {};*/

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
  	this.storage.get('pokemonList').then((val) => {
  		this.pokemonList = val;
  	});

  	this.storage.get('save.myPkmTeam').then((val) => {
  		this.myPkmTeam = val;
  		this.creerPkmTeam();
  	});

  	this.typeCombat = this.navParams.get('type');
  	this.idLieu = this.navParams.get('lieu');

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
	          label: this.myItemList[i].nom + ' - x' + this.myItemList[i].quantite ,
	          value: this.myItemList[i]
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
      		if(this.estEnVie('bot') == true){
	  			this.enemyTurn();
	  		}
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
	let randomNb, randomNbAtk: any;
	let attack: any;
	

	setTimeout(() => {
			if(this.enemyAttackingPkm.pv.value > 0){
			  	//choisir un attaque au hasard
			  	randomNbAtk =Math.floor(Math.random() * (4)) + 0;
			  	attack = this.enemyAttackingPkm.pkm.moveList[randomNbAtk];

			  	this.message = this.enemyAttackingPkm.pkm.nom + " ennemi utilise " + attack.nom + " !";
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
  				if(this.typeCombat == 'sauvage'){
  					this.message = "Le " + this.enemyAttackingPkm.pkm.nom + " sauvage a été vaincu.";
	  				setTimeout(() => {
				  		this.navCtrl.push(VoyagePage);
				    }, 1000);
				}else{
					this.message = "L'adversaire a été vaincu!";
					if(this.typeCombat == 'rocket'){
						this.enemyAttackingPkm.pkm.imgFront ='team-rocket'
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

  creerPkmTeam(){
    // ########################### Generer Mon pkm ###########################

	this.myAttackingPkm = this.myPkmTeam[0];

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

}
