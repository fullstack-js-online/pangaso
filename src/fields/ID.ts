import { Field } from './Field'
import * as ChangeCase from 'change-case'

export class ID extends Field {
    /**
     * Define the type of this field
     *
     * @var {String}
     *
     */
    public type: string = 'ID'

    /**
     * Initialize the ID field
     *
     * @param {string} name
     *
     * @return {void}
     *
     */
    constructor(public name: string, public attribute: string = '') {
        super()

        this.name = name
        this.type = 'ID'
        this.attribute = attribute || '_id'
    }

    /**
     *
     * Make a new ID
     *
     * @return {ID}
     *
     */
    static make(name: string, attribute?: string) {
        return new ID(name, attribute)
    }
}
