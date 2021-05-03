import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, NavController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { Reservacion } from '../reservacion.model';
import { ReservacionService } from '../reservaciones.service';

@Component({
  selector: 'app-reservacion-detalle',
  templateUrl: './reservacion-detalle.page.html',
  styleUrls: ['./reservacion-detalle.page.scss'],
})
export class ReservacionDetallePage implements OnInit {

  reservacion: Reservacion;
  reservacionSub: Subscription;
  isLoading = false;
  
  nombre:string;
  @ViewChild('fromNew') myForm: NgForm;

  constructor(
    private activatedRoute: ActivatedRoute,
    private reservacionService: ReservacionService,
    private navCtrl: NavController,
    private router: Router,
    private alertCtrl: AlertController
  ) {}

  ngOnInit() 
  {
    this.activatedRoute.paramMap.subscribe(paramM => {
      const param: string = 'reservacionId';
      if(!paramM.has(param))
      {
        this.navCtrl.navigateBack('reservaciones');
        return;
      }

      this.isLoading = true;

      const reservacionId: string = paramM.get(param);
      this.reservacionSub = this.reservacionService.getReservacion(reservacionId).subscribe(rsv => {
        this.reservacion = rsv;
        this.nombre = this.reservacion.nombre;
        this.isLoading = false;
      }, error => {
        this.alertCtrl.create({
          header:'Error',
          message: 'Error al obtener la reservacion!',
          buttons: [
            {
              text: 'Ok', handler: () => {
                this.router.navigate(['resevaciones']);
              }
            }
          ]
        }).then(alertEl => {
          alertEl.present();
        });
      });

    });
    
  }

  ngOnDestroy()
  {
    if(this.reservacionSub)
    {
      this.reservacionSub.unsubscribe();
    }
  }

  onEditar()
  {
    this.reservacion.nombre = this.myForm.value['nombre'];
    this.reservacionService.updateReservacion(this.reservacion.Id, this.reservacion);
  }

}
