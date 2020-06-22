import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { MyApp } from './app.component';

import { IdiomaComponent } from "../components/idioma/idioma";

import { HttpModule} from '@angular/http';
import { HttpClientModule, HttpClient } from "@angular/common/http";

import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { IonicStorageModule } from '@ionic/storage';
import { Camera } from '@ionic-native/camera';

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

import {
  ContactosPage,
  HitchPage,
  IndexPage,
  MenuPage,
  OfertasPage,
  OfertaCompletaPage,
  TabsPage,
  RegistratePage,
  PerfilusuarioPage,
  BuscadorPage,
  OfertasPrivadasPage,
  OfertasPrivadasCopletasPage,
  UsuarioPage,
  ConfiguracionPage,
  BuscadorusuarioPage,
  BuscadorprivadasPage,
  SolicitudesUseriosPage,
  HacerHitchPage,
  EditarperfilPage
} from "../pages/index.paginas";

// servicios
import { OfertasService,
         UsuarioService
        } from "../providers/index.services";

@NgModule({
  declarations: [
    MyApp,
    ContactosPage,
    HitchPage,
    IndexPage,
    MenuPage,
    OfertasPage,
    OfertaCompletaPage,
    TabsPage,
    RegistratePage,
    PerfilusuarioPage,
    BuscadorPage,
    OfertasPrivadasPage,
    OfertasPrivadasCopletasPage,
    UsuarioPage,
    ConfiguracionPage,
    BuscadorusuarioPage,
    BuscadorprivadasPage,
    SolicitudesUseriosPage,
    HacerHitchPage,
    EditarperfilPage,
    IdiomaComponent
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpModule,
    HttpClientModule,
    IonicStorageModule.forRoot(),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      }
    }),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    ContactosPage,
    HitchPage,
    IndexPage,
    MenuPage,
    OfertasPage,
    OfertaCompletaPage,
    TabsPage,
    RegistratePage,
    PerfilusuarioPage,
    BuscadorPage,
    OfertasPrivadasPage,
    OfertasPrivadasCopletasPage,
    ConfiguracionPage,
    UsuarioPage,
    BuscadorusuarioPage,
    BuscadorprivadasPage,
    SolicitudesUseriosPage,
    HacerHitchPage,
    EditarperfilPage
  ],
  providers: [
    InAppBrowser,
    StatusBar,
    SplashScreen,
    OfertasService,
    UsuarioService,
    Camera,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
