import { Component, OnInit } from '@angular/core';
import { Restaurante } from '../restaurante.model';
import { RestauranteService } from '../restaurante.service';

@Component({
  selector: 'app-descubrir',
  templateUrl: './descubrir.page.html',
  styleUrls: ['./descubrir.page.scss'],
})
export class DescubrirPage implements OnInit 
{

  restaurantes:Restaurante[] = [];

  constructor(private restauranteService: RestauranteService) { }

  ngOnInit() {
    console.warn('ngOnInit');
  }

  ionViewWillEnter()
  {
    console.log('ionViewDidEnter');
    this.restaurantes = this.restauranteService.getAllRestaurantes();
  }

  ionViewDidEnter()
  {
    console.log('ionViewDidEnter');
  }

  ionViewWillLeave()
  {
    console.log('ionViewWillLeave');
  }

  ionViewDidLeave()
  {
    console.log('ionViewDidLeave');
  }

  ngOnDestroy()
  {
    console.warn('ngOnDestroy');
  }

}
