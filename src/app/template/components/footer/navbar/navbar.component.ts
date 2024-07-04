import { CommonModule, NgIf } from "@angular/common";
import { Component, ElementRef, OnInit, Renderer2 } from "@angular/core";
import { AuthService } from "../../../../auth.service";
import { IUser } from "../../../../interfaces/user";
import {
  ActivatedRoute,
  Router,
  RouterLink,
  RouterOutlet,
} from "@angular/router";

@Component({
  selector: "app-navbar",
  standalone: true,
  imports: [RouterOutlet, RouterLink, NgIf, CommonModule],
  templateUrl: "./navbar.component.html",
  styleUrl: "./navbar.component.css",
})
export class NavbarComponent implements OnInit {
  dropdownOpen = false; // Variable to hold the state of the dropdown
  navbarOpen = false; // Variable to hold the state of the navbar
  currentRoute!: string;
  user: IUser = {firstName: "", lastName: ""};

  constructor(
    private renderer: Renderer2,
    private el: ElementRef,
    private authService: AuthService,
    private router: Router,
  ) {}

  async ngOnInit(): Promise<void> {
    this.user = await this.authService.getUserFromToken();
  }

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
