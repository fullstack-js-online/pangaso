import * as Express from 'express';
export declare class Pangaso {
    /**
     * The path for all resources
     *
     * @type {String}
     *
     */
    private resourcesPath;
    /**
     *
     * The database connection
     *
     * @type {Any}
     *
     */
    private connection;
    /**
     * Define the pangaso router
     *
     * @type {Router}
     *
     */
    private router;
    /**
     *
     * Pangaso resources
     *
     * @type {Array}
     *
     */
    private resources;
    /**
     * Determine if pangaso has already been initialized
     *
     * @type {Boolean}
     *
     */
    private initialized;
    /**
     *
     * Define the database connection
     *
     * @type {Database}
     *
     */
    private database;
    /**
     *
     * Load all resources from the resources path
     *
     * @return {void}
     *
     */
    loadResources(): void;
    /**
     * Get the user resource
     *
     * @return {IResource}
     *
     */
    private getUserResource;
    /**
     *
     * Make the pangaso middleware
     *
     * @return {Function}
     *
     */
    make(): (req: Express.Request, res: Express.Response, next: Express.NextFunction) => void;
    /**
     *
     * Return the pangaso router
     *
     * @return {Express.Router}
     *
     */
    routes(): Express.Router;
    /**
     * Register the static assets for pangaso
     *
     * @return {void}
     *
     */
    assets(): import("express-serve-static-core").Handler;
}
export declare const PangasoMiddleware: Pangaso;
