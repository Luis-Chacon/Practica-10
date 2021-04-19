import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { environment } from "src/environments/environment";
import { Oferta } from './oferta.model';
import { map, tap } from "rxjs/operators";

@Injectable({
    providedIn:'root'
})

export class OfertaService
{

  constructor(private http: HttpClient)
  {}

  private _ofertas = new BehaviorSubject<Oferta[]>([]);

    /*private ofertas: Oferta[]=[
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
      ];*/

  get ofertas()
  {
    return this._ofertas.asObservable();
  }

  addOferta(ofertas: Oferta)
  {
    this.http.post<any>(environment.firebaseUrl + 'ofertas.json', {...ofertas}).subscribe(data => {
      console.log(data);
    });
  }

  fetchOfertas()
  {
    return this.http.get<{[key: string]: Oferta}>(
      environment.firebaseUrl + 'ofertas.json'
    )
    .pipe(map (dta =>{
      const ofertas = [];
      for(const key in dta)
      {
        if(dta.hasOwnProperty(key))
        {
          ofertas.push(
            new Oferta(
              key,
              dta[key].titulo,
              dta[key].propaganda,
              dta[key].imgUrl,
              dta[key].vigencia
            )
          );
        }
      }
      return ofertas;
    }),
    tap(rest => {
      this._ofertas.next(rest);
    }));
  }

  /*getAllOfertas()
  {
    // this.addOferta(this.ofertas[0]);
    // this.addOferta(this.ofertas[1]);
    // this.addOferta(this.ofertas[2]);
      return[...this.ofertas];
  }*/

}