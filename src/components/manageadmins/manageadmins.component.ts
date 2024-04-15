import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import Swal from "sweetalert2";
import { LoginService } from "../../services/login.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-manageadmins',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './manageadmins.component.html',
  styleUrl: './manageadmins.component.css'
})
export class ManageadminsComponent implements OnInit {
  adminForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private loginService: LoginService,
    private router:Router
  ) {
    this.adminForm = this.formBuilder.group({
      Email: ["", Validators.required],
      CellphoneNo: ["", Validators.required],
      Address: ["", Validators.required],
      Name: ["", Validators.required],
      Password: ["", Validators.required],
      RoleID: 1,
      Username: ["", Validators.required],
    });
  }
  ngOnInit(): void {
  }



  addAdmin() {
    if (this.adminForm.valid) {
      this.loginService.signupUser(this.adminForm.value).subscribe(
        (response) => {
          Swal.fire({
            title: 'Admin Added Successfully!',
            icon: "success",
            showCancelButton: false,
            showConfirmButton: false,
            timer: 5000,
          });
          this.router.navigateByUrl('/admins');
        },
        (error) => {
          console.error("Error occurred:", error);
          // Handle error appropriately
          Swal.fire({
            title: "Something went wrong",
            icon: "error",
            showCancelButton: false,
            showConfirmButton: false,
            timer: 5000,
          });
        }
      );
    }
  }
}
