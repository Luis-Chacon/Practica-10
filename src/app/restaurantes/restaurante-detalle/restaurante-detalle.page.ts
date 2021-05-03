import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router} from '@angular/router';
import { ActionSheetController, AlertController, LoadingController, ModalController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { NuevaReservacionComponent } from 'src/app/reservaciones/nueva-reservacion/nueva-reservacion.component';
import { ReservacionService } from 'src/app/reservaciones/reservaciones.service';

import { Restaurante } from '../restaurante.model';
import { RestauranteService } from '../restaurante.service';

@Component({
  selector: 'app-restaurante-detalle',
  templateUrl: './restaurante-detalle.page.html',
  styleUrls: ['./restaurante-detalle.page.scss'],
})

export class RestauranteDetallePage implements OnInit 
{

  restaurante:Restaurante;
  restauranteSub: Subscription;
  isLoading = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private restauranteService: RestauranteService,
    private router: Router,
    private alertCtrl: AlertController,
    private actionCtrl : ActionSheetController,
    private modalCtrl: ModalController,
    private loadingCtrl : LoadingController,
    private reservacionService: ReservacionService
  ) { }

  ngOnDestroy()
  {
    if(this.restauranteSub)
    {
      this.restauranteSub.unsubscribe();
    }
  }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(pMap => {
      const param: string = 'restauranteId';
      if(!pMap.has(param)){
        return;
      }
      const restauranteId: string = pMap.get(param);
      
      this.isLoading = true;
      this.restauranteSub = this.restauranteService.getRestaurante(restauranteId).subscribe(rest => {
         this.restaurante = rest;
         console.log(rest);
         this.isLoading = false;
      }, error => {
        this.alertCtrl.create({
          header: 'Error',
          message: 'Error al obtener el restaurante',
          buttons: [{
            text: 'Ok', handler: () => {
              this.router.navigate(['restaurantes/tabs/descubrir']);
            }
          }]
        }). then(alertEl => {
          alertEl.present();
        });
      });
      
      //this.restaurante = this.restauranteService.getRestaurante(restauranteId);
    });
  }

  onDeleteRest(){
    this.alertCtrl.create({
      header: 'Estas seguro?',
      message: 'Realmente quieres eliminar este restaurante?',
      buttons: [
        {text: 'Cancelar', role: 'cancel'},
        {text: 'Confirmar', handler: () => {
          this.restauranteService.deleteRestaurante(this.restaurante.id);
          this.router.navigate(['/restaurantes']);
        }}
      ]
    }).then(alert => {
      alert.present();
    });
  }

  onReservarRestaurante()
  {
    this.actionCtrl.create({
      header: 'Selecciona accion',
      buttons: [
        {text: 'Seleccionar Fecha', handler: () =>{
          this.openReservaModal('select');
        }},
        {text: 'Hoy',handler: () =>{
          this.openReservaModal('hoy');
        }},
        {text: 'Cancelar', role: 'cancel'}
      ]
    })
    .then(actionSheet =>{
      actionSheet.present();
    });

  }

  openReservaModal(modo:'select' | 'hoy')
  {
    this.modalCtrl.create({
      component: NuevaReservacionComponent,
      componentProps: {restaurante: this.restaurante, mode: modo}
    })
       .then(modalEl => {
       modalEl.present();
       return modalEl.onDidDismiss();
     })
       .then(result =>{
       if(result.role === 'confirm'){
         this.loadingCtrl.create({message: 'reservando...'})
         .then(loadingEl => {
           loadingEl.present();
          console.log(result);
           this.reservacionService.addReservacion(
             result.data.restaurante,
             result.data.nombre,
             result.data.horario);

           loadingEl.dismiss();
         });
       }
     });
     console.log(modo);
  }

  
}
