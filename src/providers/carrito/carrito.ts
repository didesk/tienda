import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { AlertController } from 'ionic-angular';




@Injectable()
export class CarritoProvider {

  items: any[] = [];

  constructor(public http: Http, private alertCtrl: AlertController ) {
    console.log('Hello CarritoProvider Provider');
  }

  agregarCarrito( itemParametro: any ){
    
    for(let item of this.items ){
      if(item.codigo === itemParametro.codigo ){
        this.alertCtrl.create({
          title: 'Item Existe',
          subTitle: `${itemParametro.producto} ya se encuentra en el carrito de compras`,
          buttons: ['Ok']
        }).present();
        return;

      }
    }

    this.items.push( itemParametro );
  }

}
