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
import { NavController, NavParams, } from 'ionic-angular';
import { Storage } from '@ionic/storage';
/**
 * Generated class for the Starter page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var StarterPage = /** @class */ (function () {
    function StarterPage(navCtrl, navParams, storage) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.storage = storage;
        this.hasFinished = false;
        this.showName = false;
        this.showStarters = false;
        this.nbMessage = 0;
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
        switch (pokemon) {
            case "bulbizarre":
                this.message = "Tu veux Bulbizarre, le pokemon tout en herbe?";
                break;
            case "salameche":
                this.message = "Tu veux Salamèche, le pokemon tout feu tout flamme?";
                break;
            case "carapuce":
                this.message = "Tu veux Carapuce, le pokemon tortue?";
                break;
            default:
                this.message = "ERREUR lors du switch";
                break;
        }
    };
    StarterPage = __decorate([
        Component({
            selector: 'page-starter',
            templateUrl: 'starter.html',
        }),
        __metadata("design:paramtypes", [NavController, NavParams, Storage])
    ], StarterPage);
    return StarterPage;
}());
export { StarterPage };
//# sourceMappingURL=starter.js.map