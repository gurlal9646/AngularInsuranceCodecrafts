import { Component } from "@angular/core";
import {
  FormsModule,
  NgForm,
  ReactiveFormsModule,
  FormGroup,
  FormControl,
  Validators,
} from "@angular/forms";
import { Router } from "@angular/router";
import { LoginService } from "../../services/login.service";
import Swal from "sweetalert2";

@Component({
  selector: "app-login",
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: "./login.component.html",
  styleUrl: "./login.component.css",
})
export class LoginComponent {
  loginForm = new FormGroup({
    Username: new FormControl("", Validators.required),
    Password: new FormControl("", Validators.required),
  });
  constructor(private router: Router, private loginService: LoginService) {}

  ngOnInit(): void {}

  submitForm() {
    if (this.loginForm.valid) {
      this.loginService.generateToken(this.loginForm.value).subscribe(
        (response) => {
          console.log("Token generated:", response);
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
