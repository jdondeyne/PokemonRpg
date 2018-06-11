import { Component } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { CombatPage } from '../../pages/combat/combat';

@Component({
  selector: 'page-voyage',
  templateUrl: 'voyage.html',
})
export class VoyagePage {

  lieux: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public storage: Storage, private toastCtrl: ToastController) {

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

  }

  goToLieu(lieu){
    console.log("Entrée dans... " + lieu.nom);

    let randomNb: any;
    randomNb = Math.floor((Math.random() * 100) + 1);

    if(randomNb < 60){
      //Cas rencontre PKM sauvage
      console.log(randomNb + "/100 - Pokemon sauvage!");
      /*switch (lieu.id) {
        case 1:
            console.log("Un Roucool sauvage apparait!");
            break;
        case 2:
            console.log("Un Chenipan sauvage apparait!");
            break;
        default:
          console.log("Lieu inconnu");
          break;
      }*/
      
      this.navCtrl.push(CombatPage, {
        type: 'sauvage',
        lieu: lieu.id
      });

    }
    if(randomNb >= 60 && randomNb < 75){
      //Cas trouve objet
      console.log(randomNb + "/100 - Vous trouvez un objet!");
      this.presentToast('Vous trouvez un objet!');

    }
    if(randomNb >= 75 && randomNb < 90){
      //Cas rencontre Team Rocket
      console.log(randomNb+ "/100 - La team Rocket vous défie!");
      this.navCtrl.push(CombatPage, {
        type: 'rocket',
        lieu: lieu.id
      });

    }
    if(randomNb >= 90){
      //Cas rencontre Rival
      console.log(randomNb+ "/100 - Votre Rival vous défie!");
      this.navCtrl.push(CombatPage, {
        type: 'rival',
        lieu: lieu.id
      });

    }

  }


  presentToast(texte){
      let toast = this.toastCtrl.create({
        message: texte,
        duration: 3000,
        position: 'bottom'
      });
      toast.present();
  }

}
