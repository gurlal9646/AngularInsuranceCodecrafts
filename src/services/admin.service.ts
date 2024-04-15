import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
    providedIn: "root"
})
export class AdminService{
    
  constructor(private http: HttpClient){}
  

    getAdmin(): Observable<any> {
      // Retrieve the token from local storage
      const token = localStorage.getItem('token'); 
      // Make an HTTP GET request to the specified URL
      return this.http.get<any>('https://insurance-claim-server.vercel.app/api/user/adminlist', {
        // Set the authorization header with the token
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
    }

    deleteAdmin(id:string): Observable<any> {
      // Retrieve the token from local storages
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


