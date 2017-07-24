import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { ProductosProvider } from './../../providers/productos/productos';
import { ProductoPage } from './../producto/producto';
import { CarritoProvider } from './../../providers/carrito/carrito';

import { UsuarioProvider } from './../../providers/usuario/usuario';





@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  productoPage = ProductoPage;

  constructor(public navCtrl: NavController, 
              private productosProvider: ProductosProvider, 
              private carritoProvider: CarritoProvider,
              private usuarioProvider: UsuarioProvider ) {

   

  }
  siguientePagina( infiniteScroll ){
    this.productosProvider.cargarTodos().then( ()=> {
      infiniteScroll.complete();
    })
  }

}
