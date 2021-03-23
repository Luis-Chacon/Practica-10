import { Component, OnInit } from '@angular/core';
import { Oferta } from './oferta.model';
import { OfertaService } from './ofertas.service';

@Component({
  selector: 'app-ofertas',
  templateUrl: './ofertas.page.html',
  styleUrls: ['./ofertas.page.scss'],
})
export class OfertasPage implements OnInit {

  ofertas: Oferta[]=[];

  
  constructor(private ofertaService: OfertaService) { }

  ngOnInit() {
    this.ofertas = this.ofertaService.getAllOfertas();
  }

}
