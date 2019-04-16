import * as Express from 'express'
import { MongoClient } from 'mongodb'
import { Connection } from './Database'
import { StartOptions } from './index.d'
import * as BodyParser from 'body-parser'
import { PangasoMiddleware } from './index'
import { SetResourceMiddleware } from './middleware/set-resource'

/**
 *
 * Create a new express application
 *
 */
const app: Express.Application = Express()

/**
 *
 * Register the body parser middleware
 *
 */
app.use(BodyParser.json())

/**
 *
 * Register the pangaso middleware to load resources
 *
 */
app.use(PangasoMiddleware.make())

/**
 *
 * Register the pangaso middleware to load frontend assets
 *
 */
app.use(PangasoMiddleware.assets())

/**
 *
 * Register the pangaso middleware to load routes
 *
 */
app.use(PangasoMiddleware.routes())

/**
 *
 * Define the start method on pangaso server.
 *
 */
app.start = (options: StartOptions): void => {
    const client: MongoClient = new MongoClient(options.databaseUri, {
        useNewUrlParser: true
    })

    client
        .connect()
        .then(() => {
            Connection.set(client.db(options.database))

            app.listen(options.port, options.startCallback)
        })
        .catch(() => {
            console.log(`Database connection failed.`)
        })
}

export const Server = app
