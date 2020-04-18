import { HttpError } from '../util/HttpError';
import { Request, Response, NextFunction } from 'express';
import { ProductBrandEntity, ProductBrandDocument } from '../entities/product-brand.entity';

// TO DO For testing client application
function sleep(ms: number) {
  return new Promise(resolve => {
    setTimeout(resolve, ms);
  });
}

const createBrand = async (req: Request, res: Response, next: NextFunction) => {
  const { name } = req.body;

  if (!name) {
    next(new HttpError('Missing parameter.', 400));
    return;
  }

  // TO DO For testing client application
  await sleep(200);
  if (name.length < 2) {
    next(new HttpError('The brand name cannot be shorter than 2 characters ', 400));
    return;
  }

  const brand = new ProductBrandEntity({ name });

  const validationError = await brand.validateSync();
  if (validationError) {
    next(new HttpError(validationError.message, 400));
    return;
  }

  try {
    await brand.save();
  } catch (err) {
    next(new HttpError(err.message, 404));
    return;
  }

  res.status(201).send({ message: 'Brand created.', brand: brand.toJSON() });
};

const updateBrand = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  const { name } = req.body;

  if (!id || !name) {
    next(new HttpError('Missing parameter.', 400));
    return;
  }

  // TO DO For testing client application
  if (name.length < 2) {
    next(new HttpError('The brand name cannot be shorter than 2 characters ', 400));
    return;
  }
  await sleep(200);

  const brand = await ProductBrandEntity.findById(id);

  if (!brand) {
    next(new HttpError('Brand not exist.', 400));
    return;
  }

  brand.name = name;

  const validationError = await brand.validateSync();
  if (validationError) {
    next(new HttpError(validationError.message, 400));
    return;
  }

  try {
    await brand.save();
  } catch (err) {
    next(new HttpError(err.message, 404));
    return;
  }

  res.status(200).send({ message: 'Brand updated.', brand: brand });
};

const getBrands = async (_: Request, res: Response, next: NextFunction) => {
  let brands: ProductBrandDocument[];

  // TO DO For testing client application
  await sleep(200);

  try {
    brands = await ProductBrandEntity.find();
  } catch (err) {
    next(new HttpError(err.message, 400));
    return;
  }

  res.status(200).send({ message: 'Brands loaded. ', brands });
};

const deleteBrand = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;

  if (!id) {
    next(new HttpError('Missing parameter.', 400));
    return;
  }

  const brand = await ProductBrandEntity.findById(id);

  if (!brand) {
    next(new HttpError('Brand not found.', 404));
    return;
  }

  // TO DO For testing client application
  await sleep(200);
  if (brand.name === 'Apple') {
    next(new HttpError('You cannot delete this record', 404));
    return;
  }

  try {
    await brand.remove();
  } catch (err) {
    next(new HttpError(err.message, 400));
    return;
  }

  res.status(200).send({ message: 'Brand deleted.' });
};

export const BrandController = {
  createBrand,
  updateBrand,
  deleteBrand,
  getBrands,
};
