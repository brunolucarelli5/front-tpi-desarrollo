import { Routes } from "@angular/router";
import { LoginComponent } from "./template/auth/login/login.component";
import { HomeComponent } from "./template/home/home.component";
import { TemplateComponent } from "./template/template.component";
import { AuthGuardService } from "./auth-guard.service";
import { ProductsComponent } from "./template/components/products/products.component";
import { CreateProductComponent } from "./template/components/create-product/create-product.component";
import { SignupComponent } from "./template/auth/signup/signup.component";
import { EditProductComponent } from "./template/components/edit-product/edit-product.component";

export const routes: Routes = [
  { path: "", redirectTo: "/home", pathMatch: "full" },
  { path: "", component: TemplateComponent, children: [{ path: "home", component: HomeComponent }], canActivate: [AuthGuardService] },
  { path: "iniciar-sesion", component: LoginComponent },
  { path: "registrarse", component: SignupComponent },
  { path: "productos", component: ProductsComponent, canActivate: [AuthGuardService] },
  { path: "editar-producto/:id", component: EditProductComponent, canActivate: [AuthGuardService]},
  { path: "crear-producto", component: CreateProductComponent, canActivate: [AuthGuardService]},
  { path: "**", redirectTo: "home", pathMatch: "full"},
];
