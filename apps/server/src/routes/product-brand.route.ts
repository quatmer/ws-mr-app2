import { checkAuthentication } from '../middlewares/auth.middleware';
import { Router } from 'express';
import { BrandController } from '../controllers/product-brand.controller';

const productBrandRouter = Router();

productBrandRouter.post('/', [checkAuthentication], BrandController.createBrand);
productBrandRouter.post('/:id', [checkAuthentication], BrandController.updateBrand);
productBrandRouter.get('/', [checkAuthentication], BrandController.getBrands);
productBrandRouter.delete('/:id', [checkAuthentication], BrandController.deleteBrand);

export default productBrandRouter;
