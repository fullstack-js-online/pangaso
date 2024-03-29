"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var ResourceController = /** @class */ (function () {
    function ResourceController() {
    }
    /**
     *
     * Get a list of all resources
     *
     * @param {Express.Request} req
     *
     * @param {Express.Response} res
     *
     * @return {Express.Response}
     *
     */
    ResourceController.prototype.index = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, res.json(req.pangaso.resources
                        .map(function (resource) { return resource.serialize(); })
                        .filter(function (resource) { return resource.authorizedToView; }))];
            });
        });
    };
    /**
     *
     * Get a single record of a resource
     *
     * @param {Express.Request} req
     *
     * @param {Express.Response} res
     *
     * @return {Express.Response}
     *
     */
    ResourceController.prototype.show = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var resource;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, req.pangaso.database.find(req.params.slug, req.params.resource)];
                    case 1:
                        resource = _a.sent();
                        return [2 /*return*/, res.json(resource)];
                }
            });
        });
    };
    /**
     *
     * Fetch data from specific resource collection
     *
     * @param {Express.Request} req
     *
     * @param {Express.Response} res
     *
     * @return {Express.Response}
     *
     */
    ResourceController.prototype.fetch = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, req.pangaso.database.fetch(req.params.slug, {
                            limit: req.pangaso.resource.perPage(),
                            page: req.query.page || 1
                        })];
                    case 1:
                        data = _a.sent();
                        return [2 /*return*/, res.json(data)];
                }
            });
        });
    };
    /**
     *
     * Store record for a specific resource collection
     *
     * @param {Express.Request} req
     *
     * @param {Express.Response} res
     *
     * @return {Express.Response}
     *
     */
    ResourceController.prototype.store = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var data, resource;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, req.pangaso.resource.beforeSave(req.body)];
                    case 1:
                        data = _a.sent();
                        return [4 /*yield*/, req.pangaso.database.insert(req.params.slug, data)];
                    case 2:
                        resource = _a.sent();
                        return [2 /*return*/, res.json(resource)];
                }
            });
        });
    };
    /**
     *
     * Update a record for a specific resource collection
     *
     * @param {Express.Request} req
     *
     * @param {Express.Response} res
     *
     * @return {Express.Response}
     *
     */
    ResourceController.prototype.update = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var data, resource;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, req.pangaso.resource.beforeUpdate(req.body)];
                    case 1:
                        data = _a.sent();
                        return [4 /*yield*/, req.pangaso.database.update(req.params.slug, req.params.resource, data)];
                    case 2:
                        resource = _a.sent();
                        return [2 /*return*/, res.json(resource)];
                }
            });
        });
    };
    /**
     *
     * Run a resource action on a selected list of resources.
     *
     * @param {Express.Request} req
     *
     * @param {Express.Response} res
     *
     * @return {Express.Response}
     *
     */
    ResourceController.prototype.action = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, actionId, resources, action, collection;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = req.body, actionId = _a.action, resources = _a.resources;
                        action = req.pangaso.resource.actions().find(function (a) { return a.id === actionId; });
                        return [4 /*yield*/, req.pangaso.database.fetchByIds(req.params.slug, resources)
                            /**
                             *
                             * Run the handle method on the action, passing in
                             * the database connection, request object
                             * and collection of models
                             *
                             */
                        ];
                    case 1:
                        collection = _b.sent();
                        /**
                         *
                         * Run the handle method on the action, passing in
                         * the database connection, request object
                         * and collection of models
                         *
                         */
                        return [4 /*yield*/, action.handle(req.pangaso.database.get().collection(req.params.slug), req, collection)];
                    case 2:
                        /**
                         *
                         * Run the handle method on the action, passing in
                         * the database connection, request object
                         * and collection of models
                         *
                         */
                        _b.sent();
                        return [2 /*return*/, res.json({})];
                }
            });
        });
    };
    /**
     *
     * Delete a resource from specific resource collection
     *
     * @param {Express.Request} req
     *
     * @param {Express.Response} res
     *
     * @return {Express.Response}
     *
     */
    ResourceController.prototype.delete = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, req.pangaso.database.destroy(req.params.slug, req.body.resources)];
                    case 1:
                        data = _a.sent();
                        return [2 /*return*/, res.json(data)];
                }
            });
        });
    };
    return ResourceController;
}());
exports.Resource = new ResourceController();
