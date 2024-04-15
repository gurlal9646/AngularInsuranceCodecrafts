import { Component, OnInit } from "@angular/core";
import { AdminService } from "../../services/admin.service";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterLink } from "@angular/router";
import moment from "moment";
import Swal from "sweetalert2";

@Component({
  selector: "app-admins",
  standalone: true,
  imports: [RouterLink],
  templateUrl: "./admins.component.html",
  styleUrl: "./admins.component.css",
})
export class AdminsComponent implements OnInit {
  adminList: any = [];
  constructor(private adminService: AdminService) {}

  ngOnInit(): void {
    this.getAdminList();
  }

  getAdminList(): void {
    this.adminService.getAdmin().subscribe({
      next: (response: any) => {
        this.adminList = response;

        for (let admin of this.adminList) {
          admin.createdAt = moment(admin.createdAt).format("YYYY-MM-DD");
        }
      },
      error: (error: any) => {
        console.error("There was an error!", error); // Handle any errors
      },
    });
  }


  deleteAdmin(adminId:string){
    
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this admin!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
    }).then(async (result: { isConfirmed: any; }) => {
      if (result.isConfirmed) {
        try {

          this.adminService.deleteAdmin(adminId).subscribe({
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
