import { BasicStrategy as Strategy } from 'passport-http';
declare const BasicStrategy_base: new (...args: any[]) => Strategy;
export declare class BasicStrategy extends BasicStrategy_base {
    constructor();
    validate(username: string, password: string): any;
}
export {};
