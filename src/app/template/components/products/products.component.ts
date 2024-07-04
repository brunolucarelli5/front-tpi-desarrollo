import { Component, OnInit, ViewChild } from "@angular/core";
import { NavbarComponent } from "../footer/navbar/navbar.component";
import { ProductsService } from "../../../products.service";
import { CommonModule } from "@angular/common";
import { ProductI } from "../../../interfaces/product";
import { Router } from "@angular/router";
import { FooterComponent } from "../footer/footer.component";
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatButtonModule } from '@angular/material/button';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { FormsModule } from '@angular/forms';

type ColumnKey = 'name' | 'price' | 'category' | 'actions';

@Component({
  standalone: true,
  imports: [
    NavbarComponent, 
    CommonModule,
    FooterComponent, 
    MatTableModule, 
    MatPaginatorModule, 
    MatSortModule, 
    MatButtonModule, 
    MatSlideToggleModule, 
    FormsModule],
  selector: "app-products",
  templateUrl: "./products.component.html",
  styleUrls: ["./products.component.css"],
})

export class ProductsComponent implements OnInit {
  columnsVisibility: Record<ColumnKey, boolean> = {
    name: true,
    price: true,
    category: true,
    actions: true
  };
  displayedColumns: ColumnKey[] = [];
  dataSource!: MatTableDataSource<ProductI>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private productsService: ProductsService,
    private router: Router
  ) {}

  async ngOnInit() {
    try {
      const products = await this.productsService.getProducts();
      this.dataSource = new MatTableDataSource(products);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;

      // Configure custom sorting data accessor for 'name' and 'price'
      this.dataSource.sortingDataAccessor = (product: ProductI, sortHeaderId: (string | number)) => {
          switch (sortHeaderId) {
            case 'name':
              return product.name;
            case 'price':
              // Convert price to a number to ensure numeric sorting
              return +product.price;
            case 'category':
              return product.productType.name;
            default:
              return '';
          }
        };

      this.updateDisplayedColumns();
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  async deleteProduct(productId: number): Promise<void> {
    try {
      await this.productsService.deleteProduct(productId);
      // Update product list after deletion
      this.dataSource.data = this.dataSource.data.filter(
        (product) => product.id !== productId
      );
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  }

  editProduct(productId: number): void {
    this.router.navigate(["editar-producto", productId]);
  }

  updateDisplayedColumns() {
    this.displayedColumns = (Object.keys(this.columnsVisibility) as ColumnKey[]).filter(key => this.columnsVisibility[key]);
  }

  columnVisibility() {
    this.updateDisplayedColumns();
  }
}
