import { Component, OnInit } from "@angular/core";
import { NavbarComponent } from "../footer/navbar/navbar.component";
import { ProductsService } from "../../../products.service";
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from "@angular/forms";
import { CommonModule } from "@angular/common";
import { FooterComponent } from "../footer/footer.component";

@Component({
  selector: "app-create-product",
  standalone: true,
  imports: [NavbarComponent, CommonModule, ReactiveFormsModule, FooterComponent],
  templateUrl: "./create-product.component.html",
  styleUrls: ["./create-product.component.css"],
})
export class CreateProductComponent implements OnInit {
  createProductForm: FormGroup;
  submitted = false;
  productTypes: any[] | null = null;
  showSuccessToast = false;
  showWarningToast = false;

  constructor(
    private productsService: ProductsService,
    private formBuilder: FormBuilder
  ) {
    this.createProductForm = this.formBuilder.group({
      name: ["", Validators.required],
      price: ["", [Validators.required, Validators.min(0)]],
      productType: ["", Validators.required],
    });
  }

  async ngOnInit() {
    try {
      this.productTypes = await this.productsService.getProductTypes();
      console.log(this.productTypes);
    } catch (error) {
      console.error("Error fetching product types:", error);
    }
  }

  get formControls() {
    return this.createProductForm.controls;
  }

  async onSubmit() {
    this.submitted = true;
  
    // Check if the form is invalid or if there are validation errors
    if (this.createProductForm.invalid) {
      // Display the warning toast if there are form errors
      this.showWarningToast = true;
      setTimeout(() => {
        this.showWarningToast = false;
      }, 3000);
      return;
    }
  
    const formValue = this.createProductForm.value;
    formValue.productType = parseInt(formValue.productType, 10);
  
    try {
      await this.productsService.createProduct(formValue);
      this.showSuccessToast = true;
      setTimeout(() => {
        this.showSuccessToast = false;
      }, 3000);
      this.createProductForm.reset();
      this.submitted = false;
    } catch (error: any) {
      console.error("Error creating product:", error);
      this.showWarningToast = true;
      setTimeout(() => {
        this.showWarningToast = false;
      }, 3000);
    }
  }
}
