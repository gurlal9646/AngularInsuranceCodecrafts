import { Component, OnInit } from "@angular/core";
import { NavigationEnd, Router, RouterOutlet } from "@angular/router";
import { SidenavigationComponent } from "../components/sidenavigation/sidenavigation.component";
import { LoginService } from "../services/login.service";

@Component({
  selector: "app-root",
  standalone: true,
  imports: [RouterOutlet, SidenavigationComponent],
  templateUrl: "./app.component.html",
  styleUrl: "./app.component.css",
})
export class AppComponent implements OnInit {
  isLoggedIn: boolean = false;

  constructor(private router: Router,private loginService:LoginService) {
   
  }
  ngOnInit(): void {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.loginService.isLoggedIn$.subscribe((value: boolean) => {
          this.isLoggedIn = value;
        });
      }
    });
  }
}
