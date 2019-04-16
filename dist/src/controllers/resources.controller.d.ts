import * as Express from 'express';
declare class ResourceController {
    /**
     *
     * @param {Express.Request} req
     *
     * @param {Express.Response} res
     *
     * @return {Express.Response}
     *
     */
    index(req: Express.Request, res: Express.Response): Promise<import("express-serve-static-core").Response>;
}
export declare const Resource: ResourceController;
export {};
