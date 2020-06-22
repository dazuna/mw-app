import { Component } from '@angular/core';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { OfertasService } from "../../providers/ofertas"

@Component({
  selector: 'page-configuracion',
  templateUrl: 'configuracion.html',
})
export class ConfiguracionPage {

  constructor(
    private iab: InAppBrowser,
    private _os: OfertasService ) {
      this._os;
  }

  contactPage(){
    this.iab.create("https://muuwho.com/p_contacto.html","_blank");
  }
  diversityPage(){
    this.iab.create("https://muuwho.com/p_diversidad_e_inclusion.html","_blank");
  }
  intellectualPage(){
    this.iab.create("https://muuwho.com/p_propiedad_intelectual.html","_blank");
  }
  privacyPage(){
    this.iab.create("https://muuwho.com/p_politicas.html","_blank");
  }
  termsPage(){
    this.iab.create("https://muuwho.com/p_terminos.html","_blank");
  }
  aboutPage(){
    this.iab.create("https://muuwho.com/p_quienes-somos.html","_blank");
  }

}
