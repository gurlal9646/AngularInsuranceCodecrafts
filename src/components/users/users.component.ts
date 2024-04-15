import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import moment from 'moment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent implements OnInit {

  constructor(private userService:UserService){

  }
  usersList:any=[];
  ngOnInit(): void {
    this.getUsersList();
  }

  getUsersList(): void {
    this.userService.getusers().subscribe({
      next: (response: any) => {
        this.usersList = response;

        for (let user of this.usersList) {
          user.createdAt = moment(user.createdAt).format("YYYY-MM-DD");
        }
      },
      error: (error: any) => {
        console.error("There was an error!", error); // Handle any errors
      },
    });
  }

  deleteUser(userId:string){
    
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

          this.userService.deleteUser(userId).subscribe({
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
          console.error('Error deleting user:', error);
          Swal.fire('Error!', 'Failed to delete the user.', 'error');
        }
      }
    });
  };
  
}
