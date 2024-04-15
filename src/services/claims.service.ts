import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClaimsService {

  constructor(private http:HttpClient) {}

  addClaim(data:any):Observable<any> {
    // Retrieve the token from local storage
    const token = localStorage.getItem('token'); 
    // Make an HTTP POST request to the specified URL
    return this.http.post('https://insurance-claim-server.vercel.app/api/claims/create', data, {
      // Set the authorization header with the token
      headers: {
        'Authorization': `Bearer ${token}`
      },
      // Set the response type to text
      responseType: 'text'
    });
  }


  updateClaim(id:string,data: any): Observable<any> {
    // Retrieve the token from local storage
    const token = localStorage.getItem('token'); 
    // Make an HTTP POST request to the specified URL
    return this.http.put(`https://insurance-claim-server.vercel.app/api/claims/update/${id}`, data, {
      // Set the authorization header with the token
      headers: {
        'Authorization': `Bearer ${token}`
      },
      // Set the response type to text
      responseType: 'text'
    });
  }

  getClaims(): Observable<any> {
    // Retrieve the token from local storage
    const token = localStorage.getItem('token'); 
    // Make an HTTP GET request to the specified URL
    return this.http.get<any>('https://insurance-claim-server.vercel.app/api/claims/list', {
      // Set the authorization header with the token
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
  }

  getClaimById(id:string): Observable<any> {
    // Retrieve the token from local storage
    const token = localStorage.getItem('token'); 
    // Make an HTTP GET request to the specified URL
    return this.http.get<any>(`https://insurance-claim-server.vercel.app/api/claims/${id}`, {
      // Set the authorization header with the token
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
  }

  deleteClaim(id:string): Observable<any> {
    // Retrieve the token from local storage
    const token = localStorage.getItem('token'); 
    // Make an HTTP POST request to the specified URL
    return this.http.delete(`https://insurance-claim-server.vercel.app/api/claims/delete/${id}`, {
      // Set the authorization header with the token
      headers: {
        'Authorization': `Bearer ${token}`
      },
      // Set the response type to text
      responseType: 'text'
    });
  }

  updateClaimStatus(id:string,data: any): Observable<any> {
    // Retrieve the token from local storage
    const token = localStorage.getItem('token'); 
    // Make an HTTP POST request to the specified URL
    return this.http.put(`https://insurance-claim-server.vercel.app/api/claims/updateClaimStatus/${id}`, data, {
      // Set the authorization header with the token
      headers: {
        'Authorization': `Bearer ${token}`
      },
      // Set the response type to text
      responseType: 'text'
    });
  }
}
