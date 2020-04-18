import { ProductCategoryEntity } from '../entities/product-category.entity';

export const ProductCategoryService = {
  increaseProductCount: async (categoryIds: string[]) => {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await ProductCategoryEntity.updateMany(
          { _id: { $in: categoryIds } },
          { $inc: { productCount: 1 } },
        );
        if (response.n > 0) resolve();
        else reject('Categories product count can not increase.');
      } catch (error) {
        reject(error.message);
      }
    });
  },
  decreaseProductCount: async (categoryIds: string[]) => {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await ProductCategoryEntity.updateMany(
          { _id: { $in: categoryIds } },
          { $inc: { productCount: -1 } },
        );
        if (response.n > 0) resolve();
        else reject('Categories product count can not increase.');
      } catch (error) {
        reject(error.message);
      }
    });
  },
};
