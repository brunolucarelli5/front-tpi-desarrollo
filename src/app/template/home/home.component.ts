import { Component, ElementRef, Renderer2 } from "@angular/core";
import { Router, RouterLink } from "@angular/router";
import { NavbarComponent } from "../components/footer/navbar/navbar.component";
import { NgClass } from "@angular/common";
import { AuthService } from "../../auth.service";
import { FooterComponent } from "../components/footer/footer.component";

@Component({
  selector: "app-home",
  standalone: true,
  imports: [RouterLink, RouterLink, NgClass],
  templateUrl: "./home.component.html",
  styleUrl: "./home.component.css",
})
export class HomeComponent {
  dropdownOpen = false; // Variable to hold the state of the dropdown
  navbarOpen = false; // Variable to hold the state of the navbar
  currentRoute!: string;

  constructor(
    private renderer: Renderer2,
    private el: ElementRef,
    private authService: AuthService,
    private router: Router
  ) {}

  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen; // Toggle the state
    const dropdownMenu = this.el.nativeElement.querySelector("#dropdownNavbar");
    if (this.dropdownOpen) {
      this.renderer.removeClass(dropdownMenu, "hidden");
    } else {
      this.renderer.addClass(dropdownMenu, "hidden");
    }
  }

  toggleNavbar() {
    this.navbarOpen = !this.navbarOpen;
  }

  logout() {
    this.authService.logout();
    this.router.navigate(["/iniciar-sesion"]);
  }
}
