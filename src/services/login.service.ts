import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  public _isLoggedIn$ = new BehaviorSubject<boolean>(false);

  isLoggedIn$ = this._isLoggedIn$.asObservable();

  constructor(private http:HttpClient) { }


  generateToken(data: any): Observable<any> {
    return this.http.post<any>('https://insurance-claim-server.vercel.app/api/user/login', data);
  }

  loggedIn(){
    this._isLoggedIn$.next(true);
  }

  logout(){
    this._isLoggedIn$.next(false);
  }
  

  signupUser(data: any): Observable<any> {
    return this.http.post<any>('https://insurance-claim-server.vercel.app/api/user/signup', data);
  }
}
