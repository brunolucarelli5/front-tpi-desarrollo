import { Component, ElementRef, OnInit, Renderer2 } from "@angular/core";
import { Router, RouterLink } from "@angular/router";
import { NavbarComponent } from "../components/footer/navbar/navbar.component";
import { NgClass } from "@angular/common";
import { AuthService } from "../../auth.service";
import { FooterComponent } from "../components/footer/footer.component";
import { IUser } from "../../interfaces/user";

@Component({
  selector: "app-home",
  standalone: true,
  imports: [RouterLink, RouterLink, NgClass, NavbarComponent, FooterComponent],
  templateUrl: "./home.component.html",
  styleUrl: "./home.component.css",
})
export class HomeComponent implements OnInit {
  dropdownOpen = false; // Variable to hold the state of the dropdown
  navbarOpen = false; // Variable to hold the state of the navbar
  currentRoute!: string;
  user: IUser = {firstName: "", lastName: ""};

  constructor(
    private renderer: Renderer2,
    private el: ElementRef,
    private authService: AuthService,
    private router: Router
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
    this.router.navigate(["/iniciar-sesion"]);
  }
}
