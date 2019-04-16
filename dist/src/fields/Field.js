"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Field = /** @class */ (function () {
    function Field() {
        /**
         *
         * Define meta data for this field
         *
         * @var {Object}
         *
         */
        this.meta = {
            helpText: ''
        };
        /**
         *
         * Define if this field is nullable or not
         *
         * @var {boolean}
         *
         */
        this.canBeNull = false;
        /**
         *
         * Define the name of this field.
         *
         * @var {string}
         *
         */
        this.name = '';
        /**
         *
         * Define if this field is sortable or not
         *
         * @var {boolean}
         *
         */
        this.canBeSorted = false;
        /**
         *
         * Define callback function to be used to define field value
         *
         * @var {Function}
         *
         */
        this.resolveCallback = null;
        /**
         * Rules to be used when updating a field
         *
         * @var {String}
         */
        this.updateRules = '';
        /**
         *
         * The matching database attribute for this field
         *
         * @var {string}
         *
         */
        this.attribute = '';
        /**
         * Rules to be used when creating a field
         *
         * @var {String}
         */
        this.creationRules = '';
    }
    /**
     *
     * Define validation rules to be used for creation
     * for this field.
     *
     * @param {Object} rules
     *
     * @return {Field}
     *
     */
    Field.prototype.createWithRules = function (rules) {
        this.creationRules = rules;
        return this;
    };
    /**
     *
     * Define validation rules to be used for updating
     * for this field.
     *
     * @param {Object} rules
     *
     * @return {Field}
     *
     */
    Field.prototype.updateWithRules = function (rules) {
        this.updateRules = rules;
        return this;
    };
    /**
     * Mark this field as sortable
     *
     * @return {Field}
     *
     */
    Field.prototype.sortable = function () {
        this.canBeSorted = true;
        return this;
    };
    /**
     * Callback to be used to calculate
     * the value of this field.
     *
     * @param {Function} callback
     *
     * @return {Field}
     *
     */
    Field.prototype.resolve = function (callback) {
        this.resolveCallback = callback;
        return this;
    };
    /**
     * Mark this field as nullable
     *
     * @return {Field}
     *
     */
    Field.prototype.nullable = function () {
        this.canBeNull = true;
        return this;
    };
    /**
     * Set the help text for this field
     *
     * @param {String} text
     *
     * @return {Field}
     *
     */
    Field.prototype.help = function (text) {
        this.meta.helpText = text;
        return this;
    };
    return Field;
}());
exports.Field = Field;
