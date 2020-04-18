import { IProductCategory } from '@shared/models/product-category';
import { IProductBrand } from '@shared/models/product-brand';

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
