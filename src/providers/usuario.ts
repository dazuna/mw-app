import { Injectable } from '@angular/core';
import { Http, URLSearchParams } from '@angular/http';
import 'rxjs/add/operator/map';
import { URL_SERVICIOS } from "../config/url.servicios";
import { AlertController, Platform, LoadingController } from "ionic-angular";

import { Storage } from "@ionic/storage";

// import { Md5 } from "md5-typescript";


@Injectable()

export class UsuarioService {
  usuario: string;
  token: string;

  guardados: any[] = [];
  hechos: any[] = [];
  contactos: any[] = [];
  perfil: any = {};
  user: any[];


  constructor(public http: Http,
    public loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    private platform: Platform,
    private storage: Storage) {
    this.cargar_storage();
    this.cargar_contactos();
  }

  activo(): boolean {
    if (this.token) {
      return true;
    } else {
      return false;
    }
  }

  presentLoading() {
    const loader = this.loadingCtrl.create({
      spinner: 'bubbles',
      content: "Please wait...",
      duration: 2000
    });
    loader.present();
  }

  guardar_usuario(username: string, password: string) {
    let data = new URLSearchParams();
    data.append("username", username);
    data.append("password", password);

    let url = URL_SERVICIOS + "/loginUser?username=" + username + "&" + "password=" + password;
    // let url = URL_SERVICIOS + "/loginUser?username=" + username + "&" + "password=" + Md5.init(password);

    return this.http.get(url)
      .map(resp => {
        let data_resp = resp.json();
        if (data_resp.length == 0) {
          this.alertCtrl.create({
            title: "Tienes un error al entrar",
            subTitle: "El correo electrónico que ingresaste no coinciden con ninguna cuenta.",
            buttons: ["Ok"]
          }).present();
        } else {
          if(data_resp[0].userType == "user"){
            this.user = data_resp[0];
            this.usuario = data_resp[0].username;
            this.token = data_resp[0].password;
            this.guardar_storage();
          }else{
            this.alertCtrl.create({
              title: "Error",
              subTitle:"La App es para usuarios, favor de ingresar a muuwho.com",
              message: "Our app only supports Users, please use muuwho.com instead",
              buttons: ["Ok"]
            }).present();
          }
        }
      });
  }

  cargar_perfil() {
    let url = `${URL_SERVICIOS}/getUser?username=${this.usuario}`;
    return this.http.get(url)
      .map(resp => resp.json())
      .subscribe(data => {
        if (data === undefined) {
          console.log("error");
        } else {
          this.perfil = data;
        }
      })
  }


  cargar_contactos() {

    let url = `${URL_SERVICIOS}/getContacts?username=${this.usuario}`;
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

  hitchiados() {

    let url = `${URL_SERVICIOS}/getHitch?contact=${this.usuario}`;

    return this.http.get(url)
      .map(resp => resp.json())
      .subscribe(hitches => {
        if (hitches === undefined) {
          console.log("error");
        } else {
          this.hechos = hitches;
        }
        console.log(this.hechos)
      })
  }

  mis_hitchs() {

    let url = `${URL_SERVICIOS}/getHitch?username=${this.usuario}`;

    return this.http.get(url)
      .map(resp => resp.json())
      .subscribe(data => {
        if (data === undefined) {
          console.log("error");
        } else {
          this.guardados = data;
        }
        console.log(this.guardados)
      })
  }

  cerrar_sesion() {
    this.usuario = null;
    this.token = null;
    this.guardar_storage();

  }

  guardar_storage() {
    if (this.platform.is("cordova")) {

      this.storage.set('token', this.token);
      this.storage.set('usuario', this.usuario);

    } else {
      if (this.token) {
        localStorage.setItem('token', this.token);
        localStorage.setItem('usuario', this.usuario);

      } else {
        localStorage.removeItem("token");
        localStorage.removeItem("usuario");
      }
    }
  }

  cargar_storage() {
    if (this.platform.is("cordova")) {
      this.storage.ready()
        .then(() => {
          this.storage.get("token")
            .then(token => {
              if (token) {
                this.token = token;
              }
            })
          this.storage.get("usuario")
            .then(usuario => {
              if (usuario) {
                this.usuario = usuario;
              }
            })
        })
    } else {
      if (localStorage.getItem("token")) {
        this.token = localStorage.getItem("token");
        this.usuario = localStorage.getItem("usuario");
      }
    }
  }

}
