import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { UsuarioService } from "../../providers/usuario"

@Component({
  selector: 'page-hitch',
  templateUrl: 'hitch.html',
})
export class HitchPage {
  hitchs: string = "enviados";
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private _us: UsuarioService) {
  }
  ionViewWillEnter() {
    this._us.mis_hitchs();
    this._us.hitchiados();
  }

}
