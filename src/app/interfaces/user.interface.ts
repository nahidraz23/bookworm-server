export interface Iuser {
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    photo?: string,
    role: 'user' | 'admin'
}
