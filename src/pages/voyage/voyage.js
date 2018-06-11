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
import { NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { CombatPage } from '../../pages/combat/combat';
var VoyagePage = /** @class */ (function () {
    function VoyagePage(navCtrl, navParams, storage) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.storage = storage;
        this.lieux = [
            {
                id: 1,
                nom: 'Plaine',
                img: 'plaine'
            },
            {
                id: 2,
                nom: 'Forêt',
                img: 'foret'
            },
            {
                id: 3,
                nom: 'Grotte',
                img: 'grotte'
            },
            {
                id: 4,
                nom: 'Desert',
                img: 'desert'
            },
            {
                id: 5,
                nom: 'Ville abandonnée',
                img: 'ville-abandonnee'
            },
            {
                id: 6,
                nom: 'Centrale electrique',
                img: 'centrale'
            },
            {
                id: 7,
                nom: 'Montagne',
                img: 'montagne'
            },
            {
                id: 8,
                nom: 'Région volcanique',
                img: 'volcan'
            },
            {
                id: 9,
                nom: 'Lac secret',
                img: 'lac'
            }
        ];
        this.pkmSauvage = {};
    }
    VoyagePage.prototype.goToLieu = function (lieu) {
        var randomNb;
        randomNb = Math.floor((Math.random() * 100) + 1);
        if (randomNb < 60) {
            //Cas rencontre PKM sauvage
            console.log(randomNb + "/100 - Pokemon sauvage!");
            switch (lieu.id) {
                case 1:
                    console.log("Un Roucool sauvage apparait!");
                    this.pkmSauvage.pkm = "Roucool";
                    this.pkmSauvage.lvl = 1;
                    this.pkmSauvage.pv = {};
                    this.pkmSauvage.pv.max = 150;
                    break;
                case 2:
                    console.log("Un Chenipan sauvage apparait!");
                    break;
                default:
                    console.log("Lieu inconnu");
                    break;
            }
            this.navCtrl.push(CombatPage, {
                type: 'sauvage',
                pokemon: this.pkmSauvage
            });
        }
        if (randomNb >= 60 && randomNb < 75) {
            //Cas trouve objet
            console.log(randomNb + "/100 - Vous trouvez un objet!");
        }
        if (randomNb >= 75 && randomNb < 90) {
            //Cas rencontre Team Rocket
            console.log(randomNb + "/100 - La team Rocket vous défie!");
        }
        if (randomNb >= 90) {
            //Cas rencontre Rival
            console.log(randomNb + "/100 - Votre Rival vous défie!");
        }
    };
    VoyagePage = __decorate([
        Component({
            selector: 'page-voyage',
            templateUrl: 'voyage.html',
        }),
        __metadata("design:paramtypes", [NavController, NavParams, Storage])
    ], VoyagePage);
    return VoyagePage;
}());
export { VoyagePage };
//# sourceMappingURL=voyage.js.map