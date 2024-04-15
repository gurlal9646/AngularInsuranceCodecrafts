import {Component, OnInit } from '@angular/core';
import moment from 'moment';
import { ClaimsService } from '../../services/claims.service';
import { RouterLink } from '@angular/router';
import { NgClass } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-claims',
  standalone: true,
  imports: [RouterLink,NgClass],
  templateUrl: './claims.component.html',
  styleUrl: './claims.component.css'
})
export class ClaimsComponent implements OnInit {
  userClaims:any=[];
  roleId: any;


  constructor(private claimService:ClaimsService){
    this.roleId = localStorage.getItem("roleId");
  }

  ngOnInit(): void {
    this.getUserClaims();
  }
  

  getUserClaims(): void {
    this.claimService.getClaims().subscribe({
      next: (response: any) => {
          this.userClaims = response; 

          for(let claim of this.userClaims){
            claim.DateOfClaim = moment(claim.DateOfClaim).format('YYYY-MM-DD');
            claim.createdAt = moment(claim.createdAt).format('YYYY-MM-DD');

          }

      },
      error: (error: any) => {
        console.error('There was an error!', error); // Handle any errors
      }
    });
  }

  deleteClaim(claimId:string){
    
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this claim!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {

          this.claimService.deleteClaim(claimId).subscribe({
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

  changeClaimStatus(claimId:string,Status:string){
    
    Swal.fire({
      title: 'Are you sure?',
      text: 'You want to change the status for this claim!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, change it!',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          this.claimService.updateClaimStatus(claimId,{Status}).subscribe({
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
