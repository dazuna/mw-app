import { Component } from '@angular/core';
import { Http } from '@angular/http';
import { NavController, NavParams,AlertController } from 'ionic-angular';

import { HacerHitchPage } from "../index.paginas";
import { UsuarioService } from "../../providers/usuario"
import { URL_SERVICIOS } from "../../config/url.servicios";



@Component({
  selector: 'page-ofertas-privadas-copletas',
  templateUrl: 'ofertas-privadas-copletas.html',
})
export class OfertasPrivadasCopletasPage {
  oferta_privada: any = {};
  typeOffer: string;

  constructor(private navCtrl: NavController,
    private navParams: NavParams,
    private http:Http,
    private alertCtrl:AlertController,
    private _us:UsuarioService) {
    this.oferta_privada = this.navParams.get("oferta_privada");
    this.typeOffer = this.navParams.get("typeOffer");
    this._us.cargar_perfil();
  }

  irAtras() {
    this.navCtrl.pop();
  }

  hitch(oferta: any) {
    this.navCtrl.push(HacerHitchPage, { 'oferta': oferta, 'typeOffer': this.typeOffer});
  }

  autohitch(oferta: any) {
    let d: Date = new Date();
    let year = d.getFullYear();
    let month = d.getMonth() + 1;
    let day = d.getDate();
    let hours = d.getHours();
    let minutes = d.getMinutes();
    let seconds = d.getSeconds();

    let dataHitch = {
      company: oferta.company,
      companyName: oferta.companyName,
      companyProfilePic: oferta.profilePic,
      contactName: this._us.perfil.nombre+" "+this._us.perfil.apellidos,
      idContact: this._us.perfil.username,
      idHitch: Math.floor(1000 + (Math.random() * 8999)) + year.toString() + month.toString() + day.toString() + hours.toString() + minutes.toString() + seconds.toString(),
      offerCreationDate: oferta.creationDate,
      offerJob: oferta.puesto,
      offerReward: oferta.recompensa,
      userName: this._us.perfil.nombre+" "+this._us.perfil.apellidos,
      username: this._us.perfil.username,
      userPhoto: this._us.perfil.profileImage,
      userProfilePic: this._us.perfil.profileImage,
      tipo: this.typeOffer
    };
    let url = URL_SERVICIOS + "/newHitch";

    this.http.post(url, JSON.stringify(dataHitch))
      .map(resp => resp.json())
      .subscribe(
        data => {
          this.alertCtrl.create({
            title: 'Hitch',
            subTitle: '<img src="../assets/imgs/mensaje-hitch.jpg">',
            message: '¡Tu Hitch ha sido enviado exitosamente!',
            buttons: ['Ok']
          }).present();
          console.log(data)
        },
        error => {
          console.log(error)
        }
      );

  }
}
