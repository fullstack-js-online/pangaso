import * as Express from 'express';
declare class AuthController {
    /**
     *
     * @param {Express.Request} req
     *
     * @param {Express.Response} res
     *
     * @return {Express.Response}
     *
     */
    login(req: Express.Request, res: Express.Response): Promise<Express.Response>;
}
export declare const Auth: AuthController;
export {};
