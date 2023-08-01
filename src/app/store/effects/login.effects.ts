import { Injectable, inject } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { logInService } from "src/app/service/loginservice.service";
import { userLogin } from "../actions/user.actions";
import { catchError, delay, exhaustMap, map, mergeMap } from "rxjs";


// export const loginEffect = createEffect((actions$ = inject(Actions), loginService = inject(logInService)) => {
//     return actions$.pipe(
//       ofType(userLogin.login),
//       mergeMap((action) =>
//         loginService.login(action.email, action.password).pipe(
//           map((response) => {
//             if ('error' in response) {
//               return userLogin.loginErrors({ error: response.error });
//             } else {
//               return userLogin.loginSuccess({
//                 email: response.email,
//                 password: response.password,
//               });
//             }
//           }),
//           catchError(async (error) => userLogin.loginErrors({ error: 'An error occurred' })
//           )
//         )
//       )
//     );
// }, {
//     functional: true
// });

@Injectable()
export class UserEffects {
  login$ = createEffect(() =>
     {
        return this.actions$.pipe(
          ofType(userLogin.login),
          delay(1000),
          mergeMap((action) =>
            this.logInService.login(action.email, action.password).pipe(
              map((response) => {
                if ('error' in response) {
                  return userLogin.loginErrors({ error: response.error });
                } else {
                  return userLogin.loginSuccess({
                    email: response.email,
                    password: response.password,
                  });
                }
              }),
              catchError(async (error) =>
                userLogin.loginErrors({ error: 'An error occurred' })
              )
            )
          )
        );
     }
  );

  constructor(private actions$: Actions, private logInService: logInService) {}
}