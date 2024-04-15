import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http:HttpClient) { 
  }


  
  
  addUserProduct(data: any): Observable<any> {
    // Retrieve the token from local storage
    const token = localStorage.getItem('token'); 
    // Make an HTTP POST request to the specified URL
    return this.http.post('https://insurance-claim-server.vercel.app/api/userProducts/register', data, {
      // Set the authorization header with the token
      headers: {
        'Authorization': `Bearer ${token}`
      },
      // Set the response type to text
      responseType: 'text'
    });
  }

  addProduct(data: any): Observable<any> {
    // Retrieve the token from local storage
    const token = localStorage.getItem('token'); 
    // Make an HTTP POST request to the specified URL
    return this.http.post('https://insurance-claim-server.vercel.app/api/product/create', data, {
      // Set the authorization header with the token
      headers: {
        'Authorization': `Bearer ${token}`
      },
      // Set the response type to text
      responseType: 'text'
    });
  }

  updateUserProduct(id:string,data: any): Observable<any> {
    // Retrieve the token from local storage
    const token = localStorage.getItem('token'); 
    // Make an HTTP POST request to the specified URL
    return this.http.put(`https://insurance-claim-server.vercel.app/api/userProducts/update/${id}`, data, {
      // Set the authorization header with the token
      headers: {
        'Authorization': `Bearer ${token}`
      },
      // Set the response type to text
      responseType: 'text'
    });
  }

  updateProduct(id:string,data: any): Observable<any> {
    // Retrieve the token from local storage
    const token = localStorage.getItem('token'); 
    // Make an HTTP POST request to the specified URL
    return this.http.put(`https://insurance-claim-server.vercel.app/api/product/update/${id}`, data, {
      // Set the authorization header with the token
      headers: {
        'Authorization': `Bearer ${token}`
      },
      // Set the response type to text
      responseType: 'text'
    });
  }


  deleteUserProduct(userProductId:string): Observable<any> {
    // Retrieve the token from local storage
    const token = localStorage.getItem('token'); 
    // Make an HTTP POST request to the specified URL
    return this.http.delete(`https://insurance-claim-server.vercel.app/api/userProducts/delete/${userProductId}`, {
      // Set the authorization header with the token
      headers: {
        'Authorization': `Bearer ${token}`
      },
      // Set the response type to text
      responseType: 'text'
    });
  }



  getUserProducts(): Observable<any> {
    // Retrieve the token from local storage
    const token = localStorage.getItem('token'); 
    // Make an HTTP GET request to the specified URL
    return this.http.get<any>('https://insurance-claim-server.vercel.app/api/userProducts/list', {
      // Set the authorization header with the token
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
  }

  
  getUserProductById(id:string): Observable<any> {
    // Retrieve the token from local storage
    const token = localStorage.getItem('token'); 
    // Make an HTTP GET request to the specified URL
    return this.http.get<any>(`https://insurance-claim-server.vercel.app/api/userProducts/getUserProductById/${id}`, {
      // Set the authorization header with the token
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
  }

  getProductById(id:string): Observable<any> {
    // Retrieve the token from local storage
    const token = localStorage.getItem('token'); 
    // Make an HTTP GET request to the specified URL
    return this.http.get<any>(`https://insurance-claim-server.vercel.app/api/product/getProductById/${id}`, {
      // Set the authorization header with the token
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
  }


  getProductList(){
     // Retrieve the token from local storage
     const token = localStorage.getItem('token'); 
     // Make an HTTP GET request to the specified URL
     return this.http.get<any>('https://insurance-claim-server.vercel.app/api/product/list', {
       // Set the authorization header with the token
       headers: {
         'Authorization': `Bearer ${token}`
       }
     });
 

  }
  deleteProduct(ProductId:string): Observable<any> {
    // Retrieve the token from local storage
    const token = localStorage.getItem('token'); 
    // Make an HTTP POST request to the specified URL
    return this.http.delete(`https://insurance-claim-server.vercel.app/api/product/delete/${ProductId}`, {
      // Set the authorization header with the token
      headers: {
        'Authorization': `Bearer ${token}`
      },
      // Set the response type to text
      responseType: 'text'
    });
  }
  
  
}
