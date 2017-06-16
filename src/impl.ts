import { SomeInterfaceDef } from './base';

export class SomeInterfaceImpl implements SomeInterfaceDef {
    public sayHi(str: string): string {
        return `Hello, ${str}`;
    }
}