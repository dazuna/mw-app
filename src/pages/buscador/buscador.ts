import { Component } from '@angular/core';
import { ViewController, NavController, NavParams } from 'ionic-angular';

import { Http, URLSearchParams } from '@angular/http';
import { URL_SERVICIOS } from "../../config/url.servicios";
import { OfertaCompletaPage } from '../index.paginas';
import { UsuarioService } from "../../providers/usuario";

@Component({
  selector: 'page-buscador',
  templateUrl: 'buscador.html',
})
export class BuscadorPage {

  ofertas: any[] = [];

  constructor(public ViewCtrl: ViewController,
    public navParams: NavParams,
    public navCtrl: NavController,
    private _us: UsuarioService,
    private http: Http
  ) {
    this._us.cargar_perfil();
  }

  cerrar() {
    this.ViewCtrl.dismiss();
  }

  obtener_oferta(termino: string) {
    let data = new URLSearchParams();
    let url = URL_SERVICIOS + "/filterOffers?query=" + termino + "&username=" +this._us.usuario;
    this.http.post(url, data)
      .map(resp => resp.json())
      .subscribe(data => {
        this.ofertas = data.Items;
      })
  }

  buscar(ev: any) {
    let valor = ev.target.value;
    this.obtener_oferta(valor);
  }

  veroferta(oferta: any) {
    this.navCtrl.push(OfertaCompletaPage, { 'oferta': oferta });
  }


}
