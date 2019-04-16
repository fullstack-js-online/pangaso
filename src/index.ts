import * as Fs from 'fs'
import * as Path from 'path'
import * as Express from 'express'
import PangasoRouter from './Router'
import * as Root from 'app-root-path'
import { IResource } from './index.d'
import { Connection, Database } from './Database'

export class Pangaso {
    /**
     * The path for all resources
     *
     * @type {String}
     *
     */
    private resourcesPath: string = `${process.cwd()}/pangaso`

    /**
     *
     * The database connection
     *
     * @type {Any}
     *
     */
    private connection: any = ''

    /**
     * Define the pangaso router
     *
     * @type {Router}
     *
     */
    private router: Express.Router = PangasoRouter

    /**
     *
     * Pangaso resources
     *
     * @type {Array}
     *
     */
    private resources: IResource[] = []

    /**
     * Determine if pangaso has already been initialized
     *
     * @type {Boolean}
     *
     */
    private initialized: boolean = false

    /**
     *
     * Define the database connection
     *
     * @type {Database}
     *
     */
    private database: Database = Connection

    /**
     *
     * Load all resources from the resources path
     *
     * @return {void}
     *
     */
    loadResources(): void {
        if (this.initialized) return

        this.initialized = true
        try {
            const files = Fs.readdirSync(this.resourcesPath)

            files.forEach((file: string) => {
                const resource = require(`${this.resourcesPath}/${file}`)

                if (resource.default) {
                    this.resources.push(new resource.default())

                    return
                }

                this.resources.push(new resource())
            })
        } catch (error) {
            console.log('ERROR ----->', error)
            console.warn(`Pangaso resources folder does not exist.`)
        }
    }

    /**
     * Get the user resource
     *
     * @return {IResource}
     *
     */
    private getUserResource(): IResource {
        const resource: any = this.resources.find((resource: IResource) => {
            if (resource && resource.name) {
                return resource.name() === 'User'
            }

            return false
        })

        if (!resource) {
            throw new Error('User Resource must be defined.')
        }

        return resource
    }

    /**
     *
     * Make the pangaso middleware
     *
     * @return {Function}
     *
     */
    public make() {
        return (
            req: Express.Request,
            res: Express.Response,
            next: Express.NextFunction
        ): void => {
            this.loadResources()

            req.pangaso = {
                router: this.router,
                database: this.database,
                resources: this.resources,
                userResource: this.getUserResource()
            }

            next()
        }
    }

    /**
     *
     * Return the pangaso router
     *
     * @return {Express.Router}
     *
     */
    routes() {
        return this.router
    }

    /**
     * Register the static assets for pangaso
     *
     * @return {void}
     *
     */
    assets() {
        return Express.static(Path.resolve(__dirname, Root.path, 'public'))
    }
}

export const PangasoMiddleware = new Pangaso()
