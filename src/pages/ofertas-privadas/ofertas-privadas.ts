import { Component } from '@angular/core';
import { Http } from '@angular/http';

import {
  ViewController,
  NavController,
  NavParams,
  AlertController
} from 'ionic-angular';

import {
  OfertasPrivadasCopletasPage,
  BuscadorprivadasPage,
  HacerHitchPage
} from "../index.paginas";

import { UsuarioService } from "../../providers/usuario";

import { URL_SERVICIOS } from "../../config/url.servicios";

import 'rxjs/add/operator/map';


@Component({
  selector: 'page-ofertas-privadas',
  templateUrl: 'ofertas-privadas.html',
})
export class OfertasPrivadasPage {

  ofertas: any[] = [];
  numOffers: number = 0;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private vwCtrl: ViewController,
    private alertCtrl: AlertController,
    private http: Http,
    private _us: UsuarioService) {

  }

  ionViewCanEnter() {
    this.cargar_privadas();
  }

  cargar_privadas() {

    let url = `${URL_SERVICIOS}/getPrivateOffer?member=${this._us.usuario}`;
    this.http.get(url)
      .map(resp => resp.json())
      .subscribe(data => {
        if (data === undefined) {
          console.log("error");
        } else {
          this.ofertas = [];
          for ( let i in data){
            if(data[i].enabled == 1){
              this.ofertas.push(data[i]);
            }
          }
          this.numOffers = this.ofertas.length;
        }
      })
  }

  cerrar() {
    this.vwCtrl.dismiss();
  }

  ver_oferta_privada(oferta_privada: any) {
    this.navCtrl.push(OfertasPrivadasCopletasPage, { 'oferta_privada': oferta_privada, 'typeOffer': 'Privada' });
  }

  hitch(oferta: any) {
    this.navCtrl.push(HacerHitchPage, { 'oferta': oferta, 'typeOffer': 'Privada' });
  }

  buscador() {
    this.navCtrl.push(BuscadorprivadasPage);
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
      tipo: "Privada"
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

}
