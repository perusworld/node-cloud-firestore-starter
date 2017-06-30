import { NextFunction, Request, Response, Router } from "express";


export class APIRoute {

  /**
   * Constructor
   *
   * @class APIRoute
   * @constructor
   */
  constructor() {
  }

  public hello(req: Request, res: Response, next: NextFunction) {
    console.log('Got', JSON.stringify(req.body, null, 2));
    res.json({
      msg: 'hi there v1',
      youSent: req.body
    })
  }

  /**
   * buildRoutes
   */
  public buildRoutes(router: Router) {
    console.log("[APIRoute::create] Creating api route.");

    router.use((req: Request, res: Response, next: NextFunction) => {
      //TODO: Your API Request Authentication Logic
      next();
    })

    router.post("/hello", this.hello.bind(this));
  }


}