import { ProductosProvider } from './../../providers/productos/productos';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ProductoPage } from './../producto/producto';


@Component({
  selector: 'page-por-categorias',
  templateUrl: 'por-categorias.html',
})
export class PorCategoriasPage {

  categoria: any = {};
  productoPage = ProductoPage;

  constructor(public navCtrl: NavController, public navParams: NavParams, private productosProvider: ProductosProvider) {
    this.categoria = this.navParams.get('categoria');
    this.productosProvider.cargarPorCategoria( this.categoria.id );
    

  }

  

}
