import { Component } from '@angular/core';
import { NavParams, AlertController } from 'ionic-angular';

import { Http } from '@angular/http';

import { URL_SERVICIOS } from "../../config/url.servicios";
import { UsuarioService } from '../../providers/usuario';

@Component({
  selector: 'page-perfilusuario',
  templateUrl: 'perfilusuario.html',
})
export class PerfilusuarioPage {
  contacto:any[0];

  perfil: any = {};
  academica: any [] = [] ;
  trabajo: any = [] ;

  constructor(private navParams: NavParams,
              private alertCtrl:AlertController,
              private http:Http,
              private _us:UsuarioService) {

      this.contacto=this.navParams.get("contacto");



      if(this.contacto.idContact == null){
        this.cargar_busqueda();
        this.cargar_resumen_busqueda();

      }else{
        this.cargar_perfil();
        this.cargar_resumen();
      }

}

amistad():boolean{
  if( this.contacto.requestAccepted == "1" ){
    return true;
  }else{
    return false;
  }
}

cargar_perfil(){
  let url = URL_SERVICIOS + "/getUser?" + "username=" + this.contacto.idContact;

  return this.http.get(url)
      .map(resp => resp.json())
      .subscribe(data=>{
        if(data === undefined){
          console.log("error");
        }else{
          this.perfil=data;
        }
      })
}

cargar_resumen(){
  let url = URL_SERVICIOS+"/getResume?"+"username=" + this.contacto.idContact;

  return this.http.get(url)
      .map(resp => resp.json())
      .subscribe(resumen=>{
        if(resumen === undefined){
          console.log("error");
        }else{
          this.academica=resumen.acad;
          this.trabajo=resumen.work;

        }
      })
}


cargar_busqueda(){
  let url = URL_SERVICIOS + "/getProfileUser?username=" + this.contacto.username;


  return this.http.get(url)
      .map(resp => resp.json())
      .subscribe(data=>{
        if(data === undefined){
          console.log("error");
        }else{
          this.perfil=data;
        }
      })
}

cargar_resumen_busqueda(){

  let url = URL_SERVICIOS+"/getResume?"+"username=" + this.contacto.username;

  return this.http.get(url)
      .map(resp => resp.json())
      .subscribe(resumen=>{
        if(resumen === undefined){
          console.log("error");
        }else{
          this.academica=resumen.acad;
          this.trabajo=resumen.work;

        }
      })
}

solicitud_de_amistad(){


  let url = URL_SERVICIOS + "/friendRequest?" + "username=" + this._us.usuario + "&contact=" + this.perfil.username;
  this.http.get(url)
  .map(resp => resp.json())
  .subscribe(data=>{
    this.alertCtrl.create({
      title: 'Solicitud de amistad',
      message:'¡Tu Solicitud se ha enviado exitosamente!',
      buttons:['Ok']
    }).present();
  },
  error=>{
    console.log(error)
    if (error._body == '"isAlreadyFriend"') {
      this.alertCtrl.create({
        title: 'Solicitud de amistad',
        message: 'Esperando que '+ this.perfil.nombre +' acepte la solicitud',
        buttons: [
          {
            text: 'Ok',
            handler: () => {
            }
          }
        ]
      }).present();
    }
  })
}


}
