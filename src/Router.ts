import * as path from 'path'
import * as Express from 'express'
import * as Root from 'app-root-path'
import { Auth } from './controllers/auth.controller'
import { Resource } from './controllers/resource.controller'
import { SetResourceMiddleware } from './middleware/set-resource'
import { CreateResourceValidator } from './middleware/create-resource'

const router = Express.Router()

/**
 *
 * Define the api resources
 *
 */
router.get('/api/resources', Resource.index)

/**
 *
 * Authenticate a user
 *
 */
router.post('/api/auth/login', Auth.login)

/**
 *
 * Define the route for fetching all database records for a specific resource
 *
 */
router.get('/api/resources/:slug', SetResourceMiddleware, Resource.fetch)

/**
 *
 * Define the route for fetching a single database record for a specific collection/resource
 *
 */
router.get(
    '/api/resources/:slug/:resource',
    SetResourceMiddleware,
    Resource.show
)

/**
 *
 * Define the route for updating a single database record for a specific collection/resource
 *
 */
router.put(
    '/api/resources/:slug/:resource',
    SetResourceMiddleware,
    Resource.update
)

/**
 *
 * Define the route for created a new database record for a specific resource
 *
 */
router.post(
    '/api/resources/:slug',
    SetResourceMiddleware,
    CreateResourceValidator,
    Resource.store
)

/**
 *
 * Define the route for deleting all specified records for a specific resource
 *
 */
router.delete('/api/resources/:slug', Resource.delete)

/**
 *
 * Handle all the assets for the dashboard.
 *
 */
router.get(
    '*',
    (req: Express.Request, res: Express.Response): void =>
        res.sendFile(path.resolve(__dirname, Root.path, 'public/index.html'))
)

export default router
