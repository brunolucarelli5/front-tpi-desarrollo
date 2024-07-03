import { ProductTypeI } from "./productType";

export interface ProductI {
    id: number,
    name: string,
    price: number,
    productType: ProductTypeI,
}