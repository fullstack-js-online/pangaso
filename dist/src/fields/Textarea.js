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
var Textarea = /** @class */ (function (_super) {
    __extends(Textarea, _super);
    /**
     * Initialize the Textarea field
     *
     * @param {string} name
     *
     * @return {void}
     *
     */
    function Textarea(name, attribute) {
        if (attribute === void 0) { attribute = ''; }
        var _this = _super.call(this) || this;
        _this.name = name;
        _this.attribute = attribute;
        /**
         * Define the type of this field
         *
         * @var {String}
         *
         */
        _this.type = 'Textarea';
        _this.name = name;
        _this.type = 'Textarea';
        _this.attribute = attribute || ChangeCase.camelCase(_this.name);
        return _this;
    }
    /**
     *
     * Make a new Textarea
     *
     * @return {Textarea}
     *
     */
    Textarea.make = function (name, attribute) {
        return new Textarea(name, attribute);
    };
    return Textarea;
}(Field_1.Field));
exports.Textarea = Textarea;
