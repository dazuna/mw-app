import { Component } from '@angular/core';
import { Platform, MenuController, App } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { TranslateService } from '@ngx-translate/core';
import { IndexPage } from '../pages/index/index';

import {
  TabsPage,
  OfertasPrivadasPage,
  ConfiguracionPage
} from "../pages/index.paginas";


import { UsuarioService } from "../providers/usuario";



@Component({
  templateUrl: 'app.html'
})

export class MyApp {
  tabs: any = TabsPage;
  rootPage: any = IndexPage;

  index = IndexPage;

  configuracion = ConfiguracionPage;

  ofertas_privadas = OfertasPrivadasPage;

  constructor(public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    public platform: Platform,
    private menuCtrl: MenuController,
    private translate: TranslateService,
    public app: App,
    private _us: UsuarioService) {

    platform.ready().then(() => {
      if (this.platform.is("android")) {
        this.statusBar.styleLightContent();
      }
      if (this.platform.is('ios')) {
        this.statusBar.overlaysWebView(false);
        this.statusBar.backgroundColorByName("black");
      }
      splashScreen.hide();
    });


    this.translate.setDefaultLang('es');
    this.translate.use('en');

    let browserlang = this.translate.getBrowserLang();
    this.translate.use(browserlang.match(/es|en/) ? browserlang : "es");


  }

  abrirpagina(pagina: any) {
    this.rootPage = pagina;
    this.menuCtrl.close();
  }

  salir(pagina: any) {
    this._us.cerrar_sesion();
    this.menuCtrl.close();
    this.rootPage = pagina;
    const root = this.app.getRootNav();
    root.popToRoot();
  }

}
