import { Injectable } from '@angular/core';
import { Http, URLSearchParams } from '@angular/http';
import 'rxjs/add/operator/map';

import { URL_SERVICIOS } from './../../config/url.servicios';

import { AlertController, Platform } from 'ionic-angular';

import { Storage } from '@ionic/storage';






@Injectable()
export class UsuarioProvider {

  token: string;
  idUsuario: string;

  constructor(public http: Http, private alertCtrl: AlertController, private platform: Platform, private storage: Storage ) {
    console.log('Hello UsuarioProvider Provider');
    this.cargarStorage();
  }

  activo(): boolean {
    if( this.token ) {
      return true;
    } else {
      return false;
    }

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
          this.guardarStorage();


        }
     });

  }

  cerrarSesion() {
    
    this.token = null;
    this.idUsuario = null;
    
    //guardar storage
    this.guardarStorage();

  }

  private guardarStorage(){
    if(this.platform.is('cordova') ){
      //dispositivo      (llave - valor )
      this.storage.set('token', this.token);
      this.storage.set('idUsuario', this.idUsuario );
      
    } else {
      // desktop
      if(this.token){
        localStorage.setItem('token', this.token );
        localStorage.setItem('idUsuario', this.idUsuario );        
      } else {
        localStorage.removeItem('token');
        localStorage.removeItem('idUsuario')
      }
    }
  }

  cargarStorage(){

    let promesa = new Promise( (resolve, reject ) => {
      
      if( this.platform.is('cordova')){
        //dispositivo
        this.storage.ready().then(()=>{
          this.storage.get('token').then( token => {
            if( token ) {
              this.token = token;
            }

            // resolve();
          })
          
          this.storage.get('idUsuario').then( idUsuario => {
            if( idUsuario ) {
              this.idUsuario = idUsuario;
            }

            resolve();
          })
        });

      } else {
        //desktop
        //debería preguntar si existen ambos idusuario y token
        if(localStorage.getItem('token')){

          this.token = localStorage.getItem('token');
          this.idUsuario = localStorage.getItem('idUsuario');

        }

        resolve();

      }

    });

    return promesa;


  }
  






}
