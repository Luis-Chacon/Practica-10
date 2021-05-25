import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router} from '@angular/router';
import { ActionSheetController, AlertController, LoadingController, ModalController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { NuevaReservacionComponent } from 'src/app/reservaciones/nueva-reservacion/nueva-reservacion.component';
import { ReservacionService } from 'src/app/reservaciones/reservaciones.service';
import { MapModalComponent } from 'src/app/shared/map-modal/map-modal.component';

import { Restaurante } from '../restaurante.model';
import { RestauranteService } from '../restaurante.service';

function base64toBlob(base64Data, contentType){
  contentType = contentType ||'';
  const sliceSize = 1024;
  const byteCharacters = window.atob(base64Data);
  const bytesLength = byteCharacters.length;
  const slicesCount = Math.ceil(bytesLength/sliceSize);
  const bytesArrays = new Array(slicesCount);

  for(let sliceIndex = 0; sliceIndex < slicesCount; ++sliceIndex)
  {
    const begin = sliceIndex * sliceSize;
    const end = Math.min(begin + sliceSize, bytesLength);

    const bytes = new Array(end - begin);
    for(let offset = begin, i = 0; offset < end; ++i,++offset)
    {
      bytes[i] = byteCharacters[offset].charCodeAt(0);
    }
    bytesArrays[sliceIndex] = new Uint8Array(bytes);
  }
  return new Blob(bytesArrays,{type: contentType});
}

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
    console.log('openReservaModal');
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

  onImagenSeleccionada(imageData: string | File)
  {
    let imageFile;

    if(typeof imageData === 'string')
    {
      try{
        imageFile = base64toBlob(imageData.replace('data:image/jpeg;base64',''),'image/jpeg');
      }
      catch(error)
      {
        console.log(error);
        return;
      }
    }
    else
    {
      imageData = imageData;
    }
  }

  onMostrarMapa()
  {
    this.modalCtrl.create({component: MapModalComponent, componentProps: 
    {
      center:{
        lat: this.restaurante.lat,
        lng: this.restaurante.lng
      },
      selectable: false,
      closeButtonText: 'cerrar',
      titulo: 'ubicacion'
    }}).then(modalEl => {
      modalEl.present();
    });
  }

}
