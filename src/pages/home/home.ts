import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import { LoadingController } from 'ionic-angular';

import { ApiProvider } from '../../providers/api/api'


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  valor; data; cdi;
  constructor(public navCtrl: NavController, public api: ApiProvider, public loading: LoadingController) {
    this.valor = 1000;
    this.cdi = 100;
    this.data = '2017-12-31';
  }

  public simular(valor, data, cdi){
    let loader = this.loading.create({
        content: 'Simulando..'
    });
    loader.present();
    this.api.simular(valor, cdi, data);
    setTimeout(() => {
      loader.dismiss();
    }, 2000);
    setTimeout(() => {
      this.valor = '';
      this.cdi = '';
      this.data = '';
    }, 1000);        

 }

}
