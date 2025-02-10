import { HttpInterceptorFn } from "@angular/common/http";
import { environment } from "../environment/environment.development";
import { ErrorMsgService } from "./core/error-msg/error-msg.service";
import { inject } from "@angular/core";
import { Router } from "@angular/router";
import { catchError } from "rxjs";

const {apiUrl} = environment;

export const appInterceptor: HttpInterceptorFn = (req, next) => {
    //TODO: add api url replacement!

    const errorMsgService = inject(ErrorMsgService);
    const router = inject(Router);

    return next(req).pipe(
        catchError((err) => {
          if(err.status === 401) {
            router.navigate(['/login'])
          } else {
            errorMsgService.setError(err);
            router.navigate(['/error'])
          }
          return [err];
        })
      )
}