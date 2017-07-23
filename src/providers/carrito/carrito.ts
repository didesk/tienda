import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { AlertController, Platform } from 'ionic-angular';

import { Storage } from '@ionic/storage';


@Injectable()
export class CarritoProvider {

  items: any[] = [];

  constructor( public http: Http, 
               private alertCtrl: AlertController, 
               private platform: Platform,
               private storage: Storage ) {

    console.log('Hello CarritoProvider Provider');
    this.cargarStorage();
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
    this.guardarStorage();

  }

  private guardarStorage(){
    if(this.platform.is('cordova') ){
      //dispositivo      (llave - valor )
      this.storage.set('items', this.items);
      
    } else {
      // desktop
      localStorage.setItem('items', JSON.stringify(this.items));
    }
  }

  cargarStorage(){

    let promesa = new Promise( (resolve, reject ) => {
      
      if( this.platform.is('cordova')){
        //dispositivo
        this.storage.ready().then(()=>{
          this.storage.get('items').then( items => {
            if( items ) {
              this.items = items;
            }

            resolve();
          })
        });

      } else {
        //desktop
        if(localStorage.getItem('items')){

          this.items = JSON.parse( localStorage.getItem('items'));

        }

        resolve();

      }

    });

    return promesa;


  }

}
