import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';

import { Http } from '@angular/http';
import { UsuarioService } from "../../providers/usuario";


import { URL_SERVICIOS } from "../../config/url.servicios";
import { PerfilusuarioPage, BuscadorusuarioPage, SolicitudesUseriosPage } from '../index.paginas';

import { Refresher } from "ionic-angular";

@Component({
  selector: 'page-contactos',
  templateUrl: 'contactos.html',
})

export class ContactosPage {

  contact: string = "contact";

  contactos: any[] = [];
  solicitudes: any[] = [];

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public alertCtrl: AlertController,
    private http: Http,
    private _us: UsuarioService) {

  }

  ionViewWillEnter() {
    this.cargar_contactos();
    this.solicitudesamistad();
  }
  cargar_contactos() {

    let url = `${URL_SERVICIOS}/getContacts?username=${this._us.usuario}`;
    this.http.get(url)
      .map(resp => resp.json())
      .subscribe(data => {

        if (data === undefined) {
          console.log("error");
        } else {
          this.contactos = data;
        }
      });
  }


  verperfil(contacto: any) {
    this.navCtrl.push(PerfilusuarioPage, { 'contacto': contacto });
  }

  solicitudesamistad() {

    let url = `${URL_SERVICIOS}/getContacts?username=${this._us.usuario}&request=1`;
    this.http.get(url)
      .map(resp => resp.json())
      .subscribe(data => {
        if (data === undefined) {
          console.log("error");
        } else {
          this.solicitudes = data;
        }
      })
  }
  versolicitud(solicitud: any) {
    this.navCtrl.push(SolicitudesUseriosPage, { 'solicitud': solicitud })
  }

  agregaramistad(solicitud: any, idx: number) {

    this.solicitudes.splice(idx, 1);

    let url = URL_SERVICIOS + "/updateContacts?username=" + this._us.usuario + "&contact=" + solicitud.username + "&operation=addContact";
    this.http.get(url)
      .map(resp => resp.json())
      .subscribe(data => {

      })
  }

  borraramistad(solicitud: any, idx: number) {
    let alert = this.alertCtrl.create({
      title: 'Confirmar borrado',
      message: '¿Estás seguro de que deseas eliminar?',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          handler: () => {
            // Ha respondido que no así que no hacemos nada
          }
        },
        {
          text: 'Si',
          handler: () => {
            this.solicitudes.splice(idx, 1);
            let url = URL_SERVICIOS + "/updateContacts?username=" + this._us.usuario + "&contact=" + solicitud.username + "&operation=deleteContact";
            this.http.get(url)
              .map(resp => resp.json())
              .subscribe(data => {
              })
          }
        }
      ]
    });
    alert.present();
  }

  eliminar_amigo(contacto: any, idx: number) {
    let alert = this.alertCtrl.create({
      title: 'Confirmar borrado',
      message: '¿Estás seguro de que deseas eliminar?',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          handler: () => {
            // Ha respondido que no así que no hacemos nada
          }
        },
        {
          text: 'Si',
          handler: () => {
            this.contactos.splice(idx, 1);

            let url = URL_SERVICIOS + "/updateContacts?username=" + this._us.usuario + "&contact=" + contacto.idContact + "&operation=deleteContact";

            this.http.get(url)
              .map(resp => resp.json())
              .subscribe(data => {
              })
          }
        }
      ]
    });
    alert.present();
  }

  buscador() {
    this.navCtrl.push(BuscadorusuarioPage);
  }

  recargar_contactos(refresher: Refresher) {
    this.contactos.pop();
    setTimeout(() => {
      this.solicitudesamistad();

      this.cargar_contactos();

      this.navCtrl.setRoot(this.navCtrl.getActive().component);
      refresher.complete();
    }, 2000);
  }




}
