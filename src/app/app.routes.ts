import { Routes } from "@angular/router";
import { LoginComponent } from "../components/login/login.component";
import { PagenotfoundComponent } from "../components/pagenotfound/pagenotfound.component";
import { SignupComponent } from "../components/signup/signup.component";
import { ClaimsComponent } from "../components/claims/claims.component";
import { ProductsComponent } from "../components/products/products.component";
import { UserproductsComponent } from "../components/userproducts/userproducts.component";
import { ManageuserproductsComponent } from "../components/manageuserproducts/manageuserproducts.component";
import { MyprofileComponent } from "../components/myprofile/myprofile.component";
import { AdminsComponent } from "../components/admins/admins.component";
import { ManageproductsComponent } from "../components/manageproducts/manageproducts.component";
import { ManageclaimsComponent } from "../components/manageclaims/manageclaims.component";
import { ManageadminsComponent } from "../components/manageadmins/manageadmins.component";
import { authGuard } from "../guard/auth.guard";
import { UsersComponent } from "../components/users/users.component";

export const routes: Routes = [
  { path: "", component: LoginComponent },
  { path: "login", component: LoginComponent },
  { path: "signup", component: SignupComponent },
  { path: "claims", component: ClaimsComponent,canActivate: [authGuard]  },
  { path: "addclaim", component: ManageclaimsComponent,canActivate: [authGuard] },
  { path: "editclaim/:claimId", component:ManageclaimsComponent,canActivate: [authGuard] },
  { path: "products", component: ProductsComponent,canActivate: [authGuard]  },
  { path: "editproduct/:productId", component: ManageproductsComponent,canActivate: [authGuard]  },
  { path: "addproduct", component: ManageproductsComponent,canActivate: [authGuard]  },
  { path: "userproducts", component: UserproductsComponent,canActivate: [authGuard]  },
  { path: "adduserproduct", component: ManageuserproductsComponent ,canActivate: [authGuard] },
  { path: "edituserproduct/:productId", component: ManageuserproductsComponent,canActivate: [authGuard]  },
  { path: "myprofile", component: MyprofileComponent,canActivate: [authGuard]  },
  { path:"admins", component: AdminsComponent,canActivate: [authGuard] },
  { path:"addadmin", component: ManageadminsComponent,canActivate: [authGuard] },
  { path:"users", component: UsersComponent,canActivate: [authGuard] },
  { path: "**", component: PagenotfoundComponent,canActivate: [authGuard]  }
];
