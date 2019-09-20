import { NextFunction, Request, Response, Router } from "express";

import { DataService } from "./service";


export class APIRoute {

  private service: DataService = new DataService();

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

  public sendDone(res: Response, done: boolean, err: any = null): boolean {
    if (!done && null != err) {
      console.error(err);
    }
    res.json({ done: done });
    return true;
  }

  public sendData(res: Response, data: any, err: any = null): boolean {
    if (!data && null != err) {
      console.error(err);
    }
    res.json(data);
    return true;
  }

  public saveProduct(req: Request, res: Response, next: NextFunction) {
    console.log('saveProduct', JSON.stringify(req.body, null, 2));
    this.service.saveProduct(req.params['category'], req.body)
      .then(done => this.sendDone(res, true))
      .catch((err: any) => this.sendDone(res, false, err));
  }

  public addProductToCategory(req: Request, res: Response, next: NextFunction) {
    console.log('addProductToCategory', JSON.stringify(req.body, null, 2));
    this.service.addProductToCategory(req.params['category'], req.params['serialNumber'])
      .then(done => this.sendDone(res, true))
      .catch((err: any) => this.sendDone(res, false, err));
  }

  public getProductCategories(req: Request, res: Response, next: NextFunction) {
    console.log('getProductCategories', JSON.stringify(req.body, null, 2));
    this.service.getCategoriesOfProduct(req.params['serialNumber'])
      .then(data => this.sendData(res, data))
      .catch((err: any) => this.sendDone(res, false, err));
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
    router.post("/product/:category", this.saveProduct.bind(this));
    router.put("/category/:category/:serialNumber", this.addProductToCategory.bind(this));
    router.get("/product/:serialNumber/categories", this.getProductCategories.bind(this));
  }


}