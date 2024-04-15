import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import moment from 'moment';
import { Router, RouterLink } from '@angular/router';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-userproducts',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './userproducts.component.html',
  styleUrl: './userproducts.component.css'
})
export class UserproductsComponent implements OnInit{

  userProducts:any=[];
  constructor(private productService:ProductService,private router:Router){

  }
  ngOnInit(): void {
    this.getUserProducts();
  }


  getUserProducts(): void {
    this.productService.getUserProducts().subscribe({
      next: (response: any) => {
          this.userProducts = response; 

          for(let prod of this.userProducts){
            prod.PurchaseDate = moment(prod.PurchaseDate).format('YYYY-MM-DD');
            prod.createdAt = moment(prod.createdAt).format('YYYY-MM-DD');

          }

      },
      error: (error: any) => {
        console.error('There was an error!', error); // Handle any errors
      }
    });
  }


  deleteProduct(userProductId:string){
    
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this user product!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {

          this.productService.deleteUserProduct(userProductId).subscribe({
            next: (response: any) => {
              Swal.fire({
                title: response,
                icon: "success",
                showCancelButton: false,
                showConfirmButton: false,
                timer: 5000,
              });
              this.ngOnInit();
            },
            error: (error: any) => {
              console.error("There was an error!", error); // Handle any errors
            },
          });
        } catch (error) {
          console.error('Error deleting user product:', error);
          Swal.fire('Error!', 'Failed to delete the user product.', 'error');
        }
      }
    });
  };
  
 

}
