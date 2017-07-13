import { NextFunction, Request, Response, Router } from "express";


export class ControllerRoute {

  /**
   * Constructor
   *
   * @class ControllerRoute
   * @constructor
   */
  constructor() {
  }

  public hello(req: Request, res: Response, next: NextFunction) {
    console.log('Got', req.query);
    res.render("hello", {
      msg: "Hello From Controller",
      ts: new Date()
    })
  }

  /**
   * buildRoutes
   */
  public buildRoutes(router: Router) {
    console.log("[ControllerRoute::create] Creating controller route.");

    router.use((req: Request, res: Response, next: NextFunction) => {
      //TODO: Your API Request Authentication Logic
      next();
    })

    router.get("/hello", this.hello.bind(this));
  }


}