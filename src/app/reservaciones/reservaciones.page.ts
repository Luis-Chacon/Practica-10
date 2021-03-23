import { Component, OnInit } from '@angular/core';
import { Reservacion } from './reservacion.model';
import { ReservacionService } from './reservaciones.service';


@Component({
  selector: 'app-reservaciones',
  templateUrl: './reservaciones.page.html',
  styleUrls: ['./reservaciones.page.scss'],
})
export class ReservacionesPage implements OnInit {

  reservacion: Reservacion[]=[];
  
  constructor(private reservacionService: ReservacionService) { }

  ngOnInit() {
    this.reservacion = this.reservacionService.getAllReservaciones();
  }

}
