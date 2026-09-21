import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { catchError, mergeMap, retry } from 'rxjs/operators';
import { AuthService } from 'src/app/core/services/auth.service';
import { LocalStorage } from '../constants/local-storage.enum';
import { AbstractStorage } from '../services/storage.abstract';
import { DialogService } from 'src/app/shared/services/dialog.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(
    private readonly storage: AbstractStorage,
    private readonly injector: Injector,
    private readonly dialogService: DialogService,
  ) { }

  intercept(
    req: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const accessToken = this.storage.get(LocalStorage.ITEM_NAME_ACCESS_TOKEN);
    const clone = req.clone({
      headers: req.headers.append('Authorization', `Bearer ${accessToken}`)
                        // .append('access-control-expose-headers', 'mintargetapiversion')
    });

    const authService = this.injector.get(AuthService);

    return next.handle(clone).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.error instanceof ErrorEvent) {

        } else if (error.status === 409) {
          return authService.getNewAccessToken().pipe(
            retry(3),
            mergeMap((response) => {
              this.storage.save(
                LocalStorage.ITEM_NAME_ACCESS_TOKEN,
                response.accessToken
              );

              const newRequestClone = req.clone({
                headers: req.headers.append(
                  'Authorization',
                  `Bearer ${response.accessToken}`
                ),
              });

              return next.handle(newRequestClone);
            })
          );
        } else if (error.status === 400) {
          if (error.error?.title && error.error?.detail && error.error?.status && error.error?.errors) { // es instancia de ValidationProblemDetails
            // this.dialogService.mensajeError("¡Error " + error.error?.status + '!', error.error?.title)
            // return of()
          }
        // } else if (error.status === 401) {
        //   // const wwwAuthenticateHeader = error.headers.get('WWW-Authenticate');
        //   authService.logout();
        } else {
          if (error.error && error.error.result) {
            console.log('ocurrió un error > result > ', error.error.result);
          }
        }

        if(error.error?.message){
          console.log("Error => ", error.error.message)
        }

        return throwError(() => error.error);
      })
    );
  }
}

export class CustomValidationProblemDetails {
  detail: string;
  errors: object
  instance: string;
  status: number;
  title: string;
}
