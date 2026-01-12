export interface Iuser {
    name: string,
    email: string,
    password: string,
    photo?: string,
    role: 'user' | 'admin'
}
