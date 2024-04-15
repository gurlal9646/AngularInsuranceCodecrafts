import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
  signupForm:FormGroup;

  constructor(private formBuilder:FormBuilder,private loginService:LoginService,private router:Router){
    this.signupForm = this.formBuilder.group({
      Email: ["", Validators.required],
      CellphoneNo: ["", Validators.required],
      Address: ["", Validators.required],
      Name: ["", Validators.required],
      Password: ["", Validators.required],
      Username: ["", Validators.required]
    });
  }


  submitForm(){
    if (this.signupForm.valid) {
      this.loginService.signupUser(this.signupForm.value).subscribe(
        (response) => {
          localStorage.setItem("token", response.token);
          localStorage.setItem("userId", response.UserID);
          localStorage.setItem("roleId", response.RoleID);
          this.loginService.loggedIn();
          this.router.navigate(["/claims"]);
        },
        (error) => {
          console.error("Error occurred:", error);
          // Handle error appropriately
          Swal.fire({
            title: "Invalid username or password",
            icon: "error",
            showCancelButton: false,
            showConfirmButton:false,
            timer: 5000,
          });
        }
      );
    }
  }
}
