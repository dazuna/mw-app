import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';

import { Http } from '@angular/http';
import { UsuarioService } from "../../providers/usuario";

import { URL_SERVICIOS } from "../../config/url.servicios";
import { Hitch, Email } from "../../interface/datos.interface";

import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'page-hacer-hitch',
  templateUrl: 'hacer-hitch.html',
})

export class HacerHitchPage {
  ce: string = "";

  usuario: any[];
  oferta: any = {};
  items: any;
  typeOffer: string;

  datos: Email = {
    contactMail: " ",
    nombre: " ",
    mailSubject: " ",
    bodyMailTXT: " ",
    bodyMailHTML: " "
  }

  hitch: Hitch = {
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

  public ionicNamedColor: string = 'light';

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private alertCtrl: AlertController,
    private http: Http,
    private translate: TranslateService,
    private _us: UsuarioService) {

  }

  ionViewWillEnter() {
    this.oferta = this.navParams.get("oferta");
    this.typeOffer = this.navParams.get("typeOffer");
    this._us.cargar_perfil();
    this.initializeItems();
    this._us.cargar_contactos();
  }

  irAtras() {
    this.navCtrl.pop();
  }

  initializeItems() {
    this.items = this._us.contactos;
  }

  getItems(ev: any) {
    this.initializeItems();
    const val = ev.target.value;
    if (val && val.trim() != '') {
      this.items = this.items.filter((item) => {
        return (item.nombre.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
  }

  email(lang) {
    let mailText0;

    let url = URL_SERVICIOS + "/MailMachine";

    let browserlang = this.translate.currentLang; //obtenemos el idioma seleccionado

    if (browserlang == 'en') {
      console.log("ingles")
      mailText0 = "You had recommended by friend<br>"+this._us.perfil.nombre+" "+this._us.perfil.apellidos+"<br>for<br>"+this.oferta.puesto+"<br>in<br>"+this.oferta.companyName+"<br><br>1. Download the app<br>2. Enter your information<br>3. Create a profile<br><br>It is really easy!!!";
    } if (browserlang == 'es') {
      console.log("español")
      mailText0 = "Te ha recomendado tu amigo<br>"+this._us.perfil.nombre+" "+this._us.perfil.apellidos+"<br>para<br>"+this.oferta.puesto+"<br>en<br>"+this.oferta.companyName+"<br><br>1. Descarga la app<br>2. Ingresa tus datos<br>3. Crea tu perfil<br><br>Es super fàcil!!!";
    }

    let correo = {

      "contactList":
        [
          {
            contactMail: this.ce,
            nombre: "-------"
          }
        ],
      "mailContent":
      {
        mailSubject: "Bienvenido a Muuwho",
        bodyMailTXT: "Te queremos dar la bienvenida a ....",
        bodyMailHTML: '<!DOCTYPE HTML PUBLIC "-//W3C//DTD XHTML 1.0 Transitional //EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd"><html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office"><head> <meta http-equiv="Content-Type" content="text/html; charset=utf-8"> <meta name="viewport" content="width=device-width"> <meta http-equiv="X-UA-Compatible" content="IE=edge"> <title></title> <link href="https://fonts.googleapis.com/css?family=Roboto" rel="stylesheet" type="text/css"> <style type="text/css" id="media-query"> body{margin: 0; padding: 0;}table, tr, td{vertical-align: top; border-collapse: collapse;}.ie-browser table, .mso-container table{table-layout: fixed;}*{line-height: inherit;}a[x-apple-data-detectors=true]{color: inherit !important; text-decoration: none !important;}[owa] .img-container div, [owa] .img-container button{display: block !important;}[owa] .fullwidth button{width: 100% !important;}[owa] .block-grid .col{display: table-cell; float: none !important; vertical-align: top;}.ie-browser .num12, .ie-browser .block-grid, [owa] .num12, [owa] .block-grid{width: 600px !important;}.ExternalClass, .ExternalClass p, .ExternalClass span, .ExternalClass font, .ExternalClass td, .ExternalClass div{line-height: 100%;}.ie-browser .mixed-two-up .num4, [owa] .mixed-two-up .num4{width: 200px !important;}.ie-browser .mixed-two-up .num8, [owa] .mixed-two-up .num8{width: 400px !important;}.ie-browser .block-grid.two-up .col, [owa] .block-grid.two-up .col{width: 300px !important;}.ie-browser .block-grid.three-up .col, [owa] .block-grid.three-up .col{width: 200px !important;}.ie-browser .block-grid.four-up .col, [owa] .block-grid.four-up .col{width: 150px !important;}.ie-browser .block-grid.five-up .col, [owa] .block-grid.five-up .col{width: 120px !important;}.ie-browser .block-grid.six-up .col, [owa] .block-grid.six-up .col{width: 100px !important;}.ie-browser .block-grid.seven-up .col, [owa] .block-grid.seven-up .col{width: 85px !important;}.ie-browser .block-grid.eight-up .col, [owa] .block-grid.eight-up .col{width: 75px !important;}.ie-browser .block-grid.nine-up .col, [owa] .block-grid.nine-up .col{width: 66px !important;}.ie-browser .block-grid.ten-up .col, [owa] .block-grid.ten-up .col{width: 60px !important;}.ie-browser .block-grid.eleven-up .col, [owa] .block-grid.eleven-up .col{width: 54px !important;}.ie-browser .block-grid.twelve-up .col, [owa] .block-grid.twelve-up .col{width: 50px !important;}@media only screen and (min-width: 620px){.block-grid{width: 600px !important;}.block-grid .col{vertical-align: top;}.block-grid .col.num12{width: 600px !important;}.block-grid.mixed-two-up .col.num4{width: 200px !important;}.block-grid.mixed-two-up .col.num8{width: 400px !important;}.block-grid.two-up .col{width: 300px !important;}.block-grid.three-up .col{width: 200px !important;}.block-grid.four-up .col{width: 150px !important;}.block-grid.five-up .col{width: 120px !important;}.block-grid.six-up .col{width: 100px !important;}.block-grid.seven-up .col{width: 85px !important;}.block-grid.eight-up .col{width: 75px !important;}.block-grid.nine-up .col{width: 66px !important;}.block-grid.ten-up .col{width: 60px !important;}.block-grid.eleven-up .col{width: 54px !important;}.block-grid.twelve-up .col{width: 50px !important;}}@media (max-width: 620px){.block-grid, .col{min-width: 320px !important; max-width: 100% !important; display: block !important;}.block-grid{width: calc(100% - 40px) !important;}.col{width: 100% !important;}.col > div{margin: 0 auto;}img.fullwidth, img.fullwidthOnMobile{max-width: 100% !important;}.no-stack .col{min-width: 0 !important; display: table-cell !important;}.no-stack.two-up .col{width: 50% !important;}.no-stack.mixed-two-up .col.num4{width: 33% !important;}.no-stack.mixed-two-up .col.num8{width: 66% !important;}.no-stack.three-up .col.num4{width: 33% !important;}.no-stack.four-up .col.num3{width: 25% !important;}.mobile_hide{min-height: 0px; max-height: 0px; max-width: 0px; display: none; overflow: hidden; font-size: 0px;}}</style></head><body class="clean-body" style="margin: 0;padding: 0;-webkit-text-size-adjust: 100%;background-color: #E9E9E9"> <style type="text/css" id="media-query-bodytag"> @media (max-width: 520px){.block-grid{min-width: 320px!important; max-width: 100%!important; width: 100%!important; display: block!important;}.col{min-width: 320px!important; max-width: 100%!important; width: 100%!important; display: block!important;}.col > div{margin: 0 auto;}img.fullwidth{max-width: 100%!important;}img.fullwidthOnMobile{max-width: 100%!important;}.no-stack .col{min-width: 0!important;display: table-cell!important;}.no-stack.two-up .col{width: 50%!important;}.no-stack.mixed-two-up .col.num4{width: 33%!important;}.no-stack.mixed-two-up .col.num8{width: 66%!important;}.no-stack.three-up .col.num4{width: 33%!important;}.no-stack.four-up .col.num3{width: 25%!important;}.mobile_hide{min-height: 0px!important; max-height: 0px!important; max-width: 0px!important; display: none!important; overflow: hidden!important; font-size: 0px!important;}}</style> <table class="nl-container" style="border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;min-width: 320px;Margin: 0 auto;background-color: #E9E9E9;width: 100%" cellpadding="0" cellspacing="0"><tbody><tr style="vertical-align: top"><td style="word-break: break-word;border-collapse: collapse !important;vertical-align: top"> <div style="background-color:#FFFFFF;"> <div style="Margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: #FFFFFF;" class="block-grid no-stack"> <div style="border-collapse: collapse;display: table;width: 100%;background-color:#FFFFFF;"> <div class="col num12" style="min-width: 320px;max-width: 600px;display: table-cell;vertical-align: top;"> <div style="background-color: #1CA7BA; width: 100% !important;"> <div style="border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent; padding-top:0px; padding-bottom:0px; padding-right: 0px; padding-left: 0px;"> <div align="left" class="img-container left fullwidthOnMobile fixedwidth " style="padding-right: 5px; padding-left: 5px;"><div style="line-height:5px;font-size:1px">&#160;</div><img class="left fullwidthOnMobile fixedwidth" align="left" border="0" src="https://s3.amazonaws.com/muuwho-mail-images/Mu-horizontal4.png" alt="header" title="header" style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: block !important;border: 0;height: auto;float: none;width: 100%;max-width: 240px" width="240"><div style="line-height:5px;font-size:1px">&#160;</div></div><div align="center" class="img-container center fullwidthOnMobile fixedwidth " style="padding-right: 0px; padding-left: 0px;"> <img class="center fullwidthOnMobile fixedwidth" align="center" border="0" src="https://s3.amazonaws.com/muuwho-mail-images/nuevo+manos.png" alt="Image" title="Image" style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: block !important;border: 0;height: auto;float: none;width: 100%;max-width: 300px" width="300"></div></div></div></div></div></div></div><div style="background-color:#FFFFFF;"> <div style="Margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: #1CA7BA;" class="block-grid no-stack"> <div style="border-collapse: collapse;display: table;width: 100%;background-color:#1CA7BA;"> <div class="col num12" style="min-width: 320px;max-width: 600px;display: table-cell;vertical-align: top;"> <div style="background-color: transparent; width: 100% !important;"> <div style="border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent; padding-top:0px; padding-bottom:0px; padding-right: 0px; padding-left: 0px;"> <div class=""><div style="color:#FFFFFF;font-family:Roboto, Tahoma, Verdana, Segoe, sans-serif;line-height:150%; padding-right: 20px; padding-left: 20px; padding-top: 20px; padding-bottom: 10px;"><div style="font-size:12px;line-height:18px;font-family:Roboto, Tahoma, Verdana, Segoe, sans-serif;color:#FFFFFF;text-align:left;"><p style="margin: 0;font-size: 14px;line-height: 21px;text-align: center"><span style="line-height: 45px; font-size: 30px;">'+mailText0+'</span></p></div></div></div></div></div></div></div></div></div><div style="background-color:#FFFFFF;"> <div style="Margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: #1CA7BA;" class="block-grid two-up "> <div style="border-collapse: collapse;display: table;width: 100%;background-color:#1CA7BA;"> <div class="col num6" style="max-width: 320px;min-width: 300px;display: table-cell;vertical-align: top;"> <div style="background-color: transparent; width: 100% !important;"> <div style="border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent; padding-top:5px; padding-bottom:5px; padding-right: 0px; padding-left: 0px;"> <div align="center" class="img-container center fixedwidth " style="padding-right: 0px; padding-left: 0px;"> <a href="http://bit.ly/2VohzPK" target="_blank"> <img class="center fixedwidth" align="center" border="0" src="https://s3.amazonaws.com/muuwho-mail-images/playStore.png" alt="playStore" title="playStore" style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: block !important;border: none;height: auto;float: none;width: 100%;max-width: 180px" width="180"> </a></div></div></div></div><div class="col num6" style="max-width: 320px;min-width: 300px;display: table-cell;vertical-align: top;"> <div style="background-color: transparent; width: 100% !important;"> <div style="border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent; padding-top:5px; padding-bottom:5px; padding-right: 0px; padding-left: 0px;"> <div align="center" class="img-container center fixedwidth " style="padding-right: 0px; padding-left: 0px;"> <a href="https://apple.co/2YnRUE5" target="_blank"> <img class="center fixedwidth" align="center" border="0" src="https://s3.amazonaws.com/muuwho-mail-images/appleStore.png" alt="Image" title="Image" style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: block !important;border: none;height: auto;float: none;width: 100%;max-width: 195px" width="195"> </a></div></div></div></div></div></div></div></td></tr></tbody> </table> </body></html>'
      }


    };

    let body = JSON.stringify(correo);

    // console.log(


    //Save hitch
    let d: Date = new Date();
    let year = d.getFullYear();
    let month = d.getMonth() + 1;
    let day = d.getDate();
    let hours = d.getHours();
    let minutes = d.getMinutes();
    let seconds = d.getSeconds();

    let hitchData = {
      company: this.oferta.company,
      companyName: this.oferta.companyName,
      companyProfilePic: this.oferta.profilePic,
      contactName: this.ce,
      idContact: this.ce,
      idHitch: Math.floor(1000 + (Math.random() * 8999)) + year.toString() + month.toString() + day.toString() + hours.toString() + minutes.toString() + seconds.toString(),
      offerCreationDate: this.oferta.creationDate,
      offerJob: this.oferta.puesto,
      offerReward: this.oferta.recompensa,
      userName: this._us.perfil.nombre+" "+this._us.perfil.apellidos,
      username: this._us.perfil.username,
      userPhoto: this._us.perfil.profileImage,
      userProfilePic: "https://s3.amazonaws.com/muuwho-images/ProfileImages/mail.png",
      mail: 1,
      tipo: this.typeOffer
    }

    this.http.post(URL_SERVICIOS + "/newHitch", JSON.stringify(hitchData))
      .map(resp => resp.json())
      .subscribe(
        data => {
          console.log("TCL: HacerHitchPage -> email -> data", data)
          this.http.post(url, body)
            .map(resp => resp.json())
            .subscribe(
              data => {
                console.log("TCL: HacerHitchPage -> email -> data", data)
                this.alertCtrl.create({
                  title: 'Hitch',
                  subTitle: '<img src="../assets/imgs/mensaje-hitch.jpg">',
                  message: '¡Tu Hitch ha sido enviado exitosamente!',
                  buttons: [
                    {
                      text: 'Ok',
                      handler: () => {
                        this.navCtrl.pop();
                      }
                    }
                  ]
                }).present();
              },
              error => {
                console.log(error);
              }
            )
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

  hitches(contacto: any, hitch: Hitch) {

    let d: Date = new Date();
    let year = d.getFullYear();
    let month = d.getMonth() + 1;
    let day = d.getDate();
    let hours = d.getHours();
    let minutes = d.getMinutes();
    let seconds = d.getSeconds();

    this.hitch.company = this.oferta.company;
    this.hitch.companyName = this.oferta.companyName;
    this.hitch.companyProfilePic = this.oferta.profilePic;
    this.hitch.contactName = contacto.nombre;
    this.hitch.idContact = contacto.idContact;
    this.hitch.idHitch = Math.floor(1000 + (Math.random() * 8999)) + year.toString() + month.toString() + day.toString() + hours.toString() + minutes.toString() + seconds.toString();
    this.hitch.offerCreationDate = this.oferta.creationDate;
    this.hitch.offerJob = this.oferta.puesto;
    this.hitch.offerReward = this.oferta.recompensa;
    this.hitch.userName = this._us.perfil.nombre+" "+this._us.perfil.apellidos;
    this.hitch.username = this._us.perfil.username;
    this.hitch.userPhoto = this._us.perfil.profileImage;
    this.hitch.userProfilePic = contacto.profileImage;
    this.hitch.tipo = this.typeOffer;

    let body = JSON.stringify(this.hitch);

    let url = URL_SERVICIOS + "/newHitch";

    this.http.post(url, body)
      .map(resp => resp.json())
      .subscribe(
        data => {
          this.alertCtrl.create({
            title: 'Hitch',
            subTitle: '<img src="../assets/imgs/mensaje-hitch.jpg">',
            message: '¡Tu Hitch ha sido enviado exitosamente!',
            buttons: [
              {
                text: 'Ok',
                handler: () => {
                  this.navCtrl.pop();
                }
              }
            ]
          }).present();
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
