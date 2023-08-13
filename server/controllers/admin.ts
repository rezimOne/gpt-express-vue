import { RequestHandler } from 'express';

export const getMode: RequestHandler = (req, res, next) => {
  console.log('req:', req)
  res.send('<p>Server admin pannel</p>')
}