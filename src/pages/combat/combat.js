var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from '@angular/core';
import { NavController, AlertController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { VoyagePage } from '../../pages/voyage/voyage';
var CombatPage = /** @class */ (function () {
    function CombatPage(navCtrl, alertCtrl, navParams, storage) {
        this.navCtrl = navCtrl;
        this.alertCtrl = alertCtrl;
        this.navParams = navParams;
        this.storage = storage;
        this.pokemonList = {};
        this.itemList = {};
        this.myPkmTeam = {};
        this.enemyPkmTeam = {};
        this.myAttackingPkm = {};
        this.enemyAttackingPkm = {};
        this.myItemList = {};
        this.attackPanel = false;
        this.message = "";
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
    CombatPage.prototype.ionViewWillEnter = function () {
        var _this = this;
        this.typeCombat = this.navParams.get('type');
        this.idLieu = this.navParams.get('lieu');
        this.storage.get('pokemonList').then(function (val) {
            _this.pokemonList = val;
        });
        this.storage.get('itemList').then(function (val) {
            _this.itemList = val;
        });
        this.storage.get('save.myPkmTeam').then(function (val) {
            _this.myPkmTeam = val;
            _this.myAttackingPkm = _this.myPkmTeam[0];
            _this.creerEnemyTeam(_this.typeCombat);
        });
        this.storage.get('save.myItemList').then(function (val) {
            _this.myItemList = val;
            console.log(_this.myItemList);
        });
    };
    CombatPage.prototype.attack = function () {
        this.attackPanel = true;
    };
    CombatPage.prototype.back = function () {
        this.attackPanel = false;
    };
    CombatPage.prototype.switchPkm = function (raison) {
        var _this = this;
        var alert = this.alertCtrl.create();
        alert.setTitle('Changer de Pokémon');
        var i;
        for (i = 0; i < this.myPkmTeam.length; i++) {
            if (this.myPkmTeam[i].pkm != null) {
                if (this.myPkmTeam[i].pv.value > 0) {
                    alert.addInput({
                        type: 'radio',
                        label: this.myPkmTeam[i].pkm.nom + ' - lvl ' + this.myPkmTeam[i].lvl + ' - ' + this.myPkmTeam[i].pv.value + '/' + this.myPkmTeam[i].pv.max + 'pv',
                        value: this.myPkmTeam[i]
                    });
                }
                else {
                    alert.addInput({
                        type: 'radio',
                        label: this.myPkmTeam[i].pkm.nom + ' - lvl ' + this.myPkmTeam[i].lvl + ' - KO',
                        value: this.myPkmTeam[i]
                    });
                }
            }
        }
        if (raison == 'switch') {
            alert.addButton('Retour');
        }
        alert.addButton({
            text: 'Choisir',
            handler: function (data) {
                if (data.pv.value == 0) {
                    console.log('Pokemon KO.', data);
                    _this.message = "Changement impossible, " + data.pkm.nom + " est KO.";
                    _this.switchPkm(raison);
                }
                else {
                    if (data == _this.myAttackingPkm) {
                        _this.message = data.pkm.nom + " est déja au combat!";
                    }
                    else {
                        console.log('Pokemon echangé:', data);
                        _this.message = data.pkm.nom + " en avant!";
                        _this.myAttackingPkm = data;
                        //--> Tour adverse
                        if (_this.estEnVie('bot') == true) {
                            _this.enemyTurn();
                        }
                    }
                }
            }
        });
        alert.present();
    };
    CombatPage.prototype.useItem = function () {
        var _this = this;
        var alert = this.alertCtrl.create();
        alert.setTitle('Choisir un objet à utiliser');
        var i;
        for (i = 0; i < this.myItemList.length; i++) {
            if (this.myItemList[i] != null) {
                alert.addInput({
                    type: 'radio',
                    label: this.myItemList[i].item.nom + ' - x' + this.myItemList[i].quantite,
                    value: this.myItemList[i]
                });
            }
        }
        alert.addButton('Retour');
        alert.addButton({
            text: 'Utiliser',
            handler: function (data) {
                if (data.enCombat == false) {
                    console.log('Objet hors combat:', data);
                    _this.message = data.nom + " doit être utilisé hors combat.";
                }
                else {
                    console.log('Objet utilisé:', data);
                    if (data.bonusBall != null || data.bonusBall != "") {
                        //C'est une pokeball
                        if (_this.typeCombat == "sauvage") {
                            _this.message = "Vous utilisez " + data.item.nom + " sur " + _this.enemyAttackingPkm.pkm.nom;
                            data.quantite = data.quantite - 1;
                            _this.capture(data, _this.enemyAttackingPkm);
                            //TODO -> storage
                        }
                        else {
                            _this.message = "Vous ne pouvez pas capturer les pkm des autres dresseurs!";
                        }
                    }
                    else {
                        if (data.pvRendus != null || data.pvRendus != "") {
                            //C'est une potion
                            _this.message = "Vous utilisez " + data.nom + " sur " + _this.myAttackingPkm.pkm.nom;
                            _this.myAttackingPkm.pv.value = _this.myAttackingPkm.pv.value + data.pvRendus;
                            data.quantite = data.quantite - 1;
                            //TODO -> storage
                        }
                    }
                    if (_this.estEnVie('bot') == true) {
                        _this.enemyTurn();
                    }
                }
            }
        });
        alert.present();
    };
    CombatPage.prototype.useAttack = function (attack) {
        var _this = this;
        console.log(attack);
        this.message = this.myAttackingPkm.pkm.nom + " utilise " + attack.nom + " !";
        this.isAttacking = true;
        setTimeout(function () {
            _this.resoudreAttaque(attack, _this.myAttackingPkm);
            //--> Tour adverse
            if (_this.estEnVie('bot') == true) {
                _this.enemyTurn();
            }
        }, 1000);
    };
    CombatPage.prototype.run = function () {
        var _this = this;
        var alert = this.alertCtrl.create({
            title: 'Prendre la fuite?',
            message: 'Vous quitterez le combat.',
            buttons: [
                {
                    text: 'Non',
                    role: 'cancel',
                    handler: function () { }
                },
                {
                    text: 'Oui',
                    handler: function () {
                        if (_this.typeCombat == 'sauvage') {
                            var randomNb = void 0;
                            randomNb = Math.floor((Math.random() * 100) + 1);
                            if (randomNb > 30) {
                                _this.message = "Vous prenez la fuite!";
                                console.log(randomNb + " > 30 - réussi");
                                //--> Retour ecran voyage
                                setTimeout(function () {
                                    _this.navCtrl.push(VoyagePage);
                                }, 1000);
                            }
                            else {
                                _this.message = "Impossible de fuir!";
                                console.log(randomNb + " <= 30 - raté");
                                //--> Tour adverse
                                if (_this.estEnVie('bot') == true) {
                                    _this.enemyTurn();
                                }
                            }
                        }
                        else {
                            _this.message = "Vous ne pouvez pas fuir un combat de dresseurs!";
                        }
                    }
                }
            ]
        });
        alert.present();
    };
    CombatPage.prototype.enemyTurn = function () {
        var _this = this;
        var randomNbAtk;
        var attack;
        setTimeout(function () {
            if (_this.enemyAttackingPkm.pv.value > 0 && _this.isCaptured == false) {
                //choisir un attaque au hasard
                randomNbAtk = Math.floor(Math.random() * (4)) + 0;
                attack = _this.enemyAttackingPkm.pkm.moveList[randomNbAtk];
                _this.message = _this.enemyAttackingPkm.pkm.nom + " ennemi utilise " + attack.nom + " !";
                _this.imgEffet = attack.img;
                /*  	this.isAttacking = true;*/
                setTimeout(function () {
                    _this.resoudreAttaque(attack, _this.enemyAttackingPkm);
                    _this.isAttacking = false;
                }, 1000);
            }
            else {
                _this.isAttacking = false;
            }
        }, 1000);
    };
    CombatPage.prototype.checkDeath = function (event, bar) {
        //console.log(event);
        var _this = this;
        //si pkm meurt -> changement de Pkm
        if (event.value <= 0) {
            if (bar == 'joueur') {
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
                if (this.estEnVie('joueur') == true) {
                    setTimeout(function () {
                        _this.switchPkm('mort');
                    }, 1000);
                }
                else {
                    //GAME OVER
                    setTimeout(function () {
                        _this.message = "Tous vos pokemons sont KO, retour au dernier centre Pkm.";
                        //Téléportation centre Pkm
                        setTimeout(function () {
                            _this.navCtrl.push(VoyagePage);
                        }, 1000);
                    }, 2000);
                }
            }
            else {
                this.message = this.enemyAttackingPkm.pkm.nom + " est KO!";
                //Verifier qu'il reste un pkm en vie
                if (this.estEnVie('bot') == true) {
                    var _loop_1 = function (i) {
                        if (this_1.enemyPkmTeam[i].pkm != null) {
                            if (this_1.enemyPkmTeam[i].pv.value > 0) {
                                this_1.message = "L'adversaire envoie " + this_1.enemyPkmTeam[i].pkm.nom;
                                setTimeout(function () {
                                    _this.enemyAttackingPkm = _this.enemyPkmTeam[i];
                                }, 1000);
                                return "break";
                            }
                        }
                    };
                    var this_1 = this;
                    //Faire changer de pkm le PC
                    for (var i = 0; i < this.enemyPkmTeam.length; i++) {
                        var state_1 = _loop_1(i);
                        if (state_1 === "break")
                            break;
                    }
                }
                else {
                    //Combat réussi
                    if (this.typeCombat == 'sauvage') {
                        this.message = "Le " + this.enemyAttackingPkm.pkm.nom + " sauvage a été vaincu.";
                        setTimeout(function () {
                            _this.navCtrl.push(VoyagePage);
                        }, 1000);
                    }
                    else {
                        this.message = "L'adversaire a été vaincu!";
                        if (this.typeCombat == 'rocket') {
                            this.enemyAttackingPkm.pkm.imgFront = 'team-rocket';
                            setTimeout(function () {
                                _this.message = _this.typeCombat + ": La team rocket s\'envolle vers d'autres cieuuuuux!";
                                setTimeout(function () {
                                    _this.navCtrl.push(VoyagePage);
                                }, 2000);
                            }, 1000);
                        }
                        else {
                            this.enemyAttackingPkm.pkm.imgFront = 'rival';
                            setTimeout(function () {
                                _this.message = _this.typeCombat + ": Je vais continuer à m\'entrainer.";
                                setTimeout(function () {
                                    _this.navCtrl.push(VoyagePage);
                                }, 2000);
                            }, 1000);
                        }
                    }
                }
            }
        }
    };
    CombatPage.prototype.estEnVie = function (joueur) {
        var team;
        var estEnVie = false;
        if (joueur == 'joueur') {
            team = this.myPkmTeam;
        }
        else {
            team = this.enemyPkmTeam;
        }
        for (var i = 0; i < team.length; i++) {
            if (team[i].pkm != null) {
                if (team[i].pv.value > 0) {
                    estEnVie = true;
                    break;
                }
            }
        }
        return estEnVie;
    };
    CombatPage.prototype.resoudreAttaque = function (attack, attaquant) {
        var _this = this;
        var randomNb, randomNbEffet, coef, pkmAttaquant, pkmDefenseur;
        pkmAttaquant = attaquant;
        randomNb = Math.floor((Math.random() * 100) + 1);
        randomNbEffet = Math.floor((Math.random() * 100) + 1);
        if (pkmAttaquant == this.myAttackingPkm) {
            pkmDefenseur = this.enemyAttackingPkm;
        }
        else {
            pkmDefenseur = this.myAttackingPkm;
        }
        coef = this.getCoefTypeAttack(attack.type, pkmDefenseur.pkm.type1, pkmDefenseur.pkm.type2);
        if (randomNb <= attack.precision) {
            console.log(randomNb + "/" + attack.precision + "- reussi - " + attack.degats + "x" + coef + "degats.");
            pkmDefenseur.pv.value = pkmDefenseur.pv.value - (attack.degats * coef);
            if (attack.degats == 0) {
                //Cas ou c'est une attaque a effet
                this.message = pkmAttaquant.pkm.nom + " applique " + attack.effet;
            }
            else {
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
                        this.message = pkmAttaquant.pkm.nom + " inflige " + attack.degats * coef + " de dégats";
                        if (randomNbEffet <= 25) {
                            setTimeout(function () {
                                _this.message = pkmAttaquant.pkm.nom + " applique " + attack.effet;
                            }, 2000);
                        }
                        break;
                }
            }
        }
        else {
            console.log(randomNb + "/" + attack.precision + "- raté");
            this.message = pkmAttaquant.pkm.nom + " rate sa cible!";
        }
        this.attackPanel = false;
        if (pkmAttaquant == this.myAttackingPkm) {
            this.imgEffetEnemy = "";
        }
        else {
            this.imgEffet = "";
        }
    };
    CombatPage.prototype.capture = function (pokeball, pokemon) {
        var _this = this;
        pokemon.statutPkm = 1;
        var formule = (1 - (2 / 3 * pokemon.pv.value / pokemon.pv.max)) * pokemon.pkm.tauxCapture * pokeball.item.bonusBall * pokemon.statutPkm;
        console.log("(1 - (2/3 x " + pokemon.pv.value + " / " + pokemon.pv.max + ")) x " + pokemon.pkm.tauxCapture + " x " + pokeball.item.bonusBall + " x " + pokemon.statutPkm + " = " + formule);
        setTimeout(function () {
            if (formule >= 150) {
                _this.isCaptured = true;
                _this.message = pokemon.pkm.nom + " est capturé!";
                console.log("Pokémon capturé");
                //Ajouter a l'équipe
                for (var i = 0; i < 6; i++) {
                    if ()
                        ;
                }
                setTimeout(function () {
                    _this.navCtrl.push(VoyagePage);
                }, 2000);
            }
            else {
                _this.message = "Ah, " + pokemon.pkm.nom + " s\'est échapé!";
                console.log("Pokemon échappé");
            }
        }, 2000);
    };
    CombatPage.prototype.creerEnemyTeam = function (typeCombat) {
        var _this = this;
        var randomNb, randomLvl;
        this.enemyPkmTeam = [{}, {}, {}, {}, {}, {}];
        switch (typeCombat) {
            case "sauvage":
                randomNb = Math.floor(Math.random() * this.pokemonList.length);
                this.enemyPkmTeam[0].pkm = this.pokemonList[randomNb];
                randomLvl = Math.floor((Math.random() * 3) + 1);
                this.enemyPkmTeam[0].lvl = randomLvl;
                this.enemyPkmTeam[0].pv = {};
                this.enemyPkmTeam[0].pv.value = 100;
                this.enemyPkmTeam[0].pv.max = 100;
                this.message = "Un " + this.enemyPkmTeam[0].pkm.nom + " sauvage apparait!";
                break;
            /*		case "rival":
                        break;
                    case "rocket":
                        break;*/
            default:
                for (var i = 0; i < 3; i++) {
                    randomNb = Math.floor(Math.random() * this.pokemonList.length);
                    this.enemyPkmTeam[i].pkm = this.pokemonList[randomNb];
                    randomLvl = Math.floor((Math.random() * 5) + 1);
                    this.enemyPkmTeam[i].lvl = randomLvl;
                    this.enemyPkmTeam[i].pv = {};
                    this.enemyPkmTeam[i].pv.value = 100;
                    this.enemyPkmTeam[i].pv.max = 100;
                }
                this.message = "Un dresseur veut se battre!";
                this.enemyAttackingPkm.pkm.imgFront = 'rival';
                setTimeout(function () {
                    _this.message = "Le dresseur envoie " + _this.enemyPkmTeam[0].pkm.nom + " !";
                }, 2000);
                break;
        }
        this.enemyAttackingPkm = this.enemyPkmTeam[0];
    };
    CombatPage.prototype.getCoefTypeAttack = function (typeAttack, typePkm1, typePkm2) {
        var coef = 1;
        switch (typeAttack) {
            case "Normal":
                switch (typePkm1) {
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
                switch (typePkm1) {
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
                switch (typePkm1) {
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
                switch (typePkm1) {
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
                switch (typePkm1) {
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
                switch (typePkm1) {
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
                switch (typePkm1) {
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
                switch (typePkm1) {
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
                switch (typePkm1) {
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
                switch (typePkm1) {
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
                switch (typePkm1) {
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
                switch (typePkm1) {
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
    };
    CombatPage = __decorate([
        Component({
            selector: 'page-combat',
            templateUrl: 'combat.html',
        }),
        __metadata("design:paramtypes", [NavController, AlertController,
            NavParams, Storage])
    ], CombatPage);
    return CombatPage;
}());
export { CombatPage };
//# sourceMappingURL=combat.js.map