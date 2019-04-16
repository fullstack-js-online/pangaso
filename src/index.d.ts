export interface IFieldMeta {
    helpText: string
}

export interface IField {
    attribute: string
    creationRules: string
    type: string
}

export interface StartOptions {
    port?: number
    database: string
    databaseUri: string
    startCallback?: Function
}

export interface IResource {
    name?(): string
    fields(): Array<any>
    schema?(): any
    slug(): string
    serialize(): Object
    authorizedToCreate?(): boolean
    authorizedToView?(): boolean
    authorizedToUpdate?(): boolean
    authorizedToDelete?(): boolean
}
