import * as Express from 'express'
import * as Mongoose from 'mongoose'
import { BaseResource } from '../Resource'

class AuthController {
    /**
     *
     * @param {Express.Request} req
     *
     * @param {Express.Response} res
     *
     * @return {Express.Response}
     *
     */
    public async login(
        req: Express.Request,
        res: Express.Response
    ): Promise<Express.Response> {
        const { userResource } = req.pangaso

        const UserModel = Mongoose.model(
            'PangasoUserModel',
            userResource.schema()
        )

        console.log('----------------->', Mongoose.connection)

        const existingUser = await UserModel.findOne({
            email: 'bahdcoder@gmail.com'
        })

        if (!existingUser) {
            return res.status(422).json({
                message: 'These credentials do not match our records.'
            })
        }

        return res.json({
            email: 'bahdcoder',
            password: 'password',
            pangaso: userResource.schema()
        })
    }
}

export const Auth = new AuthController()
