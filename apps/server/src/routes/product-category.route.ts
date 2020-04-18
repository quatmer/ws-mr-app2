import { checkAuthentication } from '../middlewares/auth.middleware';
import { Router } from 'express';
import { ProductCategoryController } from '../controllers/product-category.controller';

const productCategoryRouter = Router();

productCategoryRouter.post('/', [checkAuthentication], ProductCategoryController.createCategory);
productCategoryRouter.post('/:id', [checkAuthentication], ProductCategoryController.updateCategory);
productCategoryRouter.get('/', [checkAuthentication], ProductCategoryController.getCategories);
productCategoryRouter.delete('/:id', [checkAuthentication], ProductCategoryController.deleteCategory);

export default productCategoryRouter;
