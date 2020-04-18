import { HttpError } from './../util/HttpError';
import { ProductCategoryEntity } from './../entities/product-category.entity';
import { Request, Response, NextFunction } from 'express';

const createCategory = async (req: Request, res: Response, next: NextFunction) => {
  const { parentId, name } = req.body;
  console.log(req.body);

  if (!name) {
    next(new HttpError('Missing parameter.', 400));
    return;
  }

  // create new model
  const category = new ProductCategoryEntity({ parentId, name });

  // Checking document validation
  const validationError = await category.validateSync();
  if (validationError) {
    next(new HttpError(validationError.message, 400));
    return;
  }

  //save model
  try {
    await category.save();
  } catch (err) {
    next(new HttpError(err.message, 404));
    return;
  }

  res.status(201).send({ message: 'Category created.', category: category.toJSON() });
};

const updateCategory = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  const { name } = req.body;

  if (!id || !name) {
    next(new HttpError('Missing parameter.', 400));
    return;
  }

  // Checking is product category exist
  const category = await ProductCategoryEntity.findById(id);

  if (!category) {
    next(new HttpError('Category not exist.', 400));
    return;
  }

  //update model
  category.name = name;

  // Checking document validation
  const validationError = await category.validateSync();
  if (validationError) {
    next(new HttpError(validationError.message, 400));
    return;
  }

  try {
    //save model
    await category.save();
  } catch (err) {
    next(new HttpError(err.message, 404));
    return;
  }
  res.status(200).send({ message: 'Category updated.', category });
};

const getCategories = async (_: Request, res: Response, next: NextFunction) => {
  try {
    const categories = await ProductCategoryEntity.find();
    res.status(200).send({ message: 'Categories loaded. ', categories });
  } catch (err) {
    next(new HttpError(err.message, 400));
    return;
  }
};

const deleteCategory = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;

  //check missing parameter
  if (!id) {
    next(new HttpError('Missing parameter.', 400));
    return;
  }

  const category = await ProductCategoryEntity.findById(id);

  //check category exist
  if (!category) {
    next(new HttpError('Category not found.', 404));
    return;
  }

  try {
    await category.remove();
  } catch (err) {
    next(new HttpError(err.message, 400));
    return;
  }

  res.status(200).send({ message: 'Category deleted.' });
};

export const ProductCategoryController = {
  createCategory,
  updateCategory,
  deleteCategory,
  getCategories,
};
