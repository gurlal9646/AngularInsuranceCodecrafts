import { Component } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Router, RouterLink } from '@angular/router';
import Swal from 'sweetalert2';
import moment from 'moment';




@Component({
  selector: 'app-products',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent {



  products:any=[];
  constructor (private productService:ProductService,private router:Router){

  }

  ngOnInit(): void {
    this.getProducts();
  }
  getProducts() {
    this.productService.getProductList().subscribe({
      next:(response:any)=> {
        this.products = response;
        console.log(this.products);
      

      for (let prod of this.products){
        prod.PurchaseDate = moment(prod.PurchaseDate).format('YYYY-MM-DD');
        prod.createdAt = moment(prod.createdAt).format('YYYY-MM-DD');
      }
      },
      error: (error: any) => {
        console.error('There was an error!', error); // Handle any errors
      }
    });
  }
  deleteProduct(ProductId:string){
    
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this product!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {

          this.productService.deleteProduct(ProductId).subscribe({
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
          console.error('Error deleting product:', error);
          Swal.fire('Error!', 'Failed to delete the product.', 'error');
        }
      }
    });
  };

}
