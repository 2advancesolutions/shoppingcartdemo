import * as isEmail from 'isemail';
import { HttpErrors } from '@loopback/rest';

export type Credentials = {
    email: string;
    password: string
}

export function validateCredentials(credentials: Credentials) {
    if(!isEmail.validate(credentials.email)) {
        throw new HttpErrors.UnprocessableEntity('invaild email provided');
    }
    if(credentials.password.length < 2) {
        throw new HttpErrors.UnprocessableEntity('password lenght should be greater than 8');
    }
}