import { Component } from '@angular/core';
import { URL_SERVICIOS } from "../../config/url.servicios";
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { Datos } from "../../interface/datos.interface";
import { Md5 } from "md5-typescript";
import { TabsPage } from "../index.paginas";
import { UsuarioService } from "../../providers/usuario";
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'page-registrate',
  templateUrl: 'registrate.html',
})
export class RegistratePage {
  md5 = new Md5();

  dato: Datos = {
    username: "",
    password: "",
    nombre: "",
    apellidos: "",
    enabled: 1,
    userType: "user",
    headerImage: "https://s3.amazonaws.com/muuwho-images/CoverImages/headerdefault.png",
    profileImage: "https://s3.amazonaws.com/muuwho-images/ProfileImages/profiledefault.png"
  }


  anio: number = new Date().getFullYear();
  accessCode: string = "";
  terms: boolean = false;
  pass: string = "";

  signupform: FormGroup;

  constructor(private http: Http,
    public navCtrl: NavController,
    public alertCtrl: AlertController,
    public navParams: NavParams,
    private _us: UsuarioService) {

    let EMAILPATTERN = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;
    this.signupform = new FormGroup({
      password: new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(18)]),
      name: new FormControl('', [Validators.required, Validators.pattern('[a-zA-ZñÑáéíóúÁÉÍÓÚ ]*'), Validators.minLength(3), Validators.maxLength(30)]),
      lastname: new FormControl('', [Validators.required, Validators.pattern('[a-zA-ZñÑáéíóúÁÉÍÓÚ ]*'), Validators.minLength(3), Validators.maxLength(30)]),
      email: new FormControl('', [Validators.required, Validators.pattern(EMAILPATTERN)]),
      birthday: new FormControl(''),
      phone: new FormControl(''),
      ubicacion: new FormControl(''),
      accessCode: new FormControl(''),
      terms: new FormControl(''),
    });

  }

  nuevo_usuario(dato: Datos) {
    let body = JSON.stringify(dato);

    let url = URL_SERVICIOS + "/newUser";

    return this.http.post(url, body)
      .map(res => res.json())
      .subscribe(
        data => {
          console.log("New user complete", data)
          if (this.accessCode != "") {
            let dataAccessCode = {
              "accessCode": this.accessCode.toLowerCase(),
              "name": dato.nombre + " " + dato.apellidos,
              "username": dato.username
            };
            return this.http.post(URL_SERVICIOS + "/groupAccessCode", JSON.stringify(dataAccessCode))
              .map(res => res.json())
              .subscribe(
                data => {
                  console.log(data)
                  this._us.guardar_usuario(dato.username, this.dato.password)
                    .subscribe(() => {
                      if (this._us.activo()) {
                        this.navCtrl.push(TabsPage);
                      }
                    });
                }, error => {
                  console.log(error)
                  this.alertCtrl.create({
                    title: 'Error',
                    message: 'Codigo de empresa incorrecto',
                    buttons: [
                      {
                        text: 'Ok',
                        handler: () => {
                          this._us.guardar_usuario(dato.username, this.dato.password)
                            .subscribe(() => {
                              if (this._us.activo()) {
                                this.navCtrl.push(TabsPage);
                              }
                            });
                        }
                      }
                    ]
                  }).present();
                });
          } else {
            this._us.guardar_usuario(dato.username, this.dato.password)
              .subscribe(() => {
                if (this._us.activo()) {
                  this.navCtrl.push(TabsPage);
                }
              });
          }
        },
        error => {
          console.log("problemas para entrar", error._body)
          if (error._body == '{"message": "username already exists!"}') {
            this.alertCtrl.create({
              title: 'Registro',
              message: 'El usuario ya esta registrado!',
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

  convertir(dato: any) {
    this.dato.password = Md5.init(this.pass).toString();
  }


  guardar() {
    if (this.terms === false) {
      this.alertCtrl.create({
        title: 'Terminos y condiciones',
        message: 'Debes aceptar los terminos y condiciones',
        buttons: [
          {
            text: 'Ok',
            handler: () => {
            }
          }
        ]
      }).present();
    } else {
      this.convertir(this.dato);
      this.nuevo_usuario(this.dato)
    }
  }

}
