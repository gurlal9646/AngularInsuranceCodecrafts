import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http:HttpClient) { }


  getUserDetails(userId:any): Observable<any> {
    // Retrieve the token from local storage
    const token = localStorage.getItem('token'); 
    // Make an HTTP GET request to the specified URL
    return this.http.get<any>(`https://insurance-claim-server.vercel.app/api/user/list/${userId}`, {
      // Set the authorization header with the token
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
  }

  getusers(): Observable<any> {
    // Retrieve the token from local storage
    const token = localStorage.getItem('token'); 
    // Make an HTTP GET request to the specified URL
    return this.http.get<any>(`https://insurance-claim-server.vercel.app/api/user/list`, {
      // Set the authorization header with the token
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
  }
  

  updateUser(id:any,data: any): Observable<any> {
    // Retrieve the token from local storage
    const token = localStorage.getItem('token'); 
    // Make an HTTP POST request to the specified URL
    return this.http.put(`https://insurance-claim-server.vercel.app/api/user/update/${id}`, data, {
      // Set the authorization header with the token
      headers: {
        'Authorization': `Bearer ${token}`
      },
      // Set the response type to text
      responseType: 'text'
    });
  }

  deleteUser(id:string): Observable<any> {
    // Retrieve the token from local storage
    const token = localStorage.getItem('token'); 
    // Make an HTTP POST request to the specified URL
    return this.http.delete(`https://insurance-claim-server.vercel.app/api/user/delete/${id}`, {
      // Set the authorization header with the token
      headers: {
        'Authorization': `Bearer ${token}`
      },
      // Set the response type to text
      responseType: 'text'
    });
  }

}
