import { Injectable } from '@angular/core';
import { Http, URLSearchParams } from '@angular/http';
import 'rxjs/add/operator/map';

import { URL_SERVICIOS } from './../../config/url.servicios';

import { AlertController } from 'ionic-angular';






@Injectable()
export class UsuarioProvider {

  token: string;
  idUsuario: string;

  constructor(public http: Http, private alertCtrl: AlertController ) {
    console.log('Hello UsuarioProvider Provider');
  }

  ingresar( correo: string, contrasena: string ){
    
    let data = new URLSearchParams();

      data.append('correo', correo );
      data.append('contrasena', contrasena );

      let url = URL_SERVICIOS + '/login';

      //respuesta a peticion
      return this.http.post( url, data ).map( resp => {
        let dataResp = resp.json();
        console.log( 'respuesta de ingresar en servicio ',dataResp );

        if(dataResp.error ){
          this.alertCtrl.create({
            title: 'Error al iniciar',
            subTitle: dataResp.mensaje,
            buttons: ['Ok']
          }).present();
        } else {
          this.token = dataResp.token;
          this.idUsuario = dataResp.id_usuario;

          //guardar storage

        }
     });
  }





}
