"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var path = require("path");
var Express = require("express");
var Root = require("app-root-path");
var auth_controller_1 = require("./controllers/auth.controller");
var resource_controller_1 = require("./controllers/resource.controller");
var set_resource_1 = require("./middleware/set-resource");
var create_resource_1 = require("./middleware/create-resource");
var router = Express.Router();
/**
 *
 * Define the api resources
 *
 */
router.get('/api/resources', resource_controller_1.Resource.index);
/**
 *
 * Authenticate a user
 *
 */
router.post('/api/auth/login', auth_controller_1.Auth.login);
/**
 *
 * Define the route for fetching all database records for a specific resource
 *
 */
router.get('/api/resources/:slug', set_resource_1.SetResourceMiddleware, resource_controller_1.Resource.fetch);
/**
 *
 * Define the route for fetching a single database record for a specific collection/resource
 *
 */
router.get('/api/resources/:slug/:resource', set_resource_1.SetResourceMiddleware, resource_controller_1.Resource.show);
/**
 *
 * Define the route for running a specific action on a list of selected resources
 *
 */
router.post('/api/resources/:slug/run-action', set_resource_1.SetResourceMiddleware, resource_controller_1.Resource.action);
/**
 *
 * Define the route for updating a single database record for a specific collection/resource
 *
 */
router.put('/api/resources/:slug/:resource', set_resource_1.SetResourceMiddleware, resource_controller_1.Resource.update);
/**
 *
 * Define the route for created a new database record for a specific resource
 *
 */
router.post('/api/resources/:slug', set_resource_1.SetResourceMiddleware, create_resource_1.CreateResourceValidator, resource_controller_1.Resource.store);
/**
 *
 * Define the route for deleting all specified records for a specific resource
 *
 */
router.delete('/api/resources/:slug', resource_controller_1.Resource.delete);
/**
 *
 * Handle all the assets for the dashboard.
 *
 */
router.get('*', function (req, res) {
    return res.sendFile(path.resolve(__dirname, Root.path, 'public/index.html'));
});
exports.default = router;
