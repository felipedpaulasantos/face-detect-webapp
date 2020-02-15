import { throwError, Subject } from 'rxjs';

import { Injectable } from '@angular/core';
import { map, catchError } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private _profile: BehaviorSubject<any> = new BehaviorSubject(null);

  constructor(private http: HttpClient) {}

  buscarUsuario(){
    return this.http.get(environment.apiUrl+'/usuario').pipe(

      map(response => {
        return response;
      })

      // catchError( err =>
      //   throwError(err)
      // )
    )
  }

  cadastrarOuAtualizarUsuario(usuario){

    return this.http.post(environment.apiUrl+'/usuario', usuario).pipe(
      map(response => {
        return response;
      }),

      catchError( err=>
        throwError(err)
      )
    )
  }

  get perfil(): BehaviorSubject<any>{
    return this._profile;
  }

  setPerfilFromIdentityClaims(identityClaims: any){
    if (identityClaims) {
      let user = {
        nome: identityClaims.name,
        matricula: identityClaims.preferred_username
      }
      this._profile.next(user)
    }
  }

  hasPermissao(roles: any){
    if(roles && this.perfil && this.perfil.value){
      const found = this.perfil.value.roles.some(r=> roles.includes(r));
      if(found){
        return true;
      }
      else {
        return false;
      }
    }
    return false;
  }

}
