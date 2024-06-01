import { NextFunction, Request, Response } from 'express';

import * as validUrl from 'valid-url';
import { HttpException } from '../exceptions/HttpException';

const localEnvironments = ['dev', 'test', 'docker'];
export function notFoundMiddleware(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) {
  res.status(404).json({
    message: 'Route not found',
  });

  next();
}
export function internalErrorMiddleware(
  err: HttpException,
  req: Request,
  res: Response,
  next: NextFunction,
) {
  res.status(500).json({
    message: 'Internal error',
    error: err.message,
  });

  next();
}
export function badRequestMiddleware(
  err: HttpException,
  req: Request,
  res: Response,
  next: NextFunction,
) {
  if (err.status === 400 && 'body' in err) {
    return res.status(400).json({
      message: 'Bad Request',
      error: (err as SyntaxError).message,
    });
  }
  next();
}
export function isValidUrlMiddleware(
  err: HttpException,
  req: Request,
  res: Response,
  next: NextFunction,
) {
  if (!validUrl.isUri(req.url)) {
    return res.status(400).json({
      message: 'Bad Request',
      error: (err as SyntaxError).message,
    });
  }
  next();
}

export function optionMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  res.header('Access-Control-Allow-Origin', req.headers.origin);
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header(
    'Access-Control-Allow-Headers',
    'Content-Type, Authorization, Content-Length, X-Requested-With',
  );
  if ('OPTIONS' === req.method) {
    res.sendStatus(200);
  } else {
    next();
  }
}

export function getToken(req: Request): string | null {
  const { authorization } = req.headers;
  if (!authorization) {
    return null;
  }
  const split = authorization.split('Bearer ');
  const token = split[1];
  if (
    !authorization.startsWith('Bearer') ||
    split.length !== 2 ||
    token === null ||
    token === undefined
  ) {
    return null;
  }
  return token;
}
