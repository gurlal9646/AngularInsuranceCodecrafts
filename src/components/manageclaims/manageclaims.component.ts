import { Component, OnInit } from "@angular/core";
import { ProductService } from "../../services/product.service";
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import Swal from "sweetalert2";
import { ActivatedRoute, Router } from "@angular/router";
import { ClaimsService } from "../../services/claims.service";

@Component({
  selector: "app-manageclaims",
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: "./manageclaims.component.html",
  styleUrl: "./manageclaims.component.css",
})
export class ManageclaimsComponent implements OnInit {
  title: string = "Add";
  userProductList: any = [];
  claimForm: FormGroup;
  userClaimId:string ='';

  constructor(
    private productService: ProductService,
    private claimService:ClaimsService,
    private formBuilder: FormBuilder,
    private router: Router,
    private activateRouter:ActivatedRoute
  ) {
    this.claimForm = this.formBuilder.group({
      ClaimId:[""],
      UserProductId: ["", Validators.required],
      Description: ["", Validators.required],
      DateOfClaim: ["", Validators.required],
    });

    this.activateRouter.params.subscribe(params => {
      this.userClaimId = params['claimId'];
    });


    if(this.userClaimId){
      this.title = 'Edit';
      this.getUserClaimById();
    }

  }
  ngOnInit(): void {
    this.getUserProductList();
  }


  getUserClaimById(): void {
    this.claimService.getClaimById(this.userClaimId).subscribe({
      next: (response: any) => {
        this.claimForm.patchValue(response);
      this.claimForm.get('DateOfClaim')?.setValue (new Date(response.DateOfClaim).toISOString().split('T')[0]);
      },
      error: (error: any) => {
        console.error("There was an error!", error); // Handle any errors
      },
    });
  }

  getUserProductList(): void {
    this.productService.getUserProducts().subscribe({
      next: (response: any) => {
        this.userProductList = response;
      },
      error: (error: any) => {
        console.error("There was an error!", error); // Handle any errors
      },
    });
  }

  addClaim() {
  
    if(this.userClaimId){
      this.claimService.updateClaim(this.userClaimId,this.claimForm.value).subscribe({
        next: (response: any) => {
          Swal.fire({
            title: response,
            icon: "success",
            showCancelButton: false,
            showConfirmButton: false,
            timer: 5000,
          });
          this.router.navigateByUrl("/claims");
        },
        error: (error: any) => {
          console.error("There was an error!", error); // Handle any errors
        },
      });
    }
    else{
      this.claimService.addClaim(this.claimForm.value).subscribe({
        next: (response: any) => {
          Swal.fire({
            title: response,
            icon: "success",
            showCancelButton: false,
            showConfirmButton: false,
            timer: 5000,
          });
          this.router.navigateByUrl("/claims");
        },
        error: (error: any) => {
          console.error("There was an error!", error); // Handle any errors
        },
      });
    }

 



  }



  
  
}
