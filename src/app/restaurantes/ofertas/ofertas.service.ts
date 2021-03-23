import { Injectable } from "@angular/core";
import { Oferta } from './oferta.model';

@Injectable({
    providedIn:'root'
})

export class OfertaService{
    private ofertas: Oferta[]=[
        {titulo:'Hambuerguesas en $1 peso',
          propaganda:'Disfruta con quien tu quieras!!!',
          imgUrl:'https://i2.wp.com/liquidazona.com/wp-content/uploads/2019/05/Portada-66.png',
          vigencia:'Hasta agotar exitencia'},
        {titulo:'Todos los tacos que puedas comer!!!', 
            propaganda:'Disfurta en familia!!!',
           imgUrl:'https://mk0cazaofertassmxlbf.kinstacdn.com/wp-content/uploads/2014/12/cabo-grill-monterrey.jpg',
           vigencia:'Solamente valido los lunes'},
        {titulo:'Desayunos al 2X1',
          propaganda:'Ven a desayunar con nosotros',
          imgUrl:'https://mk0cazaofertassmxlbf.kinstacdn.com/wp-content/uploads/2017/01/super-salads-2x1-desayunos.jpg',
           vigencia:'Valido todos los Sabados y Domingos hasta las 12 pm'},
        {titulo:'Combos a solo $89!!!!',
          propaganda:'Disfruta con todos tus amigos!',
          imgUrl:"https://mk0cazaofertassmxlbf.kinstacdn.com/wp-content/uploads/2019/10/Carls-burgermania-081019.jpg",
          vigencia:"Valido de Lunes a Viernes"},
      ];

    constructor(){}

    getAllOfertas(){
        return[...this.ofertas];
    }

}