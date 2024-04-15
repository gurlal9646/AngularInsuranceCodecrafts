import { Component } from "@angular/core";
import { Router, RouterLink, RouterLinkActive } from "@angular/router";
import { LoginComponent } from "../login/login.component";
import Swal from "sweetalert2";
import { LoginService } from "../../services/login.service";

@Component({
  selector: "app-sidenavigation",
  standalone: true,
  imports: [LoginComponent, RouterLink, RouterLinkActive],
  templateUrl: "./sidenavigation.component.html",
  styleUrl: "./sidenavigation.component.css",
})
export class SidenavigationComponent {
  roleId: any;
  constructor(private router: Router,private loginService:LoginService) {
    this.roleId = localStorage.getItem("roleId");
  }
  handleLogout() {
    Swal.fire({
      title: "Are you sure?",
      text: "You will be logged out of your account",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, log me out!",
    }).then((result: { isConfirmed: any }) => {
      if (result.isConfirmed) {
        window.localStorage.clear();
        this.loginService.logout();
        this.router.navigate(["/login"]);
      }
    });
  }
}
