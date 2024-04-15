import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { UserService } from "../../services/user.service";
import Swal from "sweetalert2";

@Component({
  selector: "app-myprofile",
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: "./myprofile.component.html",
  styleUrl: "./myprofile.component.css",
})
export class MyprofileComponent implements OnInit {
  userForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService
  ) {
    this.userForm = this.formBuilder.group({
      Email: ["", Validators.required],
      CellphoneNo: ["", Validators.required],
      Address: ["", Validators.required],
      Name: ["", Validators.required],
      Password: ["", Validators.required],
      Username: ["", Validators.required],
    });
  }
  ngOnInit(): void {
    this.getUserDetails();
  }

  getUserDetails(): void {
    this.userService.getUserDetails(localStorage.getItem("userId")).subscribe({
      next: (response: any) => {
        this.userForm.patchValue(response);
      },
      error: (error: any) => {
        console.error("There was an error!", error);
      },
    });
  }

  updateUser() {
    if (this.userForm.valid) {
      this.userService.updateUser(localStorage.getItem("userId"),this.userForm.value).subscribe(
        (response) => {
          Swal.fire({
            title: response,
            icon: "success",
            showCancelButton: false,
            showConfirmButton: false,
            timer: 5000,
          });
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
