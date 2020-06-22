import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { Http } from '@angular/http';

import { URL_SERVICIOS } from "../../config/url.servicios";

@Component({
  selector: 'page-solicitudes-userios',
  templateUrl: 'solicitudes-userios.html',
})
export class SolicitudesUseriosPage {
  solicitud:any[0];

  perfil: any = {};
  academica: any [] = [] ;
  trabajo: any = [] ;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public http:Http) {
      this.solicitud=this.navParams.get("solicitud");
      this.cargar_perfil();
      this.cargar_resumen();
  }

  cargar_perfil(){

    let url = URL_SERVICIOS + "/getUser?" + "username=" + this.solicitud.username;

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

    let url = URL_SERVICIOS+"/getResume?"+"username=" + this.solicitud.username;

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

}
