import * as request from "request";

export class RequestWrapper {
  conf: any;
  public constructor(conf: any) {
    this.conf = {
      ...conf
    };

    if (this.conf.httpProxy && "" !== this.conf.httpProxy) {
      console.log("using proxy", this.conf.httpProxy);
    }
  }

  protected getTimestamp(): string {
    return "" + Math.floor((new Date()).getTime());
  }

  protected getNonce = function (): string {
    var hrtime = process.hrtime();
    return "" + (hrtime[0] * 1e9 + hrtime[1]);
  };

  public send(ctx: any): Promise<any> {
    return new Promise((resolve, reject) => {

      let req = <any>{
        uri: this.conf.urlPrefix + ctx.endpoint,
        method: ctx.method,
      };
      if ("POST" == ctx.method) {
        req.json = ctx.payload;
      } else if ("GET" == ctx.method) {
        req.qs = ctx.payload;
      }
      if (this.conf.httpProxy && "" !== this.conf.httpProxy) {
        req.proxy = this.conf.httpProxy;
      }
      request(req, function (error: any, response: request.RequestResponse, body: any) {
        if (error) {
          reject(error);
        } else if (200 == response.statusCode) {
          resolve(typeof body == "string" ? JSON.parse(body) : body);
        } else {
          reject(body);
        }
      });
    });
  };
}

export function requestWrapper(): RequestWrapper {
  return new RequestWrapper({
    urlPrefix: process.env.BACKEND_API_URL || "http://localhost:3000/api/v1/"
  });
}

jasmine.DEFAULT_TIMEOUT_INTERVAL = 5000;

it("base request test //NOOP", () => {
});
