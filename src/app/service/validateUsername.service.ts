import { Injectable } from '@angular/core';
import { Observable, delay, of } from 'rxjs';


@Injectable({
  providedIn: 'root',
})
export class validateUserName {
  validateUsername(username: string): Observable<boolean> {
    console.log('Trigger API call');
    let existedUsers = ['nhi', 'chau', 'chautran'];
    let isValid = existedUsers.includes(username)
    return of(isValid).pipe(delay(1000));
  }
}  
