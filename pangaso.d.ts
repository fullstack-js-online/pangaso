declare namespace Express {
    export interface Request {
        pangaso: {
            resources: any
            router: any
            database: any
            userResource: any
            resource?: any
        }
    }

    export interface Application {
        start?: Function
    }
}

declare module 'indicative'
