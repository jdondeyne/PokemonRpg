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
        this.imgEffet = "";
        this.imgEffetEnemy = "";
        this.myItemList = [];
        this.enemyAttackingPkm = {};
        this.myAttackingPkm = {};
        this.enemyAttackingPkm.pv = {};
        this.myAttackingPkm.pv = {};
        this.enemyAttackingPkm.pkm = {};
        this.myAttackingPkm.pkm = {};
        this.enemyAttackingPkm.pkm.moveList = [];
        this.myAttackingPkm.pkm.moveList = [];
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
        ];
    }
    CombatPage.prototype.ionViewWillEnter = function () {
        var _this = this;
        this.storage.get('pokemonList').then(function (val) {
            _this.pokemonList = val;
            _this.creerPkmTeam();
        });
    };
    CombatPage.prototype.attack = function () {
        this.attackPanel = true;
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
                        _this.enemyTurn();
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
        for (i = 0; i < this.itemList.length; i++) {
            if (this.itemList[i] != null) {
                alert.addInput({
                    type: 'radio',
                    label: this.itemList[i].nom + ' - x' + this.itemList[i].quantite,
                    value: this.itemList[i]
                });
            }
        }
        alert.addButton('Retour');
        alert.addButton({
            text: 'Utiliser',
            handler: function (data) {
                if (data.enCombat == true) {
                    console.log('Objet utilisé:', data);
                    switch (data.nom) {
                        case 'Potion':
                            _this.message = "Vous utilisez " + data.nom + " sur " + _this.myAttackingPkm.pkm.nom;
                            _this.myAttackingPkm.pv.value = _this.myAttackingPkm.pv.value + 40;
                            break;
                        case 'Pokeball':
                            _this.message = "Vous utilisez " + data.nom + " sur " + _this.enemyAttackingPkm.pkm.nom;
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
                    _this.enemyTurn();
                }
                else {
                    console.log('Objet hors combat:', data);
                    _this.message = data.nom + " doit être utilisé hors combat.";
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
        this.imgEffetEnemy = attack.img;
        var randomNb;
        randomNb = Math.floor((Math.random() * 100) + 1);
        setTimeout(function () {
            if (randomNb <= attack.precision) {
                console.log(randomNb + "/" + attack.precision + "- reussi");
                _this.message = "C\'est très efficace!";
                _this.enemyAttackingPkm.pv.value = _this.enemyAttackingPkm.pv.value - attack.degats;
                //--> Tour adverse
            }
            else {
                console.log(randomNb + "/" + attack.precision + "- raté");
                _this.message = _this.myAttackingPkm.pkm.nom + " rate sa cible!";
                //--> Tour adverse
            }
            //this.isAttacking = false;
            _this.attackPanel = false;
            _this.imgEffetEnemy = "";
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
                        var randomNb;
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
                        }
                    }
                }
            ]
        });
        alert.present();
    };
    CombatPage.prototype.enemyTurn = function () {
        var _this = this;
        var randomNb, randomNbAtk;
        var attack;
        setTimeout(function () {
            //choisir un attaque au hasard
            randomNbAtk = Math.floor(Math.random() * (4)) + 0;
            attack = _this.enemyAttackingPkm.pkm.moveList[randomNbAtk];
            _this.message = _this.enemyAttackingPkm.pkm.nom + " ennemi utilise " + attack.nom + " !";
            _this.imgEffet = attack.img;
            /*  	this.isAttacking = true;*/
            randomNb = Math.floor((Math.random() * 100) + 1);
            setTimeout(function () {
                if (randomNb <= attack.precision) {
                    console.log(randomNb + "/" + attack.precision + "- reussi");
                    _this.message = "C\'est très efficace!";
                    _this.myAttackingPkm.pv.value = _this.myAttackingPkm.pv.value - attack.degats;
                    //--> Tour adverse
                }
                else {
                    console.log(randomNb + "/" + attack.precision + "- raté");
                    _this.message = _this.enemyAttackingPkm.pkm.nom + " rate sa cible!";
                    //--> Tour adverse
                }
                _this.isAttacking = false;
                _this.imgEffet = "";
            }, 1000);
        }, 1000);
    };
    CombatPage.prototype.checkDeath = function (event, bar) {
        //console.log(event);
        var _this = this;
        //si pkm meurt -> changement de Pkm
        if (event.value <= 0) {
            if (bar == 'joueur') {
                //Verifier qu'il reste un pkm en vie
                var estEnVie = false;
                for (var i = 0; i < this.myPkmTeam.length; i++) {
                    if (this.myPkmTeam[i].pkm != null) {
                        if (this.myPkmTeam[i].pv.value > 0) {
                            estEnVie = true;
                            break;
                        }
                    }
                }
                this.message = this.myAttackingPkm.pkm.nom + " est KO!";
                this.isAttacking = true;
                if (estEnVie == true) {
                    setTimeout(function () {
                        _this.switchPkm('mort');
                    }, 1000);
                }
                else {
                    //GAME OVER
                    setTimeout(function () {
                        _this.message = "Tous vos pokemons sont KO, retour au dernier centre Pkm.";
                        //Téléportation centre Pkm
                    }, 1000);
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
                    this.message = "L'adversaire a été vaincu!";
                    setTimeout(function () {
                        _this.navCtrl.push(VoyagePage);
                    }, 1000);
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
    CombatPage.prototype.creerPkmTeam = function () {
        // ########################### Generer Mon pkm ###########################
        this.myPkmTeam = [{}, {}, {}, {}, {}, {}];
        for (var i = 0; i < 4; i++) {
            this.myPkmTeam[i].pkm = this.pokemonList[i];
            this.myPkmTeam[i].lvl = i + 1;
            this.myPkmTeam[i].exp = 0;
            this.myPkmTeam[i].pv = {};
            this.myPkmTeam[i].pv.value = i * 10;
            this.myPkmTeam[i].pv.max = 150;
        }
        console.log(this.myPkmTeam);
        this.myAttackingPkm = this.myPkmTeam[1];
        console.log(this.myAttackingPkm);
        // ########################### Generer pkm adverse ###########################
        this.enemyPkmTeam = [{}, {}, {}, {}, {}, {}];
        this.enemyPkmTeam[0].pkm = this.pokemonList[2];
        this.enemyPkmTeam[0].lvl = 1;
        this.enemyPkmTeam[0].exp = 0;
        this.enemyPkmTeam[0].pv = {};
        this.enemyPkmTeam[0].pv.value = 10;
        this.enemyPkmTeam[0].pv.max = 200;
        this.enemyPkmTeam[1].pkm = this.pokemonList[3];
        this.enemyPkmTeam[1].lvl = 1;
        this.enemyPkmTeam[1].exp = 0;
        this.enemyPkmTeam[1].pv = {};
        this.enemyPkmTeam[1].pv.value = 20;
        this.enemyPkmTeam[1].pv.max = 150;
        this.enemyAttackingPkm = this.enemyPkmTeam[0];
    };
    CombatPage = __decorate([
        Component({
            selector: 'page-combat',
            templateUrl: 'combat.html',
        }),
        __metadata("design:paramtypes", [NavController, AlertController, NavParams, Storage])
    ], CombatPage);
    return CombatPage;
}());
export { CombatPage };
//# sourceMappingURL=combat.js.map