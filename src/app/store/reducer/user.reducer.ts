import { userList } from './../../interface/user';
import { createReducer, on } from "@ngrx/store"
import { userLogin } from "../actions/user.actions"
import { state } from '@angular/animations';

const initialState ={
    user: {},
    success: false,
    error: false,
    loading: false,
    message: ""
}
const listUsers = userList
export const userReducer = createReducer(
    initialState,
    on(userLogin.loginSuccess, (state, payload)=>{
        console.log("logInsuccess", payload)
        return {
            ...state,
            loading: false,
            user: {email: payload.email, password: payload.password},
            message: "Login success"
        }
        // let findUser = listUsers.find((user)=> user.email ===payload.email)
        // if(!findUser){
        //     return {
        //         ...state,
        //         error : true,
        //         message : "email not found"
        //     }
        // }else{
        //     if(payload.password !== findUser.password){
        //         return{
        //             ...state,
        //             message: "password not found",
        //             error: true
        //         }
        //     }
        // }
        // return {
        //     ...state,
        //     user: payload,
        //     success: true
        // }
    }),
    on(userLogin.login, (state, payload)=>{
        return {
            ...state,
            loading: true,
            message: ""

        }
    }),
    on(userLogin.loginErrors, (state, payload)=>{
        console.log("login error", payload)
        return {
            ...state,
            loading: false,
            error: true,
            message: payload.error,
            user: {}
        }
    }),
    on(userLogin.loginClear, (state)=>{
        return {
          user: {},
          success: true,
          error: false,
          loading: false,
          message: '',
        };
    })
)