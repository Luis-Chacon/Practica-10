import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { Restaurante } from 'src/app/restaurantes/restaurante.model';

@Component({
  selector: 'app-nueva-reservacion',
  templateUrl: './nueva-reservacion.component.html',
  styleUrls: ['./nueva-reservacion.component.scss'],
})
export class NuevaReservacionComponent implements OnInit {

  @Input() restaurante : Restaurante;
  @ViewChild('formNew') myFrom : NgForm;

  constructor(
    private mondalCtrl: ModalController
  ) { }

  ngOnInit() {}

  onReservar()
  {
    this.mondalCtrl.dismiss({
      restaurante: this.restaurante,
      horario: new Date(this.myFrom.value['horario']).toLocaleDateString(undefined,{day:'numeric', month:'long', year:'numeric'}).replace('/','de')},'confirm');
  }

  onCancel()
  {
    this.mondalCtrl.dismiss(null,'cancel');
  }



}
