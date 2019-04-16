import { IFieldMeta } from '../index.d'

export class Field {
    /**
     *
     * Define meta data for this field
     *
     * @var {Object}
     *
     */
    public meta: IFieldMeta = {
        helpText: ''
    }

    /**
     *
     * Define if this field is nullable or not
     *
     * @var {boolean}
     *
     */
    public canBeNull: boolean = false

    /**
     *
     * Define the name of this field.
     *
     * @var {string}
     *
     */
    public name: string = ''

    /**
     *
     * Define if this field is sortable or not
     *
     * @var {boolean}
     *
     */
    public canBeSorted: boolean = false

    /**
     *
     * Define callback function to be used to define field value
     *
     * @var {Function}
     *
     */
    public resolveCallback: Function | null = null

    /**
     * Rules to be used when updating a field
     *
     * @var {String}
     */
    public updateRules: string = ''

    /**
     *
     * The matching database attribute for this field
     *
     * @var {string}
     *
     */
    public attribute: string = ''

    /**
     * Rules to be used when creating a field
     *
     * @var {String}
     */
    public creationRules: string = ''

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
    createWithRules(rules: string) {
        this.creationRules = rules

        return this
    }

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
    updateWithRules(rules: string) {
        this.updateRules = rules

        return this
    }

    /**
     * Mark this field as sortable
     *
     * @return {Field}
     *
     */
    sortable() {
        this.canBeSorted = true

        return this
    }

    /**
     * Callback to be used to calculate
     * the value of this field.
     *
     * @param {Function} callback
     *
     * @return {Field}
     *
     */
    resolve(callback: Function) {
        this.resolveCallback = callback
        return this
    }

    /**
     * Mark this field as nullable
     *
     * @return {Field}
     *
     */
    nullable() {
        this.canBeNull = true

        return this
    }

    /**
     * Set the help text for this field
     *
     * @param {String} text
     *
     * @return {Field}
     *
     */
    public help(text: string) {
        this.meta.helpText = text

        return this
    }
}
