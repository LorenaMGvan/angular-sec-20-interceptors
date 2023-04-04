import { HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor {

  constructor() { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // const headers = req.headers

     const headers = new HttpHeaders({
      'token-usuario': 'ABCD'
    });

    // .set('Content-Type', 'application/json');
    console.log('paso por el interceptor');
    
    const authReq = req.clone({
       headers 
    });
    
    return next.handle(authReq).pipe(
      catchError(this.manejaError)
    );
     
  }

  manejaError(error: HttpErrorResponse ){
    console.log(error);
    return throwError('Error personalizado');
  }

}

