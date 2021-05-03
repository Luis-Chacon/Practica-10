import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Oferta } from './oferta.model';
import { OfertaService } from './ofertas.service';

@Component({
  selector: 'app-ofertas',
  templateUrl: './ofertas.page.html',
  styleUrls: ['./ofertas.page.scss'],
})
export class OfertasPage implements OnInit {

  ofertas: Oferta[]=[];
  ofertaSub: Subscription;
  isLoading = false;

  
  constructor(private ofertaService: OfertaService) { }

  ngOnInit() 
  {
    //this.ofertas = this.ofertaService.getAllOfertas();

    this.ofertaSub = this.ofertaService.ofertas.subscribe(rests =>{
      this.ofertas = rests;
    });
  }

  ionViewWillEnter()
  {
    console.log('IONIC -> ionViewWillEnter');
    this.isLoading = true;
    this.ofertaSub = this.ofertaService.fetchOfertas().subscribe(() => {
      this.isLoading = false;
    });
  }

  ngOnDestroy()
  {
    if(this.ofertas)
    {
      this.ofertaSub.unsubscribe();
    }
  }

}
