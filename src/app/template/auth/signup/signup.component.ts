import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { Router } from "@angular/router";
import { AuthService } from "./../../../auth.service";
import { CommonModule } from "@angular/common";
import Swal from "sweetalert2";

@Component({
  selector: "app-signup",
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: "./signup.component.html",
  styleUrls: ["./signup.component.css"],
})
export class SignupComponent implements OnInit {
  signupForm!: FormGroup;
  emails: string[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  async ngOnInit(): Promise<void> {
    this.signupForm = this.formBuilder.group({
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required, Validators.minLength(8)]],
      firstName: ["", Validators.required],
      lastName: ["", Validators.required],
    });
    this.emails = await this.authService.findAllEmails();
    console.log(this.emails);
  }

  onSubmit(): void {
    if (this.signupForm.valid) {
      const registerData = this.signupForm.value;
      console.log(registerData);
      // Check if the email is already taken
      if (this.emails.includes(registerData.email)) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Email has already been taken. Try with other one",
        });
        return; // Stop the submission process
      }
      // Proceed with registration if the email is not taken
      this.authService
        .register(registerData)
        .then(() => {
          Swal.fire("¡Success!", "User created successfully", "success").then(() => {
            setTimeout(() => {
              this.router.navigate(["/iniciar-sesion"]);
            }, 2000);
          });
        })
        .catch(() => {
          Swal.fire({
            icon: "error",
            title: "Error",
            text: "There was an error creating the user. Try again!",
          });
        });
    }
  }
}
