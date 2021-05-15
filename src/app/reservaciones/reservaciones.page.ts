import { Component, OnInit } from '@angular/core';
import { IonItemSliding, LoadingController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { Reservacion } from './reservacion.model';
import { ReservacionService } from './reservaciones.service';


@Component({
  selector: 'app-reservaciones',
  templateUrl: './reservaciones.page.html',
  styleUrls: ['./reservaciones.page.scss'],
})
export class ReservacionesPage implements OnInit {

  reservaciones: Reservacion[]=[];
  reservacionesSub: Subscription;
  isLoading = false;
  
  constructor(
    private reservacionService: ReservacionService,
    private loadingCtrl: LoadingController
    ) { }

  ngOnInit() 
  {
      this.reservacionesSub = this.reservacionService.reservaciones.subscribe( rsvs =>{
        this.reservaciones = rsvs;
      });
  }

  ionViewWillEnter()
  {
    console.log('IONIC -> ionViewWillEnter');
    this.isLoading = true;

    this.reservacionesSub = this.reservacionService.fetchReservaciones().subscribe( rsvs => {
      this.reservaciones = rsvs;
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

  onRemoveReservacion(reservacionId: string, sldingEl: IonItemSliding)
  {
    console.log('onRemoveReservacion');
    sldingEl.close();
    this.loadingCtrl.create({
      message:'eliminando reservación...'
    })
      .then( loadingEl => {
        loadingEl.present();
        this.reservacionService.removeReservacion(reservacionId).subscribe(() => {
          loadingEl.dismiss();
        });
      });
  }

}
