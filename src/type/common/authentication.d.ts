export default interface Authentication {
    token?: string;
    serviceKey?: string;
    expirationTime?: string;
    error?:string;
}

export default interface Login {
    url: string,
    username: string,
    password: string
}