import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { URL_SERVICIOS } from "../config/url.servicios";
import { UsuarioService } from "../providers/usuario";

import { MenuController } from "ionic-angular";


@Injectable()
export class OfertasService {
  token: string;
  usuario: string;

  ofertas: any[] = [];


  constructor(public http: Http,
    private menuCtrl: MenuController,
    private _us: UsuarioService) {
    this.cargar_todos();
  }

  openSideMenu() {
    this.menuCtrl.enable(true)
    this.menuCtrl.toggle();
  }

  cargar_todos() {
    let url = URL_SERVICIOS + "/getOffers?username=" + this._us.usuario;
    this.http.get(url)
      .map(resp => resp.json())
      .subscribe(data => {
        if (data === undefined) {
          console.log("error")
        } else {
          this.ofertas = data;
        }
      })
  }



}
