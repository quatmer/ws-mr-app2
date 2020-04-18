import { HttpError } from './../util/HttpError';
import { UserEntity } from './../entities/user.entity';
import { JWT, TokenParams } from './../util/JwtHelper';
import { Request, Response, NextFunction } from 'express';
import * as admin from 'firebase-admin';

export const checkAuthentication = async (req: Request, res: Response, next: NextFunction) => {
  let tokenParams: TokenParams;

  // Get the token from the head
  const token = <string>req.headers['auth'];

  if (!token || token == undefined) {
    console.log('Token is not valid, Token is empty or not provided');
    next(new HttpError('Token is undefined'));
    return;
  }

  // Try to validate token and get data
  try {
    tokenParams = JWT.verifyToken(token);
    res.locals.tokenParams = tokenParams;

    // Getting user entity
    const user = await UserEntity.findById(tokenParams.userId);
    if (user) {
      req.body.currentUser = user;
    } else {
      next(new HttpError('user not found'));
      return;
    }
  } catch (error) {
    console.log('Token is not valid,', error);
    next(new HttpError('Token is not valid'));
    return;
  }

  // Send new token on every request
  const newToken = JWT.createToken(tokenParams);
  res.setHeader('auth', newToken);

  // Create firebase custom token
  try {
    const firebaseCustomToken = await admin.auth().createCustomToken(tokenParams.userId);
    res.setHeader('fire-auth', firebaseCustomToken);
  } catch (error) {
    console.log('Firebase token cannot created', error);
    next(new HttpError('Firebase token cannot created'));
    return;
  }

  next();
};
