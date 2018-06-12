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
import { NavController, AlertController, LoadingController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { CombatPage } from '../../pages/combat/combat';
import { VoyagePage } from '../../pages/voyage/voyage';
import { StarterPage } from '../../pages/starter/starter';
var HomePage = /** @class */ (function () {
    function HomePage(navCtrl, alertCtrl, storage, loadingCtrl) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.alertCtrl = alertCtrl;
        this.storage = storage;
        this.loadingCtrl = loadingCtrl;
        this.pokemonList = {};
        this.itemList = {};
        var loading = this.loadingCtrl.create({
            content: 'Création BDD Pkm...'
        });
        loading.present();
        this.isStarted = false;
        //Verifier que le jeu a déja été lancé 1 fois
        this.storage.get('pokemonList').then(function (val) {
            console.log(val);
            if (val == null) {
                _this.creerBDDPkm();
                _this.creerBDDItem();
            }
            loading.dismiss();
        });
        //Verifier qu'on a déja une sauvegarde
        this.storage.get('save.myPkmTeam').then(function (val) {
            console.log(val);
            if (val != null) {
                _this.isStarted = true;
            }
        });
    }
    HomePage.prototype.startNewGame = function () {
        var _this = this;
        if (this.isStarted == true) {
            var alert_1 = this.alertCtrl.create({
                title: 'Nouvelle partie?',
                message: 'Cela écrasera votre sauvegarde actuelle.',
                buttons: [
                    {
                        text: 'Non',
                        role: 'cancel'
                    },
                    {
                        text: 'Oui',
                        handler: function () {
                            //Ecraser sauvegarde
                            console.log("New game");
                            _this.createNewGame();
                        }
                    }
                ]
            });
            alert_1.present();
        }
        else {
            console.log("New game");
            this.isStarted = true;
            this.createNewGame();
        }
    };
    HomePage.prototype.continueGame = function () {
        console.log("Continue");
    };
    HomePage.prototype.goToVoyagePage = function () {
        this.navCtrl.push(VoyagePage);
    };
    HomePage.prototype.goToCombatPage = function () {
        this.navCtrl.push(CombatPage);
    };
    HomePage.prototype.goToOptionsPage = function () {
        console.log("-> Options page");
    };
    HomePage.prototype.creerBDDPkm = function () {
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
                        precision: 100,
                        effet: 'Defense-'
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
        ];
        this.storage.set('pokemonList', this.pokemonList);
    };
    HomePage.prototype.creerBDDItem = function () {
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
        ];
        this.storage.set('itemList', this.itemList);
    };
    HomePage.prototype.createNewGame = function () {
        var myPkmTeam = {};
        var myItemList = {};
        myItemList = [
            {
                item: this.itemList[4],
                quantite: 1
            },
            {
                item: this.itemList[0],
                quantite: 5
            }
        ];
        //Creer 6 slots + 1er Pkm
        myPkmTeam = [{}, {}, {}, {}, {}, {}];
        /*	myPkmTeam[0].pkm = this.pokemonList[0];
            myPkmTeam[0].lvl = 5;
            myPkmTeam[0].exp = 0;
            myPkmTeam[0].pv = {};
            myPkmTeam[0].pv.value = 100;
            myPkmTeam[0].pv.max  = 100;*/
        this.storage.set('save.myItemList', myItemList);
        this.storage.set('save.myPkmTeam', myPkmTeam);
        this.navCtrl.push(StarterPage);
    };
    HomePage = __decorate([
        Component({
            selector: 'page-home',
            templateUrl: 'home.html'
        }),
        __metadata("design:paramtypes", [NavController, AlertController, Storage, LoadingController])
    ], HomePage);
    return HomePage;
}());
export { HomePage };
//# sourceMappingURL=home.js.map