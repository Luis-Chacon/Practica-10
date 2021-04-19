import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Reservacion } from './reservacion.model';
import { ReservacionService } from './reservaciones.service';


@Component({
  selector: 'app-reservaciones',
  templateUrl: './reservaciones.page.html',
  styleUrls: ['./reservaciones.page.scss'],
})
export class ReservacionesPage implements OnInit {

  reservacion: Reservacion[]=[];
  reservacionesSub: Subscription;
  isLoading = false;
  
  constructor(private reservacionService: ReservacionService) { }

  ngOnInit() {
  }

  ionViewWillEnter()
  {
    console.log('IONIC -> ionViewWillEnter');
    this.isLoading = true;

    this.reservacionesSub = this.reservacionService.fetchReservaciones().subscribe( rsvs => {
      this.reservacion = rsvs;
      console.log(rsvs);
      this.isLoading = false;
    });
  }

  ngOnDestroy()
  {
    if(this.reservacionesSub)
    {
      this.reservacionesSub.unsubscribe();
    }
  }

}
