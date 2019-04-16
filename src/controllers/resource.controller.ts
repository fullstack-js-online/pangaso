import { IResource } from '../index.d'
import * as Express from 'express'

class ResourceController {
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
    public async index(req: Express.Request, res: Express.Response) {
        return res.json(
            req.pangaso.resources
                .map((resource: IResource) => resource.serialize())
                .filter((resource: IResource) => resource.authorizedToView)
        )
    }

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
    public async show(req: Express.Request, res: Express.Response) {
        const resource = await req.pangaso.database.find(
            req.params.slug,
            req.params.resource
        )

        return res.json(resource)
    }

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
    public async fetch(req: Express.Request, res: Express.Response) {
        const data = await req.pangaso.database.fetch(req.params.slug, {
            limit: req.pangaso.resource.perPage(),
            page: req.query.page || 1
        })

        return res.json(data)
    }

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
    public async store(req: Express.Request, res: Express.Response) {
        const data = await req.pangaso.resource.beforeSave(req.body)

        const resource = await req.pangaso.database.insert(
            req.params.slug,
            data
        )

        return res.json(resource)
    }

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
    public async update(req: Express.Request, res: Express.Response) {
        const data = await req.pangaso.resource.beforeUpdate(req.body)

        const resource = await req.pangaso.database.update(
            req.params.slug,
            req.params.resource,
            data
        )

        return res.json(resource)
    }

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
    public async delete(req: Express.Request, res: Express.Response) {
        const data = await req.pangaso.database.destroy(
            req.params.slug,
            req.body.resources
        )

        return res.json(data)
    }
}

export const Resource = new ResourceController()
