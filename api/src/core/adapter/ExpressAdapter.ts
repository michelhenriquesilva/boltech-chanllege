import { Request, Response } from 'express'

export default class ExpressAdapter {
  static create(fn: any) {
    return async (req: Request, res: Response) => {
      const { statusCode, response } = await fn(req, req.body)
      res.status(statusCode).json(response)
    }
  }
}