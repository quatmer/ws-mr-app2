import { Schema, Document, model } from 'mongoose';
import mongooseUniqueValidator from 'mongoose-unique-validator';
import { ProductCategoryService } from './../services/product-category.service';
import { IProductDocument } from '@ws-mr-app2/models';

const InfoSchema = new Schema({
  name: { type: String }
});

const ProductSchema = new Schema(
  {
    name: { type: String, unique: true, required: true },
    description: { type: String },
    unit: { type: String, required: true },
    price: { type: Number, required: true },
    brand: { type: InfoSchema, required: true },
    categories: [{ type: InfoSchema, required: true }]
  },
  { timestamps: true, versionKey: false, bufferCommands: false }
);

mongooseUniqueValidator(ProductSchema);
export interface ProductDocument extends IProductDocument, Document {}

ProductSchema.pre<ProductDocument>('save', async function(next) {
  if (this.isModified('categories')) {
    const newCatIds = this.categories.map(x => x._id);
    if (this.isNew) {
      ProductCategoryService.increaseProductCount(newCatIds)
        .then(() => next())
        .catch(message => next(new Error(message)));
    } else {
      //get current product's categories
      const product = await ProductEntity.findById(this._id);
      if (product) {
        const oldCatIds = product.categories.map(x => x._id);
        //decrease product count
        ProductCategoryService.decreaseProductCount(oldCatIds)
          .then(() =>
            //increase product count
            ProductCategoryService.increaseProductCount(newCatIds)
              .then(() => next())
              .catch(message => next(new Error(message)))
          )
          .catch(message => next(new Error(message)));
      }
    }
  }

  next();
});

ProductSchema.pre<ProductDocument>('remove', async function(next) {
  const categoryIds = this.categories.map(x => x._id);
  if (this.isNew) {
    ProductCategoryService.decreaseProductCount(categoryIds)
      .then(() => next())
      .catch(message => next(new Error(message)));
  }
});

export const ProductEntity = model<ProductDocument>('Product', ProductSchema);
