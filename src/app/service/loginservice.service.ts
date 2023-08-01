import { Injectable } from '@angular/core';
import { Observable, delay, of } from 'rxjs';
import { userList } from '../interface/user';

@Injectable({
  providedIn: 'root',
})
export class logInService {

  login(email: string, password: string): Observable<any>{
    let findUser = userList.find((user)=> user.email === email)
    if(!findUser){
        return of({ error: 'not found mail' });
    }else{
        if(password !== findUser.password){
            return of({ error: 'password incorrect' });
        }
    }

    return of(findUser)
  }
}
