import { CommonModule, NgIf } from "@angular/common";
import { Component, ElementRef, Renderer2 } from "@angular/core";
import {
  ActivatedRoute,
  Router,
  RouterLink,
  RouterOutlet,
} from "@angular/router";
import { AuthService } from "../../../../auth.service";

@Component({
  selector: "app-navbar",
  standalone: true,
  imports: [RouterOutlet, RouterLink, NgIf, CommonModule],
  templateUrl: "./navbar.component.html",
  styleUrl: "./navbar.component.css",
})
export class NavbarComponent {
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
    this.router.navigate(["iniciar-sesion"]);
  }
}
