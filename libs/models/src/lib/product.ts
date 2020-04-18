import { IProductBrand } from './product-brand';
import { IProductCategory } from './product-category';

export interface IProduct extends IProductDocument {
  _id: string;
}
export interface IProductDocument {
  name: string;
  description: string;
  unit: string;
  price: number;
  brand: IProductBrand;
  categories: IProductCategory[];
}
