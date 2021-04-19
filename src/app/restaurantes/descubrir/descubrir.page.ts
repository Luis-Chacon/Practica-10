import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
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
  restauranteSub: Subscription;
  isLoading = false;

  constructor(private restauranteService: RestauranteService) { }

  ngOnInit() {
    console.warn('ngOnInit');

    this.restauranteSub = this.restauranteService.restaurantes.subscribe( rests => {
      this.restaurantes = rests;
    });
  }

  ionViewWillEnter()
  {
    console.log('ionViewDidEnter');
    this.isLoading = true;
    this.restauranteSub = this.restauranteService.fetchRestaunates().subscribe(() => {
      this.isLoading = false;
    });
    // this.restaurantes = this.restauranteService.getAllRestaurantes();
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
    if(this.restauranteSub)
    {
      this.restauranteSub.unsubscribe();
    }
  }

}
