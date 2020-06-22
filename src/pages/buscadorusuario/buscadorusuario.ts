import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { Http } from '@angular/http';
import { URL_SERVICIOS } from "../../config/url.servicios";
import { PerfilusuarioPage } from '../index.paginas';

@Component({
  selector: 'page-buscadorusuario',
  templateUrl: 'buscadorusuario.html',
})
export class BuscadorusuarioPage {
  // contacto: any;
  contactos : any[] =[];

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private http:Http) {
  }

  obtener_usuario(termino:string){
    let url = URL_SERVICIOS + "/searchUsers?query=" + termino;
    this.http.get( url )
            .map(resp => resp.json())
            .subscribe( data => {
              this.contactos=data.Items;
            });
  }

  filtrar(type){
    return this.contactos.filter(contacto=>contacto.userType=="user");
  }

  buscar(ev:any){
    let valor = ev.target.value;
    this.obtener_usuario(valor);
  }

  verperfil(contacto:any){
    this.navCtrl.push(PerfilusuarioPage,{ 'contacto' : contacto });
  }
}
