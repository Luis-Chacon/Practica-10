import { DatePipe } from '@angular/common';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { Restaurante } from 'src/app/restaurantes/restaurante.model';

@Component({
  selector: 'app-nueva-reservacion',
  templateUrl: './nueva-reservacion.component.html',
  styleUrls: ['./nueva-reservacion.component.scss'],
  providers:[DatePipe]
})
export class NuevaReservacionComponent implements OnInit {

  @Input() restaurante : Restaurante;
  @Input() mode: 'select' | 'hoy';
  @ViewChild('formNew') myFrom : NgForm;

  fecha: string;
  desdeMin: string;
  Nombre: string;

  constructor(
    private mondalCtrl: ModalController
  ) { }

  ngOnInit() 
  { 
    const hoy = new Date();
    this.desdeMin = hoy.toISOString();
    if(this.mode === 'hoy')
    {
      this.fecha = hoy.toISOString();
    }

  }

  onReservar()
  {
    this.mondalCtrl.dismiss(
      {
      restaurante: this.restaurante,
      nombre: this.myFrom.value['nombre'],
      horario: new Date(this.myFrom.value['horario']).toLocaleDateString(undefined,{day:'numeric', month:'long', year:'numeric'}).replace('/','de')
      },'confirm');
  }

  onCancel()
  {
    this.mondalCtrl.dismiss(null,'cancel');
  }



}
