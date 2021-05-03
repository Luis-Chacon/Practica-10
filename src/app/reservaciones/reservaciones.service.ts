import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { map,switchMap,take,tap } from "rxjs/operators";
import { environment } from "src/environments/environment";
import { LoginService } from "../login/login.service";
import { Restaurante } from "../restaurantes/restaurante.model";
import { Reservacion } from './reservacion.model';

@Injectable({
    providedIn:'root'
})

export class ReservacionService
{
    
    private _reservaciones = new BehaviorSubject<Reservacion[]>([]);
    usuarioId = null;
    
    get reservaciones()
    {
        return this._reservaciones.asObservable();
    }

    getReservacion(reservacionId: string)
    {
        const url = environment.firebaseUrl + `reservaciones/${reservacionId}.json`;

        return this.http.get<Reservacion>(url)
            .pipe(map(dta => {
                return new Reservacion(
                    reservacionId,
                    dta.restaurante,
                    dta.nombre,
                    dta.fecha,
                    dta.imgUrl,
                    dta.usuarioId
                );
            }));
    }

    updateReservacion(reservacionId: string, reservacion:Reservacion)
    {
        console.log('updateReservaciones');
        const url = environment.firebaseUrl + `reservaciones/${reservacionId}.json`;

        this.http.put<any>(url,{...reservacion}).subscribe(data => {
            console.log(data);
        });
    }

    fetchReservaciones()
    {
        console.log('fetchResevaciones');
        return this.http.get<{[key:string] : Reservacion}>(
            environment.firebaseUrl + 'reservaciones.json?orderBy="usuarioId"&equalTo="' + this.usuarioId + '"'
        )
        .pipe(map(dta =>{
            const rests = [];
            for(const key in dta){
                if(dta.hasOwnProperty(key)){
                    rests.push(new Reservacion(
                        key,
                        dta[key].imgUrl,
                        dta[key].restaurante,
                        dta[key].nombre,
                        dta[key].fecha,
                        dta[key].usuarioId
                    ));
                }
            }
            return rests;
        }),
        tap(rest => {
            this._reservaciones.next(rest);
        }));
    }

    addReservacion(rest: Restaurante,nombre:string, horario: string)
    {
        console.log(rest);
        console.log(horario);
        const rsv = new Reservacion(
            null,
            rest.imgUrl,
            rest.titulo,
            nombre,
            horario,
            this.usuarioId
        );

        this.http.post<any>(environment.firebaseUrl + 'reservaciones.json',{...rsv}).subscribe(data => {
            console.log(data);
        });
    }

    constructor
    (
        private http: HttpClient,
        private loginService: LoginService
    )
    {
        this.loginService.usuarioId.subscribe(usuarioId => {
            this.usuarioId = usuarioId;
        });
    }

    removeReservacion(reservacionId: string){
        console.log('removeReservacion');
        return this.http.delete(`${environment.firebaseUrl}reservaciones/${reservacionId}.json`)
            .pipe(switchMap(()=> {
                return this.reservaciones;
            }),take(1),tap( rsvs => {
                this._reservaciones.next(rsvs.filter(r => r.Id !== reservacionId))
            }))
    }
}