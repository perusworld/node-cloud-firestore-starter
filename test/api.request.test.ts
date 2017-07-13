import { requestWrapper } from "./base.request.test";

describe("check hello api", () => {

  it("should say hello", (done) => {
    let req = requestWrapper();
    req.send({
      endpoint: "hello",
      method: "POST",
      payload: {
        blah: "blah"
      }
    }).then(resp => {
      console.log(JSON.stringify(resp, null, 2));
      done();
    }).catch(err => {
      console.log(err);
      expect(err).toBeNull();
    });
  });

});