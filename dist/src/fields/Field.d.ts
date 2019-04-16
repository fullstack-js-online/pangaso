import { IFieldMeta } from '../index.d';
export declare class Field {
    /**
     *
     * Define meta data for this field
     *
     * @var {Object}
     *
     */
    meta: IFieldMeta;
    /**
     *
     * Define if this field is nullable or not
     *
     * @var {boolean}
     *
     */
    canBeNull: boolean;
    /**
     *
     * Define the name of this field.
     *
     * @var {string}
     *
     */
    name: string;
    /**
     *
     * Define if this field is sortable or not
     *
     * @var {boolean}
     *
     */
    canBeSorted: boolean;
    /**
     *
     * Define callback function to be used to define field value
     *
     * @var {Function}
     *
     */
    resolveCallback: Function | null;
    /**
     * Rules to be used when updating a field
     *
     * @var {String}
     */
    updateRules: string;
    /**
     *
     * The matching database attribute for this field
     *
     * @var {string}
     *
     */
    attribute: string;
    /**
     * Rules to be used when creating a field
     *
     * @var {String}
     */
    creationRules: string;
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
    createWithRules(rules: string): this;
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
    updateWithRules(rules: string): this;
    /**
     * Mark this field as sortable
     *
     * @return {Field}
     *
     */
    sortable(): this;
    /**
     * Callback to be used to calculate
     * the value of this field.
     *
     * @param {Function} callback
     *
     * @return {Field}
     *
     */
    resolve(callback: Function): this;
    /**
     * Mark this field as nullable
     *
     * @return {Field}
     *
     */
    nullable(): this;
    /**
     * Set the help text for this field
     *
     * @param {String} text
     *
     * @return {Field}
     *
     */
    help(text: string): this;
}
