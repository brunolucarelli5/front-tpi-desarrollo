import { Injectable } from "@angular/core";
import axios from "axios";
import { HttpErrorResponse } from "@angular/common/http";
import { ProductI } from "./interfaces/product";
import { ProductTypeI } from "./interfaces/productType";
import { AuthService } from "./auth.service";

@Injectable({
  providedIn: "root",
})
export class ProductsService {
  private url: string = "http://localhost:2999";

  constructor(private authService: AuthService) {}

  async getProducts(): Promise<ProductI[]> {
    try {
      this.authService.refreshToken();
      console.log("Fetching products...");

      // Retrieve the token from localStorage
      const tokenString = localStorage.getItem("token");

      // Check if tokenString is null or undefined
      if (!tokenString) {
        throw new Error("No token found in localStorage");
      }

      // Parse the token object from the tokenString
      const tokenObject = JSON.parse(tokenString);

      if (!tokenObject || !tokenObject.accessToken) {
        throw new Error("No valid access token found in localStorage");
      }

      // Make sure to use tokenObject.accessToken
      const response = await axios.get(`${this.url}/products`, {
        headers: {
          Authorization: `Bearer ${tokenObject.accessToken}`,
        },
      });

      // Directly return the data from Axios response
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("Axios error:", error.response?.data || error.message);
        throw new HttpErrorResponse({
          error: error.response?.data || error.message,
          status: error.response?.status || 500, // Adjust status as needed
        });
      } else {
        console.error("Unknown error:", error);
        throw new HttpErrorResponse({
          error: "Unknown error occurred",
          status: 500, // Adjust status as needed
        });
      }
    }
  }

  async createProduct(product: ProductI): Promise<ProductI> {
    try {
      console.log("Creating product...");

      // Retrieve the token from localStorage
      const tokenString = localStorage.getItem("token");

      // Check if tokenString is null or undefined
      if (!tokenString) {
        throw new Error("No token found in localStorage");
      }

      // Parse the token object from the tokenString
      const tokenObject = JSON.parse(tokenString);

      if (!tokenObject || !tokenObject.accessToken) {
        throw new Error("No valid access token found in localStorage");
      }

      // Make sure to use tokenObject.accessToken
      const response = await axios.post(`${this.url}/products`, product, {
        headers: {
          Authorization: `Bearer ${tokenObject.accessToken}`,
        },
      });
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("Axios error:", error.response?.data || error.message);
        throw new HttpErrorResponse({
          error: error.response?.data || error.message,
          status: error.response?.status || 500, // Adjust status as needed
        });
      } else {
        console.error("Unknown error:", error);
        throw new HttpErrorResponse({
          error: "Unknown error occurred",
          status: 500, // Adjust status as needed
        });
      }
    }
  }

  async getProductTypes(): Promise<any> {
    try {
      console.log("Fetching product types...");

      // Retrieve the token from localStorage
      const tokenString = localStorage.getItem("token");

      // Check if tokenString is null or undefined
      if (!tokenString) {
        throw new Error("No token found in localStorage");
      }

      // Parse the token object from the tokenString
      const tokenObject = JSON.parse(tokenString);

      if (!tokenObject || !tokenObject.accessToken) {
        throw new Error("No valid access token found in localStorage");
      }

      // Make sure to use tokenObject.accessToken
      const response = await axios.get(`${this.url}/products-type`, {
        headers: {
          Authorization: `Bearer ${tokenObject.accessToken}`,
        },
      });
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("Axios error:", error.response?.data || error.message);
        throw new HttpErrorResponse({
          error: error.response?.data || error.message,
          status: error.response?.status || 500, // Adjust status as needed
        });
      } else {
        console.error("Unknown error:", error);
        throw new HttpErrorResponse({
          error: "Unknown error occurred",
          status: 500, // Adjust status as needed
        });
      }
    }
  }

  async deleteProduct(id: number): Promise<void> {
    try {
      console.log("Deleting product...");

      // Retrieve the token from localStorage
      const tokenString = localStorage.getItem("token");

      // Check if tokenString is null or undefined
      if (!tokenString) {
        throw new Error("No token found in localStorage");
      }

      // Parse the token object from the tokenString
      const tokenObject = JSON.parse(tokenString);

      if (!tokenObject || !tokenObject.accessToken) {
        throw new Error("No valid access token found in localStorage");
      }

      // Make sure to use tokenObject.accessToken
      await axios.delete(`${this.url}/${id}`, {
        headers: {
          Authorization: `Bearer ${tokenObject.accessToken}`,
        },
      });
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("Axios error:", error.response?.data || error.message);
        throw new HttpErrorResponse({
          error: error.response?.data || error.message,
          status: error.response?.status || 500, // Adjust status as needed
        });
      } else {
        console.error("Unknown error:", error);
        throw new HttpErrorResponse({
          error: "Unknown error occurred",
          status: 500, // Adjust status as needed
        });
      }
    }
  }

  async getProductById(id: number): Promise<ProductI> {
    try {
      console.log(`Fetching product with ID: ${id}...`);

      // Retrieve the token from localStorage
      const tokenString = localStorage.getItem("token");

      // Check if tokenString is null or undefined
      if (!tokenString) {
        throw new Error("No token found in localStorage");
      }

      // Parse the token object from the tokenString
      const tokenObject = JSON.parse(tokenString);

      if (!tokenObject || !tokenObject.accessToken) {
        throw new Error("No valid access token found in localStorage");
      }

      // Make sure to use tokenObject.accessToken
      const response = await axios.get(`${this.url}/products/${id}`, {
        headers: {
          Authorization: `Bearer ${tokenObject.accessToken}`,
        },
      });
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("Axios error:", error.response?.data || error.message);
        throw new HttpErrorResponse({
          error: error.response?.data || error.message,
          status: error.response?.status || 500, // Adjust status as needed
        });
      } else {
        console.error("Unknown error:", error);
        throw new HttpErrorResponse({
          error: "Unknown error occurred",
          status: 500, // Adjust status as needed
        });
      }
    }
  }

  async findProductTypeOfProduct(id: number): Promise<ProductTypeI> {
    try {
      console.log(`Fetching product type of product with ID: ${id}...`);

      // Retrieve the token from localStorage
      const tokenString = localStorage.getItem("token");

      // Check if tokenString is null or undefined
      if (!tokenString) {
        throw new Error("No token found in localStorage");
      }

      // Parse the token object from the tokenString
      const tokenObject = JSON.parse(tokenString);

      if (!tokenObject || !tokenObject.accessToken) {
        throw new Error("No valid access token found in localStorage");
      }

      // Make sure to use tokenObject.accessToken
      const response = await axios.get(`${this.url}/products/`, {
        headers: {
          Authorization: `Bearer ${tokenObject.accessToken}`,
        },
      });

      // Assuming response.data is an array of products
      const datos = response.data;

      // Find the product by ID
      const product = datos.find((product: ProductI) => product.id === id);

      // Check if product is found and has a productType
      if (!product || !product.productType) {
        throw new Error("Product not found or it doesn't have a product type");
      }

      // Return the productType
      return product.productType;
    } catch (error) {
      console.error("Error fetching product type:", error);
      throw error; // Rethrow the error to be handled by the caller
    }
}

  async updateProduct(id:number, product: ProductI): Promise<ProductI> {
    try {
      console.log(`Updating product with ID: ${id}...`);

      // Retrieve the token from localStorage
      const tokenString = localStorage.getItem("token");

      // Check if tokenString is null or undefined
      if (!tokenString) {
        throw new Error("No token found in localStorage");
      }

      // Parse the token object from the tokenString
      const tokenObject = JSON.parse(tokenString);

      if (!tokenObject || !tokenObject.accessToken) {
        throw new Error("No valid access token found in localStorage");
      }

      // Make sure to use tokenObject.accessToken
      const response = await axios.put(
        `${this.url}/products/${id}`,
        product,
        {
          headers: {
            Authorization: `Bearer ${tokenObject.accessToken}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("Axios error:", error.response?.data || error.message);
        throw new HttpErrorResponse({
          error: error.response?.data || error.message,
          status: error.response?.status || 500, // Adjust status as needed
        });
      } else {
        console.error("Unknown error:", error);
        throw new HttpErrorResponse({
          error: "Unknown error occurred",
          status: 500, // Adjust status as needed
        });
      }
    }
  }
}
