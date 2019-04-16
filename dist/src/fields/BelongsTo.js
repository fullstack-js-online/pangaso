"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var Field_1 = require("./Field");
var ChangeCase = require("change-case");
var BelongsTo = /** @class */ (function (_super) {
    __extends(BelongsTo, _super);
    /**
     *
     * Initialize a BelongsTo instance
     *
     * @param {String} relatedResource
     *
     * @return {null}
     *
     */
    function BelongsTo(name, resource, attribute) {
        var _this = _super.call(this) || this;
        /**
         * Define a type for this field
         *
         * @var {String}
         *
         */
        _this.type = 'BelongsTo';
        /**
         *
         * Declare the resource this field relates to
         *
         * @type {String}
         *
         */
        _this.resource = null;
        _this.name = name;
        _this.resource = resource;
        _this.attribute = attribute || ChangeCase.camelCase(_this.name);
        return _this;
    }
    /**
     * Make a BelongsTo Instance
     *
     * @param  {...any} args
     *
     * @return {BelongsTo}
     *
     */
    BelongsTo.make = function (name, resource, attribute) {
        return new BelongsTo(name, resource, attribute);
    };
    return BelongsTo;
}(Field_1.Field));
exports.BelongsTo = BelongsTo;
