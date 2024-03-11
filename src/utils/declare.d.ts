declare module 'bcrypt' {
    export const genSalt: (rounds: number) => Promise<string>;
    export const hash: (password: string, salt: string) => Promise<string>;
    export const compare: (password: string, hash: string) => Promise<boolean>;
}
