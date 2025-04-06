declare const BasicAuthGuard_base: import("@nestjs/passport").Type<import("@nestjs/passport").IAuthGuard>;
export declare class BasicAuthGuard extends BasicAuthGuard_base {
    handleRequest(err: any, user: any): any;
}
export {};
