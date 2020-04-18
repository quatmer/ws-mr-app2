import { IProductBrandDocument } from '@ws-mr-app2/models';
import { Schema, Document, model } from 'mongoose';

export const ProductBrandSchema = new Schema(
  {
    name: { type: String, required: true }
  },
  {
    timestamps: true,
    versionKey: false,
    bufferCommands: false,
    collection: 'product-brands'
  }
);

export interface ProductBrandDocument extends IProductBrandDocument, Document {}

export const ProductBrandEntity = model<ProductBrandDocument>(
  'Brand',
  ProductBrandSchema
);
