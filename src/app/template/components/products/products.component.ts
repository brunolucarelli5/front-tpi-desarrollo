import { Component, OnInit } from "@angular/core";
import { NavbarComponent } from "../footer/navbar/navbar.component";
import { ProductsService } from "../../../products.service";
import { CommonModule } from "@angular/common";
import { ProductI } from "../../../interfaces/product";
import { Router } from "@angular/router";
import { FooterComponent } from "../footer/footer.component";

@Component({
  selector: "app-products",
  standalone: true,
  imports: [NavbarComponent, CommonModule, FooterComponent],
  templateUrl: "./products.component.html",
  styleUrls: ["./products.component.css"],
})
export class ProductsComponent implements OnInit {
  products: ProductI[] | null = null;
  sortedProducts: ProductI[] = [];
  currentSortColumn: string | null = null;
  sortDirection: "asc" | "desc" = "asc";

  constructor(
    private productsService: ProductsService,
    private router: Router
  ) {}

  async ngOnInit() {
    try {
      this.products = await this.productsService.getProducts();
      this.sortedProducts = [...this.products]; // Inicializa sortedProducts con una copia de products
      console.log(this.products);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  }

  onSort(columnName: string): void {
    if (this.currentSortColumn === columnName) {
      this.sortDirection = this.sortDirection === "asc" ? "desc" : "asc";
    } else {
      this.currentSortColumn = columnName;
      this.sortDirection = "asc";
    }
    this.sortProducts();
  }

  sortProducts(): void {
    if (!this.products || this.currentSortColumn === null) return;

    this.sortedProducts = [...this.products].sort((a, b) => {
      const keyA = a[this.currentSortColumn as keyof ProductI];
      const keyB = b[this.currentSortColumn as keyof ProductI];

      if (keyA < keyB) {
        return this.sortDirection === "asc" ? -1 : 1;
      }
      if (keyA > keyB) {
        return this.sortDirection === "asc" ? 1 : -1;
      }
      return 0;
    });
  }

  async deleteProduct(productId: number): Promise<void> {
    try {
      await this.productsService.deleteProduct(productId);
      // Actualizar la lista de productos después de eliminar
      this.sortedProducts = this.sortedProducts.filter(
        (product) => product.id !== productId
      );
    } catch (error) {
      // Manejo de errores
      console.error("Error al eliminar producto:", error);
      // Aquí puedes implementar la lógica para mostrar un mensaje de error al usuario
    }
  }

  editProduct(productId: number): void {
    this.router.navigate(["editar-producto", productId]);
  }
}
