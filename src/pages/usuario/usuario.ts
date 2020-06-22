import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';

import { EditarperfilPage } from "../index.paginas";

import { UsuarioService } from "../../providers/usuario"
import { Http } from '@angular/http';
import { URL_SERVICIOS } from "../../config/url.servicios";

import { Camera, CameraOptions } from '@ionic-native/camera';

@Component({
  selector: 'page-usuario',
  templateUrl: 'usuario.html',
})
export class UsuarioPage {

  headerImage: any;
  profileImage: any;
  userData: any = [];
  academica: any = [];
  trabajo: any = [];
  loading: any;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private http: Http,
    private _us: UsuarioService,
    public loadingCtlr: LoadingController,
    private toastCtrl: ToastController,
    private camera: Camera) {

  }

  ionViewWillEnter() {
    this._us.cargar_perfil();
    this.cargar_resumen();
    this.headerImage = this._us.perfil.headerImage;
    this.profileImage = this._us.perfil.profileImage;
  }

  showLoader() {
    this.loading = this.loadingCtlr.create({
      spinner: 'bubbles',
      content: "Please wait...",
    });
    this.loading.present();
  }

  presentToast() {
    let toast = this.toastCtrl.create({
      message: 'succesfully uploaded image',
      duration: 3000,
      position: 'bottom'
    });
    toast.present();
  }

  editar(usuario: any) {
    this.navCtrl.push(EditarperfilPage, { 'usuario': usuario });

  }

  cargar_resumen() {

    let url = `${URL_SERVICIOS}/getResume?username=${this._us.usuario}`;

    return this.http.get(url)
      .map(resp => resp.json())
      .subscribe(resumen => {
        if (resumen === undefined) {
          console.log("error");
        } else {
          this.academica = resumen.acad;
          this.trabajo = resumen.work;

        }
      })
  }

  updateCoverImage() {
    this.showLoader();
    const options: CameraOptions = {
      quality: 80,
      destinationType: this.camera.DestinationType.DATA_URL,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      saveToPhotoAlbum: false,
      allowEdit: true,
      targetWidth: 980,
      targetHeight: 320,
      correctOrientation: true
    }

    this.camera.getPicture(options).then(imageData => {
      this.headerImage = 'data:image/jpeg;base64,' + imageData;
      this.http.post(URL_SERVICIOS+"/uploadCoverPicture?username=" + this._us.usuario + "&password=" + this._us.token + "&type=jpg", JSON.stringify(imageData))
        .subscribe(
          data => {
            console.log(data)
            // alert("Exito!!")
            this.loading.dismiss();
            this.presentToast();
          }, error => {
            console.log(error)
            this.loading.dismiss();
            this.headerImage = this._us.perfil.headerImage;
            alert("Error");
          }
        );
    }, (err) => {
      this.loading.dismiss();
      console.log("Error en la camara", JSON.stringify(err));
    });
  }

  updateProfileImage() {
    this.showLoader();
    const options: CameraOptions = {
      quality: 80,
      destinationType: this.camera.DestinationType.DATA_URL,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      saveToPhotoAlbum: false,
      allowEdit: true,
      correctOrientation: true
    }

    this.camera.getPicture(options).then(imageData => {
      this.profileImage = 'data:image/jpeg;base64,' + imageData;
      let url= URL_SERVICIOS+'/uploadProfilePicture?username=' + this._us.usuario + '&password=' + this._us.token + '&type=jpg';
      this.http.post( url, JSON.stringify(imageData))
        .subscribe(
          data => {
            console.log(data)
            this.loading.dismiss();
            this.presentToast();
          }, error => {
            console.log(error)
            this.loading.dismiss();
            this.profileImage = this._us.perfil.profileImage;
            alert("Error");
          }
        );
    }, (err) => {
      this.loading.dismiss();
      console.log("Error en la camara", JSON.stringify(err));
    });
  }

}
