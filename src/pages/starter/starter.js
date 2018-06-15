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
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { VoyagePage } from '../../pages/voyage/voyage';
/**
 * Generated class for the Starter page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var StarterPage = /** @class */ (function () {
    function StarterPage(navCtrl, navParams, storage, alertCtrl) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.storage = storage;
        this.alertCtrl = alertCtrl;
        this.hasFinished = false;
        this.showName = false;
        this.showStarters = false;
        this.nbMessage = 0;
        this.myPkmTeam = [{}, {}, {}, {}, {}, {}];
        this.message = "Oh bonjour, tu dois être le nouveau dresseur, mais quel est ton nom?";
        setTimeout(function () {
            _this.showName = true;
            _this.hasFinished = true;
        }, 2000);
    }
    StarterPage.prototype.ionViewDidLoad = function () {
        var _this = this;
        this.storage.get('pokemonList').then(function (val) {
            console.log(val);
            _this.pokemonList = val;
        });
    };
    StarterPage.prototype.next = function () {
        switch (this.nbMessage) {
            case 0:
                this.message = "D\'accord, tu t'appelle " + this.nom;
                this.showName = false;
                break;
            case 1:
                this.message = "Le monde est rempli de créatures étonnantes que l\'on appelle Pokemon.";
                break;
            case 2:
                this.message = "Dans ta quête, tu aura besoin d'un compagnon, lequel choisi-tu?";
                this.showStarters = true;
                break;
            default:
                // code...
                break;
        }
        this.nbMessage++;
    };
    StarterPage.prototype.chooseStarter = function (pokemon) {
        var _this = this;
        var nomPokemon = "";
        var messageAlert = "";
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
        var alert = this.alertCtrl.create({
            title: 'Tu veux ' + nomPokemon + ' ?',
            message: messageAlert,
            buttons: [
                {
                    text: 'Non',
                    role: 'cancel'
                },
                {
                    text: 'Oui',
                    handler: function () {
                        _this.showStarters = false;
                        _this.myPkmTeam[0].lvl = 5;
                        _this.myPkmTeam[0].exp = 0;
                        _this.myPkmTeam[0].pv = {};
                        _this.myPkmTeam[0].pv.value = 100;
                        _this.myPkmTeam[0].pv.max = 100;
                        _this.storage.set('save.myPkmTeam', _this.myPkmTeam);
                        _this.navCtrl.push(VoyagePage);
                    }
                }
            ]
        });
        alert.present();
    };
    StarterPage = __decorate([
        Component({
            selector: 'page-starter',
            templateUrl: 'starter.html',
        }),
        __metadata("design:paramtypes", [NavController, NavParams, Storage, AlertController])
    ], StarterPage);
    return StarterPage;
}());
export { StarterPage };
//# sourceMappingURL=starter.js.map