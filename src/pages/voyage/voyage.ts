import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { CombatPage } from '../../pages/combat/combat';

@Component({
  selector: 'page-voyage',
  templateUrl: 'voyage.html',
})
export class VoyagePage {

  lieux: any;
  pkmSauvage: any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {

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
    ]

    this.pkmSauvage = {};
  }

  goToLieu(lieu){

    let randomNb: any;
    randomNb = Math.floor((Math.random() * 100) + 1);

    if(randomNb < 60){
      //Cas rencontre PKM sauvage
      console.log(randomNb + "/100 - Pokemon sauvage!");
      switch (lieu.id) {
        case 1:
            console.log("Un Roucool sauvage apparait!");
            this.pkmSauvage.pkm = "Roucool";
            this.pkmSauvage.lvl = 1;
            this.pkmSauvage.pv = {};
            this.pkmSauvage.pv.max  = 150;
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
    if(randomNb >= 60 && randomNb < 75){
      //Cas trouve objet
      console.log(randomNb + "/100 - Vous trouvez un objet!");

    }
    if(randomNb >= 75 && randomNb < 90){
      //Cas rencontre Team Rocket
      console.log(randomNb+ "/100 - La team Rocket vous défie!");

    }
    if(randomNb >= 90){
      //Cas rencontre Rival
      console.log(randomNb+ "/100 - Votre Rival vous défie!");

    }

  }

}
