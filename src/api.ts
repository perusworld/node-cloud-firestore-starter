import { NextFunction, Request, Response, Router } from "express";


export class APIRoute {

  public static create(router: Router) {
    //log
    console.log("[APIRoute::create] Creating api route.");

    //add home page route
    router.get("/hello", (req: Request, res: Response, next: NextFunction) => {
      new APIRoute().hello(req, res, next);
    });
  }

  /**
   * Constructor
   *
   * @class APIRoute
   * @constructor
   */
  constructor() {
  }

  public hello(req: Request, res: Response, next: NextFunction) {
      res.json({msg:'hi there'})
  }
}