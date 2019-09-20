import { requestWrapper } from "./base.request.test";
import { v4 as uuid } from "uuid";

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

describe("check product api", () => {
  let categoryA = 'category-blah';
  let categoryB = 'category-blah-b';

  it("should save product", (done) => {
    let req = requestWrapper();
    req.send({
      endpoint: `/product/${categoryA}`,
      method: "POST",
      payload: {
        serialNumber: uuid(),
        modelNumber: "Model Number",
        name: "Product",
        price: 1000
      }
    }).then(resp => {
      console.log(JSON.stringify(resp, null, 2));
      done();
    }).catch(err => {
      console.log(err);
      expect(err).toBeNull();
    });
  });

  it("should add product to category", (done) => {
    let req = requestWrapper();
    let serialNumber = uuid();
    req.send({
      endpoint: `/product/${categoryA}`,
      method: "POST",
      payload: {
        serialNumber: serialNumber,
        modelNumber: "Model Number",
        name: "Product",
        price: 1000
      }
    }).then(resp => req.send({
      endpoint: `/category/${categoryB}/${serialNumber}`,
      method: "PUT"
    })).then(resp => {
      console.log(JSON.stringify(resp, null, 2));
      done();
    }).catch(err => {
      console.log(err);
      expect(err).toBeNull();
    });
  });

  it("should get product categories", (done) => {
    let req = requestWrapper();
    let serialNumberA = uuid();
    let serialNumberB = uuid();
    req.send({
      endpoint: `/product/${categoryA}`,
      method: "POST",
      payload: {
        serialNumber: serialNumberA,
        modelNumber: "Model Number",
        name: "Product",
        price: 1000
      }
    }).then(resp => req.send({
      endpoint: `/product/${categoryA}`,
      method: "POST",
      payload: {
        serialNumber: serialNumberB,
        modelNumber: "Model Number",
        name: "Product",
        price: 1000
      }
    })).then(resp => req.send({
      endpoint: `/category/${categoryB}/${serialNumberB}`,
      method: "PUT"
    })).then(resp => req.send({
      endpoint: `/product/${serialNumberB}/categories`,
      method: "GET"
    })).then(resp => {
      console.log(JSON.stringify(resp, null, 2));
      expect(resp.length).toBe(2);
      expect(resp).not.toBeNull();
      expect(resp).toContain(categoryB);
      expect(resp).toContain(categoryA);
      done();
    }).catch(err => {
      console.log(err);
      expect(err).toBeNull();
    });
  });

});