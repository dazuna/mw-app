import { Component } from '@angular/core';
import { NavParams, NavController, AlertController } from 'ionic-angular';

import { UsuarioService } from "../../providers/usuario"
import { Http } from '@angular/http';

import { HacerHitchPage } from "../index.paginas";
import { URL_SERVICIOS } from "../../config/url.servicios";

@Component({
  selector: 'page-oferta-completa',
  templateUrl: 'oferta-completa.html',
})
export class OfertaCompletaPage {
  oferta: any = {};
  typeOffer: string;

  constructor(private navParams: NavParams,
    private navCtrl: NavController,
    private alertCtrl: AlertController,
    private http: Http,
    private _us: UsuarioService) {
    this.oferta = this.navParams.get("oferta");
    this.typeOffer = this.navParams.get("typeOffer");
    this._us.cargar_perfil();
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
          if (error._body == '{"err": "Hitch Already Sent"}') {
            this.alertCtrl.create({
              title: 'Hitch',
              message: 'El hitch ya esta registrado!',
              buttons: [
                {
                  text: 'Ok',
                  handler: () => {
                  }
                }
              ]
            }).present();
          } else if (error._body == '{"err": "Contact Already Hitched"}') {
            this.alertCtrl.create({
              title: 'Hitch',
              message: 'El usuario ya fue recomendado!',
              buttons: [
                {
                  text: 'Ok',
                  handler: () => {
                  }
                }
              ]
            }).present();
          }
        }
      );

  }

  irAtras() {
    this.navCtrl.pop();
  }

  hitch(oferta: any) {
    this.navCtrl.push(HacerHitchPage, { 'oferta': oferta, 'typeOffer': this.typeOffer });
  }

}
