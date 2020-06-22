import { Component } from '@angular/core';
import {OfertasPage, ContactosPage, HitchPage, UsuarioPage} from "../index.paginas";

@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html',
})
export class TabsPage {
  tab1:any;
  tab2:any;
  tab3:any;
  tab4:any;

  constructor() {
    this.tab1=OfertasPage;
    this.tab2=ContactosPage;
    this.tab3=UsuarioPage;
    this.tab4=HitchPage;

  }

}
