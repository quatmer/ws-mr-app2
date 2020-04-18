import { Schema, Document, model } from 'mongoose';
import { IProductCategoryDocument } from '@ws-mr-app2/models';

export const ProductCategorySchema = new Schema(
  {
    name: { type: String, required: true },
    productCount: { type: Number, default: 0 },
    parentId: { type: String, default: null }
  },
  {
    timestamps: true,
    versionKey: false,
    bufferCommands: false,
    collection: 'product-categories'
  }
);

export interface ProductCategoryDocument
  extends IProductCategoryDocument,
    Document {}

export const ProductCategoryEntity = model<ProductCategoryDocument>(
  'ProductCategory',
  ProductCategorySchema
);
