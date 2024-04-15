import { Component, OnInit } from "@angular/core";
import { ProductService } from "../../services/product.service";
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import Swal from "sweetalert2";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: "app-manageuserproducts",
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: "./manageuserproducts.component.html",
  styleUrl: "./manageuserproducts.component.css",
})
export class ManageuserproductsComponent implements OnInit {
  title: string = "Add";
  productList: any = [];
  productForm: FormGroup;
  userProductId:string ='';

  constructor(
    private productService: ProductService,
    private formBuilder: FormBuilder,
    private router: Router,
    private activateRouter:ActivatedRoute
  ) {
    this.productForm = this.formBuilder.group({
      ProductId: ["", Validators.required],
      PurchaseDate: ["", Validators.required],
      SerialNo: ["", Validators.required],
    });

    this.activateRouter.params.subscribe(params => {
      this.userProductId = params['productId'];
    });


    if(this.userProductId){
      this.title = 'Edit';
      this.getUserProduct();
    }

  }
  ngOnInit(): void {
    this.getProductList();
  }


  getUserProduct(): void {
    this.productService.getUserProductById(this.userProductId).subscribe({
      next: (response: any) => {
        this.productForm.patchValue(response);
      this.productForm.get('PurchaseDate')?.setValue (new Date(response.PurchaseDate).toISOString().split('T')[0]);
      },
      error: (error: any) => {
        console.error("There was an error!", error); // Handle any errors
      },
    });
  }

  getProductList(): void {
    this.productService.getProductList().subscribe({
      next: (response: any) => {
        this.productList = response;
      },
      error: (error: any) => {
        console.error("There was an error!", error); // Handle any errors
      },
    });
  }

  addProduct() {
    

    if(this.userProductId){
      this.productService.updateUserProduct(this.userProductId,this.productForm.value).subscribe({
        next: (response: any) => {
          Swal.fire({
            title: response,
            icon: "success",
            showCancelButton: false,
            showConfirmButton: false,
            timer: 5000,
          });
          this.router.navigateByUrl("/userproducts");
        },
        error: (error: any) => {
          console.error("There was an error!", error); // Handle any errors
        },
      });
    }
    else{
      this.productService.addUserProduct(this.productForm.value).subscribe({
        next: (response: any) => {
          Swal.fire({
            title: response,
            icon: "success",
            showCancelButton: false,
            showConfirmButton: false,
            timer: 5000,
          });
          this.router.navigateByUrl("/userproducts");
        },
        error: (error: any) => {
          console.error("There was an error!", error); // Handle any errors
        },
      });
    }

 



  }



  
  
}
