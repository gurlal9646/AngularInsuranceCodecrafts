import { Component,OnInit } from '@angular/core';
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
  selector: 'app-manageproducts',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './manageproducts.component.html',
  styleUrl: './manageproducts.component.css'
})
export class ManageproductsComponent {

  title: string = "Add";
  productList: any = [];
  productForm: FormGroup;
  ProductId:string ='';


  constructor(
    private productService: ProductService,
    private formBuilder: FormBuilder,
    private router: Router,
    private activateRouter:ActivatedRoute
  ) {
    this.productForm = this.formBuilder.group({
      ProductId:[""],
      ProductName: ["", Validators.required],
      Model: ["", Validators.required],
      Manufacturer: ["", Validators.required],
      Description: ["", Validators.required],
      Price: ["", Validators.required],
      WarrantyDetails: ["", Validators.required],
      Availability: ["", Validators.required],
    });

    this.activateRouter.params.subscribe(params => {
      this.ProductId = params['productId'];
    });

    if(this.ProductId){
      this.title = 'Edit';
      this.getProduct();
    }
  }

    ngOnInit(): void {
    }

    getProduct(): void {
      this.productService.getProductById(this.ProductId).subscribe({
        next: (response: any) => {
          this.productForm.patchValue(response);
        },
        error: (error: any) => {
          console.error("There was an error!", error); // Handle any errors
        },
      });
    }

    addProduct() {
      if(this.ProductId){
        this.productService.updateProduct(this.ProductId,this.productForm.value).subscribe({
          next: (response: any) => {
            Swal.fire({
              title: response,
              icon: "success",
              showCancelButton: false,
              showConfirmButton: false,
              timer: 5000,
            });
            this.router.navigateByUrl("/products");
          },
          error: (error: any) => {
            console.error("There was an error!", error); // Handle any errors
          },
        });
      }
      else{
        this.productService.addProduct(this.productForm.value).subscribe({
          next: (response: any) => {
            Swal.fire({
              title: response,
              icon: "success",
              showCancelButton: false,
              showConfirmButton: false,
              timer: 5000,
            });
            this.router.navigateByUrl("/products");
          },
          error: (error: any) => {
            console.error("There was an error!", error); // Handle any errors
          },
        });

}
    }
  }
