import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';

import { OfertasService } from "../../providers/ofertas"
import { UsuarioService } from "../../providers/usuario"
import { Http } from '@angular/http';
import { Storage } from '@ionic/storage';

import { OfertaCompletaPage, BuscadorPage, HacerHitchPage } from "../index.paginas";

import { URL_SERVICIOS } from "../../config/url.servicios";
import { Hitch } from "../../interface/datos.interface";

// import * as $ from 'jquery';

@Component({
  selector: 'page-ofertas',
  templateUrl: 'ofertas.html',
})
export class OfertasPage {
  mas: boolean = true;
  offers: any = [];
  numOffers: number = 0;

  hitches: Hitch = {
    company: " ",
    companyName: " ",
    companyProfilePic: " ",
    contactName: " ",
    idContact: " ",
    idHitch: " ",
    offerCreationDate: " ",
    offerJob: " ",
    offerReward: " ",
    userName: " ",
    username: " ",
    userPhoto: " ",
    userProfilePic: " ",
    tipo: ""
  };

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private alertCtrl: AlertController,
    private http: Http,
    private storage: Storage,
    private _os: OfertasService,
    private _us: UsuarioService) {
  }

  ionViewCanEnter() {
    this._us.cargar_perfil();
    this._os.cargar_todos();
    this.getOffers();
  }

  getOffers() {
    this.storage.get('usuario').then((user) => {
      this.http.get(URL_SERVICIOS + "/getOffers2?username=" + user)
        .map(resp => resp.json())
        .subscribe(
          data => {
            this.offers = [];
            for (let i in data) {
              if (data[i].enabled == 1) {
                this.offers.push(data[i]);
              }
            }
            this.numOffers = this.offers.length;
          }, error => {
            console.log(error)
          }
        );
    });
  }

  autohitch(oferta: any, hitch: Hitch) {
    let d: Date = new Date();
    let year = d.getFullYear();
    let month = d.getMonth() + 1;
    let day = d.getDate();
    let hours = d.getHours();
    let minutes = d.getMinutes();
    let seconds = d.getSeconds();

    this.hitches.company = oferta.company;
    this.hitches.companyName = oferta.companyName;
    this.hitches.companyProfilePic = oferta.profilePic;
    this.hitches.contactName = this._us.perfil.nombre+" "+this._us.perfil.apellidos;
    this.hitches.idContact = this._us.perfil.username;
    this.hitches.idHitch = Math.floor(1000 + (Math.random() * 8999)) + year.toString() + month.toString() + day.toString() + hours.toString() + minutes.toString() + seconds.toString();
    this.hitches.offerCreationDate = oferta.creationDate;
    this.hitches.offerJob = oferta.puesto;
    this.hitches.offerReward = oferta.recompensa;
    this.hitches.userName = this._us.perfil.nombre+" "+this._us.perfil.apellidos;
    this.hitches.username = this._us.perfil.username;
    this.hitches.userPhoto = this._us.perfil.profileImage;
    this.hitches.userProfilePic = this._us.perfil.profileImage;
    this.hitches.tipo = "Publica"

    let body = JSON.stringify(this.hitches);

    let url = URL_SERVICIOS + "/newHitch";

    this.http.post(url, body)
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

  veroferta(oferta: any) {
    this.navCtrl.push(OfertaCompletaPage, { 'oferta': oferta, 'typeOffer': 'Publica' });
  }

  hitch(oferta: any) {
    this.navCtrl.push(HacerHitchPage, { 'oferta': oferta, 'typeOffer': 'Publica' });
  }

  buscador() {
    this.navCtrl.push(BuscadorPage);
  }

}
