import { Injectable } from "@angular/core";
import { Restaurante } from "./restaurante.model";


@Injectable({
    providedIn:'root'
})

export class RestauranteService
{
    private restaurantes: Restaurante[] = [

        {id: 1, titulo: 'Carls Jr', platillos: ['Hamburguesas', 'Ensaladas', 'Helados'],
        imgUrl:'https://frankata.com/wp-content/uploads/2019/01/800x600carlsjr-1170x877.jpg'},
        {id: 2, titulo: 'Cabo Grill', platillos: ['Ceviche', 'Filete de pescado', 'Tacos de mariscos'],
        imgUrl:'https://i.pinimg.com/280x280_RS/e3/1e/e7/e31ee7950607eb55c87e199fd5ab6dd7.jpg'},
        {id: 3, titulo: 'Super Salads', platillos: ['Ensaladas', 'Wraps', 'Paninis'],
        imgUrl:'https://cdn.worldvectorlogo.com/logos/super-salads.svg'}
    ];

    constructor(){}

    getAllRestaurantes(){
        return[...this.restaurantes];
    }
    getRestaurante(restauranteId: number){
        return{...this.restaurantes.find(r =>{
            return r.id === restauranteId;
        })};
    }

    deleteRestaurante(restauranteId : number){
        this.restaurantes = this.restaurantes.filter(rest =>{
            return rest.id !== restauranteId;
        });
    }

}