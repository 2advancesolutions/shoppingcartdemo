import { UserService } from '@loopback/authentication';
import { User } from '../models';
import { Credentials } from '../util/validator';
import { repository } from '@loopback/repository';
import { UserRepository } from '../repositories';
import { inject } from '@loopback/core';
import { BcryptHasher } from '../util/bcrypt.password';
import { HttpErrors } from '@loopback/rest';

export class MyUserService implements UserService<User, Credentials> {
    constructor(@repository(UserRepository) public userRepository: UserRepository,
        @inject('util.hasher') public hasher: BcryptHasher
    ) {
    }
    async verifyCredentials(credentials: Credentials): Promise<User> {
        //
        const foundUser = await this.userRepository.findOne({
          where: {
            email: credentials.email,
          },
        });
        if (!foundUser) {
          throw new HttpErrors.NotFound(
            `user not found with this ${credentials.email}`,
          );
        }
    
        const passwordMatched = await this.hasher.comparePassword(
          credentials.password,
          foundUser.password,
        );
        if (!passwordMatched) {
          throw new HttpErrors.Unauthorized('password is not valid');
        }
        return foundUser;
      }
      convertToUserProfile(user: any): any {
        let userName = '';
        if (user.firstName) {
          userName = user.firstName;
        }
        if (user.lastName) {
          userName = user.firstName
            ? `${user.firstName} ${user.lastName}`
            : user.lastName;
        }
        return {id: `${user.id}`, name: userName}
      }
}
