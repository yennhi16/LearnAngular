import { createActionGroup, emptyProps, props } from "@ngrx/store";

export const userLogin = createActionGroup({
  source: 'UserLogin',
  events: {
    Login: props<{ email: string; password: string }>(),
    LoginSuccess: props<{ email: string; password: string }>(),
    LoginErrors: props<{ error: string }>(),
    LoginClear: emptyProps(),
  },
});