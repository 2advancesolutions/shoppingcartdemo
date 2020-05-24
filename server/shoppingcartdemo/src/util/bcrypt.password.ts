import  {genSalt, hash, compare } from 'bcryptjs';

interface PasswordHasher<T = string> {
    hashPassword(password: T):Promise<T>;
    comparePassword(providedPass: T, storedPass: T): Promise<Boolean>;
}

export class BcryptHasher implements PasswordHasher<string> {
    round: number = 10;
   async comparePassword(providedPass: string, storedPass: string): Promise<Boolean> {
        const passwordMatched = await compare(providedPass, storedPass);
        return passwordMatched;
    }
    async hashPassword(password: string) {
        const salt = await genSalt(this.round)
        return await hash(password, salt);
    }
}
