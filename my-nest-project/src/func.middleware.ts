import { Request, Response, NextFunction } from 'express';

export function funcMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  console.log('函数中间件');
  next();
}
