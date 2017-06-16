import { SomeInterfaceImpl } from "../src/index";

describe('check sayHello', () => {

    it('should say hello', () => {
        let impl = new SomeInterfaceImpl();
        expect(impl.sayHi('Peru')).toEqual('Hello, Peru');
    });

});