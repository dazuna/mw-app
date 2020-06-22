import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { RegistratePage, TabsPage } from "../index.paginas";
import { UsuarioService } from "../../providers/usuario";
import { Storage } from '@ionic/storage';

import { Md5 } from "md5-typescript";

@Component({
  selector: 'page-index',
  templateUrl: 'index.html',
})
export class IndexPage {

  username: string = "";
  password: string = "";

  anio: number = new Date().getFullYear();

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private storage: Storage,
    private _us: UsuarioService) {

  }

  ionViewCanEnter() {
    this.storage.get('usuario').then((user) => {
      if (user != null) {
        this.storage.get('token').then((token) => {
          this._us.presentLoading();
          this._us.guardar_usuario(user, token)
            .subscribe(() => {
              if (this._us.activo()) {
                this.navCtrl.push(TabsPage);
              }
            });
        });
      }
    });
  }

  ingresar() {
    this._us.presentLoading();
    this._us.guardar_usuario(this.username, Md5.init(this.password))
      .subscribe(() => {
        if (this._us.activo()) {
          this.navCtrl.push(TabsPage);
        }
      });

  }


  registrate() {
    this.navCtrl.push(RegistratePage);
  }


}
