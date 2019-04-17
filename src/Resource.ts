import * as Mongoose from 'mongoose'
import { IResource } from './index.d'
import * as Pluralize from 'pluralize'

export class BaseResource implements IResource {
    /**
     *
     * Get the field to use as primary key for this resource
     *
     * @return {string}
     *
     */
    public primaryKey(): string {
        return '_id'
    }

    /**
     *
     * Get the resource name
     *
     * @return {String}
     *
     */
    public name(): string {
        return this.constructor.name
    }

    /**
     *
     * Get the resource title
     *
     * @return {String}
     *
     */
    public title(): string {
        return Pluralize.plural(this.name())
    }

    /**
     *
     * Get all fields for this resource
     *
     * @return {Array}
     *
     */
    public fields() {
        return []
    }

    /**
     *
     * Get all actions for this resource
     *
     * @return {Array}
     *
     */
    public actions() {
        return []
    }

    /**
     * Get the schema for this class
     *
     * @return {string}
     *
     */
    public collection(): string {
        const name: string = this.name()

        return `${name.toLowerCase()}s`
    }

    /**
     * Determine if current user is authorized to create this resource
     *
     * @return {Boolean}
     *
     */
    public authorizedToCreate(): boolean {
        return true
    }

    /**
     * Determine if current user is authorized to view this resource
     *
     * @return {Boolean}
     *
     */
    public authorizedToView(): boolean {
        return true
    }

    /**
     *
     * Return the slug for this resource
     *
     * @return {String}
     *
     */
    public slug(): string {
        return Pluralize.plural(this.name()).toLowerCase()
    }

    /**
     * Determine if current user is authorized to update this resource
     *
     * @return {Boolean}
     *
     */
    public authorizedToUpdate(): boolean {
        return true
    }

    /**
     * Determine if current user is authorized to delete this resource
     *
     * @return {Boolean}
     *
     */
    public authorizedToDelete(): boolean {
        return true
    }

    /**
     * Define a hook for modifying this field before it is saved.
     * It receives the data to be saved, and is expected to
     * return the data, maybe modified.
     *
     * @param {Object} data
     *
     * @return {Promise}
     */
    public async beforeSave(data: object): Promise<any> {
        return Promise.resolve(data)
    }

    /**
     * Define a hook for modifying the resource data before it is updated.
     * It received the data to be updated, and is expected to
     * return the data, maybe modified.
     *
     * @param {Object} data
     *
     * @return {Promise}
     *
     */
    public async beforeUpdate(data: object): Promise<any> {
        return Promise.resolve(data)
    }

    /**
     *
     * Define the items per page
     *
     * @return {void}
     *
     */
    public perPage() {
        return 10
    }

    /**
     *
     * A resource can be serialized
     *
     * @return {Array|Object}
     *
     */
    public serialize() {
        return {
            name: this.name(),
            slug: this.slug(),
            title: this.title(),
            fields: this.fields(),
            actions: this.actions(),
            perPage: this.perPage(),
            primaryKey: this.primaryKey(),
            collection: this.collection(),
            authorizedToView: this.authorizedToView(),
            authorizedToCreate: this.authorizedToCreate(),
            authorizedToUpdate: this.authorizedToUpdate(),
            authorizedToDelete: this.authorizedToDelete()
            // schemaFields: Object.keys(this.schema().paths)
        }
    }
}
