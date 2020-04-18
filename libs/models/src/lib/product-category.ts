export interface IProductCategory extends IProductCategoryDocument {
  _id: string;
}
export interface IProductCategoryDocument {
  name: string;
  productCount: number;
  parentId: string | null;
}
