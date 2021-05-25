import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { map, tap } from "rxjs/operators";
import { environment } from "src/environments/environment";
import { Restaurante } from "./restaurante.model";


@Injectable({
    providedIn:'root'
})

export class RestauranteService
{
    constructor(private http: HttpClient){}

    private _restaurantes = new BehaviorSubject<Restaurante[]>([]);


    get restaurantes()
    {
        return this._restaurantes.asObservable();
    }


    // private restaurantes: Restaurante[] = [

    //     {id: null, titulo: 'Carls Jr', platillos: ['Hamburguesas', 'Ensaladas', 'Helados'],
    //     imgUrl:'https://frankata.com/wp-content/uploads/2019/01/800x600carlsjr-1170x877.jpg'},
    //     {id: null, titulo: 'Cabo Grill', platillos: ['Ceviche', 'Filete de pescado', 'Tacos de mariscos'],
    //     imgUrl:'https://i.pinimg.com/280x280_RS/e3/1e/e7/e31ee7950607eb55c87e199fd5ab6dd7.jpg'},
    //     {id: null, titulo: 'Super Salads', platillos: ['Ensaladas', 'Wraps', 'Paninis'],
    //     imgUrl:'https://cdn.worldvectorlogo.com/logos/super-salads.svg'}
    // ];

    


    addRestaurante(restaurante: Restaurante)
    {
        this.http.post<any>(environment.firebaseUrl + 'restaurantes.json', {...restaurante}).subscribe(data => {
            console.log(data);
        });
    }


    fetchRestaunates()
    {
        return this.http.get<{[key: string]: Restaurante}>(
            environment.firebaseUrl + 'restaurantes.json'
        )
        .pipe(map(dta => {
            const restaurantes = [];
            for(const key in dta)
            {
                if(dta.hasOwnProperty(key))
                {
                    restaurantes.push(
                        new Restaurante(key, dta[key].titulo, dta[key].imgUrl, dta[key].platillos, dta[key].lat, dta[key].lng)
                    );
                }
            }
            return restaurantes;
        }),
        tap(rest => {
            this._restaurantes.next(rest);
        }));
    }

    /*getAllRestaurantes(){
        /*this.addRestaurante(this.restaurantes[0]);
        this.addRestaurante(this.restaurantes[1]);
        this.addRestaurante(this.restaurantes[2]);
        return[...this.restaurantes];
    }*/


    getRestaurante(restauranteId: string){

        return this.http.get<Restaurante>(environment.firebaseUrl + `restaurantes/${restauranteId}.json`)
        .pipe(map( dta => {
            return new Restaurante(restauranteId, dta.titulo, dta.imgUrl, dta.platillos, dta.lat, dta.lng);
        }));


        /*return{...this.restaurantes.find(r =>{
            return r.id === restauranteId;
        })};*/
    }

    deleteRestaurante(restauranteId : string){
        /*this.restaurantes = this.restaurantes.filter(rest =>{
            return rest.id !== restauranteId;
        });*/
    }

}