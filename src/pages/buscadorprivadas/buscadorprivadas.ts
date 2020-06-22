import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { Http, URLSearchParams } from '@angular/http';
import { URL_SERVICIOS } from "../../config/url.servicios";
import { OfertasPrivadasCopletasPage } from '../index.paginas';

@Component({
  selector: 'page-buscadorprivadas',
  templateUrl: 'buscadorprivadas.html',
})
export class BuscadorprivadasPage {
  op:any[]=[];

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private http:Http) {
  }

  obtener_op(termino:string){
    let data = new URLSearchParams();
    let url = URL_SERVICIOS + "/searchPrivateOffer?query=" + termino;
    this.http.post( url, data )
             .map(resp=>resp.json())
             .subscribe(data=>{
               this.op=data.Items;
             });
  }

  buscar(ev:any){
    let valor = ev.target.value;
    this.obtener_op(valor);
  }

  veroferta(oferta_privada:any){
    this.navCtrl.push(OfertasPrivadasCopletasPage,{ 'oferta_privada' : oferta_privada });
  }
}
