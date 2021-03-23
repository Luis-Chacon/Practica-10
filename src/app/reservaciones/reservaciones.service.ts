import { Injectable } from "@angular/core";
import { Restaurante } from "../restaurantes/restaurante.model";
import { Reservacion } from './reservacion.model';

@Injectable({
    providedIn:'root'
})

export class ReservacionService
{
    private reservacion: Reservacion[]=[
        {
            imgUrl: "https://frankata.com/wp-content/uploads/2019/01/800x600carlsjr-1170x877.jpg",
            restaurante: "Crals Jr.",
            fecha: "Lunes 29 de Marzo - 17:00"
        },
        {
            imgUrl: "https://i.pinimg.com/280x280_RS/e3/1e/e7/e31ee7950607eb55c87e199fd5ab6dd7.jpg ",
            restaurante: "Cabo Grill",
            fecha: "Martes 06 de Abril - 15:00"
        },
        {
            imgUrl: "https://cdn.worldvectorlogo.com/logos/super-salads.svg",
            restaurante: "Super Salads",
            fecha: "Jueves 13 se Junio - 18:30"
        },
        {
            imgUrl: "https://frankata.com/wp-content/uploads/2019/01/800x600carlsjr-1170x877.jpg ",
            restaurante: "Crals Jr.",
            fecha: "Viernes 21 de Mayo - 13:00"
        },

    ];
    constructor(){}

    getAllReservaciones(){
        return[...this.reservacion];
    }

    addReservacion(rest: Restaurante, horario: string)
    {
        this.reservacion.push({
            imgUrl: rest.imgUrl,
            restaurante: rest.titulo,
            fecha: horario
        });
    }
}