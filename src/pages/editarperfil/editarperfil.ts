import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import moment from 'moment';

import { URL_SERVICIOS } from "../../config/url.servicios";
import { UsuarioService } from "../../providers/usuario";
import { Http } from '@angular/http';
import { UsuarioPage } from "../index.paginas";

@Component({
  selector: 'page-editarperfil',
  templateUrl: 'editarperfil.html',
})
export class EditarperfilPage {

  usuario: any = [];
  apt: any = [];
  academica: any = [];
  trabajo: any = [];

  fecha: string = "";
  accessCode: string = "";

  myDate = moment().toDate();
  minDate = moment().subtract(100, 'y').format('YYYY');
  maxDate = moment().format('YYYY-MM');

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public alertCtrl: AlertController,
    private http: Http,
    private _us: UsuarioService,) {
    this.usuario = this.navParams.get("usuario");
    this.cargar_resumen();
    this._us.cargar_perfil();
  }


  numerotelefono(event) {
    return (event.charCode == 8 || event.charCode == 0) ? null : event.charCode >= 48 && event.charCode <= 57;
  }


  cargar_resumen() {
    let url = `${URL_SERVICIOS}/getResume?username=${this._us.usuario}`;

    return this.http.get(url)
      .map(resp => resp.json())
      .subscribe(resumen => {
        if (resumen.acad === null) {
          this.addAcad();
        } else {
          this.academica = resumen.acad;
        }
        if (resumen.work === null) {
          this.addWork();
        } else {
          this.trabajo = resumen.work;
        }
      }, error => {
        console.log(error)
      });
  }
  
  addAcad() {
    let d: Date = new Date();
    let year = d.getFullYear();
    let month = d.getMonth() + 1;
    let day = d.getDate();
    let hours = d.getHours();
    let minutes = d.getMinutes();
    let seconds = d.getSeconds();
    let newAcad = {
      "active": 1,
      "program": "",
      "endDate": "",
      "academicInstitution": "",
      "academicId": Math.floor(1000 + (Math.random() * 8999)) + year.toString() + month.toString() + day.toString() + hours.toString() + minutes.toString() + seconds.toString(),
      "startDate": "",
      "currentlyStudying": false,
      "username": this._us.usuario
    };
    this.academica.push(newAcad);
  }

  deleteAcad(item) {
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
            let index = this.academica.indexOf(item);
            this.academica.splice(index, 1);
          }
        }
      ]
    });

    alert.present();
  }

  addWork() {
    let d: Date = new Date();
    let year = d.getFullYear();
    let month = d.getMonth() + 1;
    let day = d.getDate();
    let hours = d.getHours();
    let minutes = d.getMinutes();
    let seconds = d.getSeconds();
    let newWork = {
      "currentWork": false,
      "active": 1,
      "responsibilities": "",
      "company": "",
      "endDate": "",
      "workId": Math.floor(1000 + (Math.random() * 8999)) + year.toString() + month.toString() + day.toString() + hours.toString() + minutes.toString() + seconds.toString(),
      "startDate": "",
      "username": this._us.usuario,
      "position": "",
      "achievements": ""
    };
    this.trabajo.push(newWork);
  }

  deleteWork(item) {
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
            let index = this.trabajo.indexOf(item);
            this.trabajo.splice(index, 1);
          }
        }
      ]
    });

    alert.present();
  }

  saveProfile() {
    this.http.post(URL_SERVICIOS + "/updateUser2", JSON.stringify(this.usuario))
      .subscribe(
        data => {
          console.log(data)
        }, error => {
          console.log(error)
        }
      );

    for (let i in this.academica) {
      if (this.academica[i].currentlyStudying == true) {
        this.academica[i].endDate = "Actualmente";
      }
    }
    for (let i in this.trabajo) {
      if (this.trabajo[i].currentWork == true) {
        this.trabajo[i].endDate = "Actualmente";
      }
    }
    let updateResumeJson = {
      "acad": this.academica,
      "work": this.trabajo,
      "username": this._us.usuario
    };

    this.http.post(URL_SERVICIOS + "/updateResume?username=" + this._us.usuario, JSON.stringify(updateResumeJson))
      .map(resp => resp.json())
      .subscribe(
        data => {
          console.log(data)
          this.alertCtrl.create({
            title: 'Actualizar perfil',
            message: '¡Tu Perfil se ha actualizado exitosamente!',
            buttons: [
              {
                text: 'Ok',
                handler: () => {
                  this.navCtrl.setRoot(UsuarioPage);
                }
              }
            ]
          }).present();
        },
        error => {
          console.log(error)
          this.navCtrl.pop();
        }
      );
  }

  sendAccessCode() {
    if (this.accessCode != "") {
      let dataAccessCode = {
        "accessCode": this.accessCode.toLowerCase(),
        "name": this.usuario.nombre + " " + this.usuario.apellidos,
        "username": this.usuario.username
      };
      return this.http.post(URL_SERVICIOS + "/groupAccessCode", JSON.stringify(dataAccessCode))
        .map(res => res.json())
        .subscribe(
          data => {
            console.log(data)
            this.alertCtrl.create({
              title: 'Código Empresarial',
              message: 'El usuario se agrego a la empresa correctamente!',
              buttons: [
                {
                  text: 'Ok',
                  handler: () => {
                  }
                }
              ]
            }).present();
            this.navCtrl.pop();
          }, error => {
            console.log(error)
          });
    }
  }
}
