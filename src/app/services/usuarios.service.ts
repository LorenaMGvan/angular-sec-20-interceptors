import { HttpClient , HttpErrorResponse, HttpHeaders, HttpParams} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { map , catchError} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  constructor( private http: HttpClient ) { }

  obtenerUsuarios() {
    let params = new HttpParams().append('page', '1');
    params = params.append('nombre', 'lorena mgvan');

    const headers = new HttpHeaders({
      'token-usuario': 'ABCD'
    });

    return this.http.get(`https://reqres.in/api/user`, {
      params,
      headers
    }).pipe(
      map( (resp: any) => {
        return resp['data'];
      }),
      catchError( (error: any ) => {
        console.log(error);
        return throwError('Error personalizado');
      })
    );
  }


  manejaError(error: HttpErrorResponse) {
    console.log('un error...');
    return throwError('Error personalizado ...');
  }

}
