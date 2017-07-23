import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import { URL_SERVICIOS } from './../../config/url.servicios';


@Injectable()
export class ProductosProvider {

  pagina: number = 0;
  productos: any[] = []; 
  lineas: any[] = [];

  constructor(public http: Http) {
    // console.log('Hello ProductosProvider Provider');
    this.cargarTodos();
    this.cargarLineas();
  }

  cargarLineas(){

    let url = URL_SERVICIOS + '/lineas';
    this.http.get( url ).map( resp => resp.json() ).subscribe( data => {
      if(data.error){
        //problemas!!

      } else {
        this.lineas = data.lineas;
        console.log('lineas',this.lineas);
      }
    })
  }

  cargarTodos(){

    let promesa = new Promise( (resolve, reject)=>{

      let url = `${URL_SERVICIOS}/productos/todos/${this.pagina}`;

      this.http.get( url )
        .map( res => res.json() )
        .subscribe( data => {
          console.log(data);
          if( data.error ){
            //aqui hay un problema

          } else {

            let nuevaData = this.agrupar( data.productos, 2 );

            this.productos.push(...nuevaData );
            this.pagina += 1;
          }

          resolve();

        })

    });
    return promesa;


  }

  private agrupar(arr:any, tamano: number) {
    
    let nuevoArreglo = [];
   
    for( let i=0; i<arr.length; i+=tamano ){
      nuevoArreglo.push(arr.slice(i, i+tamano ));
    }

    console.log('nuevo arreglo',nuevoArreglo);        
    return nuevoArreglo;

  }

}
