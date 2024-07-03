import { Component, OnInit } from "@angular/core";
import {
  FormGroup,
  FormBuilder,
  Validators,
  ReactiveFormsModule,
} from "@angular/forms";
import { ProductsService } from "./../../../products.service";
import { ActivatedRoute } from "@angular/router";
import { NavbarComponent } from "../footer/navbar/navbar.component";
import { FooterComponent } from "../footer/footer.component";
import { CommonModule } from "@angular/common";

@Component({
  selector: "app-edit-product",
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    NavbarComponent,
    FooterComponent,
  ],
  templateUrl: "./edit-product.component.html",
  styleUrls: ["./edit-product.component.css"],
})
export class EditProductComponent implements OnInit {
  editProductForm: FormGroup;
  productId: string | null = null;
  showSuccessToast = false;
  showWarningToast = false;
  submitted = false;
  productTypes: any[] | null = null;

  constructor(
    private fb: FormBuilder,
    private productsService: ProductsService,
    private route: ActivatedRoute
  ) {
    this.editProductForm = this.fb.group({
      name: ["", Validators.required],
      price: ["", Validators.required],
      productType: ["", Validators.required],
    });
  }

  async ngOnInit(): Promise<void> {
    try {
      this.productTypes = await this.productsService.getProductTypes();
      this.productId = this.route.snapshot.paramMap.get("id");
      if (this.productId) {
        this.loadProductData();
      }
    } catch (err) {
      console.error("Error fetching product types:", err);
    }
  }

  async loadProductData(): Promise<void> {
    if (!this.productId) return;

    try {
      const product = await this.productsService.getProductById(
        parseInt(this.productId)
      );
      console.log("Product data desde backend", product);
      console.log("Form data antes de patchvalue:", this.editProductForm.value);
      this.editProductForm.patchValue({
        name: product.name,
        price: product.price,
        productType: product.productType.id,
      });
      console.log("Form data despues de patchvalue:", this.editProductForm.value);
    } catch (err) {
      console.error("Failed to load product data", err);
      this.showWarningToast = true;
    }
  }

  async updateProduct(): Promise<void> {
    this.submitted = true;
    if (this.editProductForm.valid && this.productId) {
      try {
        // Hacer una copia del valor del formulario
        const formValue = { ...this.editProductForm.value };

        // Convertir productType a entero
        formValue.productType = parseInt(formValue.productType);

        console.log("Updating product", formValue);

        // Usar la copia modificada para la actualización
        await this.productsService.updateProduct(
          parseInt(this.productId),
          formValue
        );
        this.showSuccessToast = true;
      } catch (err) {
        console.error("Failed to update product", err);
        this.showWarningToast = true;
      }
    }
  }
}
