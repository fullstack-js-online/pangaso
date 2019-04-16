"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Fs = require("fs");
var Path = require("path");
var Express = require("express");
var Router_1 = require("./Router");
var Root = require("app-root-path");
var Database_1 = require("./Database");
var Pangaso = /** @class */ (function () {
    function Pangaso() {
        /**
         * The path for all resources
         *
         * @type {String}
         *
         */
        this.resourcesPath = process.cwd() + "/pangaso";
        /**
         *
         * The database connection
         *
         * @type {Any}
         *
         */
        this.connection = '';
        /**
         * Define the pangaso router
         *
         * @type {Router}
         *
         */
        this.router = Router_1.default;
        /**
         *
         * Pangaso resources
         *
         * @type {Array}
         *
         */
        this.resources = [];
        /**
         * Determine if pangaso has already been initialized
         *
         * @type {Boolean}
         *
         */
        this.initialized = false;
        /**
         *
         * Define the database connection
         *
         * @type {Database}
         *
         */
        this.database = Database_1.Connection;
    }
    /**
     *
     * Load all resources from the resources path
     *
     * @return {void}
     *
     */
    Pangaso.prototype.loadResources = function () {
        var _this = this;
        if (this.initialized)
            return;
        this.initialized = true;
        try {
            /**
             *
             * Fetch all files (and unfortunately, folders) in resource path
             *
             */
            var files = Fs.readdirSync(this.resourcesPath);
            /**
             *
             * Get only files ending in .js
             *
             */
            files = files.filter(function (file) { return file.substring(file.length - 3) === '.js'; });
            /**
             *
             * Foreach of those files, require and load the resource
             *
             */
            files.forEach(function (file) {
                var resource = require(_this.resourcesPath + "/" + file);
                if (resource.default) {
                    _this.resources.push(new resource.default());
                    return;
                }
                _this.resources.push(new resource());
            });
        }
        catch (error) {
            console.log('ERROR ----->', error);
            console.warn("Pangaso resources folder does not exist.");
        }
    };
    /**
     * Get the user resource
     *
     * @return {IResource}
     *
     */
    Pangaso.prototype.getUserResource = function () {
        var resource = this.resources.find(function (resource) {
            if (resource && resource.name) {
                return resource.name() === 'User';
            }
            return false;
        });
        if (!resource) {
            throw new Error('User Resource must be defined.');
        }
        return resource;
    };
    /**
     *
     * Make the pangaso middleware
     *
     * @return {Function}
     *
     */
    Pangaso.prototype.make = function () {
        var _this = this;
        return function (req, res, next) {
            _this.loadResources();
            req.pangaso = {
                router: _this.router,
                database: _this.database,
                resources: _this.resources,
                userResource: _this.getUserResource()
            };
            next();
        };
    };
    /**
     *
     * Return the pangaso router
     *
     * @return {Express.Router}
     *
     */
    Pangaso.prototype.routes = function () {
        return this.router;
    };
    /**
     * Register the static assets for pangaso
     *
     * @return {void}
     *
     */
    Pangaso.prototype.assets = function () {
        return Express.static(Path.resolve(__dirname, Root.path, 'public'));
    };
    return Pangaso;
}());
exports.Pangaso = Pangaso;
exports.PangasoMiddleware = new Pangaso();
