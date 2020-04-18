import { ProductController } from './../controllers/product.controller';
import { checkAuthentication } from './../middlewares/auth.middleware';
import { Router } from 'express';

const productRouter = Router();

productRouter.post('/', [checkAuthentication], ProductController.insertProduct);
productRouter.post('/:id', [checkAuthentication], ProductController.updateProduct);
productRouter.delete('/:id', [checkAuthentication], ProductController.deleteProduct);
productRouter.get('/', [checkAuthentication], ProductController.getProductList);

export default productRouter;
