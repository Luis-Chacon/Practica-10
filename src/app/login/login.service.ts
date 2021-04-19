import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { BehaviorSubject } from 'rxjs';
import { tap, map, retry } from 'rxjs/operators';
import { Usuario } from './usuario.models';


export interface LoginResponseData
{
  kind : string;
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  // private _usuarioLoggeado = false;

  private _usuario = new BehaviorSubject<Usuario>(null);
  get usuarioLoggeado()
  {
    //return this._usuarioLoggeado;
    return this._usuario.asObservable().pipe(map(user => {
      if(user)
      {
        return !!user.token;
      }
      else{
        return false;
      }
    }))
  }

  constructor(
    private http: HttpClient
  ) { }

  login(email: string, password:string)
  {
    //this._usuarioLoggeado = true;
    return this.http.post<LoginResponseData>(
      `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.firebaseAPIkey}`,
      {email: email, password: password, returnSecureToken:true}
    ).pipe(tap(this.setUserData.bind(this)));

  }

  logout()
  {
    //this._usuarioLoggeado = false;
    this._usuario.next(null);
  }

  singUp(email: string, password:string)
  {
    //https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=[API_KEY]
    return this.http.post<LoginResponseData>(
      `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${environment.firebaseAPIkey}`,
      {email: email, password: password, returnSecureToken:true}
    );
  }

  private setUserData(userData: LoginResponseData)
  {
    const expTime = new Date( new Date().getTime() + (+ userData.expiresIn * 1000));
    this._usuario.next(new Usuario(userData.localId, userData.email, userData.idToken, expTime));
  }
  

  get usuarioId()
  {
    return this._usuario.asObservable().pipe(map(user => {
      if(user)
      {
        return user.id;
      }
      else 
      {
        return null;
      }
    }));
  }
}
