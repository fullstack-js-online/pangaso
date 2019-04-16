"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Express = require("express");
var mongodb_1 = require("mongodb");
var Database_1 = require("./Database");
var BodyParser = require("body-parser");
var index_1 = require("./index");
/**
 *
 * Create a new express application
 *
 */
var app = Express();
/**
 *
 * Register the body parser middleware
 *
 */
app.use(BodyParser.json());
/**
 *
 * Register the pangaso middleware to load resources
 *
 */
app.use(index_1.PangasoMiddleware.make());
/**
 *
 * Register the pangaso middleware to load frontend assets
 *
 */
app.use(index_1.PangasoMiddleware.assets());
/**
 *
 * Register the pangaso middleware to load routes
 *
 */
app.use(index_1.PangasoMiddleware.routes());
/**
 *
 * Define the start method on pangaso server.
 *
 */
app.start = function (options) {
    var client = new mongodb_1.MongoClient(options.databaseUri, {
        useNewUrlParser: true
    });
    client
        .connect()
        .then(function () {
        Database_1.Connection.set(client.db(options.database));
        app.listen(options.port, options.startCallback);
    })
        .catch(function () {
        console.log("Database connection failed.");
    });
};
exports.Server = app;
