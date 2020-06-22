import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';

export interface Idioma {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'idioma',
  templateUrl: 'idioma.html'
})
export class IdiomaComponent {
  idiomas: Idioma[] = [];

  text: string;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private translate: TranslateService) {

  }

  changeLanguage (lang) {
    this.translate.use(lang);
  }

}
