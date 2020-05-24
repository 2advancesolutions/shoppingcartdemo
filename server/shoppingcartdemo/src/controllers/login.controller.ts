import { repository } from '@loopback/repository';
import { UserRepository } from '../repositories';
import { inject } from '@loopback/context';
import { User } from '../models/user.model';
import { post, getJsonSchemaRef, requestBody } from '@loopback/rest';
import { validateCredentials, Credentials } from '../util/validator';
import { BcryptHasher } from '../util/bcrypt.password';
import * as _ from 'lodash';
import { CredentialsRequestBody } from './specs/user.controller.spec';
import { MyUserService } from '../services/user-service';

export class LoginController {
  constructor(
    @repository(UserRepository) public userRepository: UserRepository,
    @inject('util.hasher') public hasher: BcryptHasher,
    @inject('services.user.service') public userService: MyUserService
  ) { }

  @post('/signup', {
    responses: {
      '200': {
        description: 'User',
        content: {
          schema: getJsonSchemaRef(User)
        }
      }
    },
  })
  async signUp(@requestBody() userData: User) {
    validateCredentials(_.pick(userData, ['email', 'password']));
    userData.password = await this.hasher.hashPassword(userData.password);
    const saveUser = await this.userRepository.create(userData);
    delete saveUser.password;
    return saveUser;
  }
  @post('/user/login',
    {
      responses: {
        '200': {
          description: 'Token',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  token: {
                    type: 'string'
                  }
                }
              }
            }
          }
        }
      },
    })
  async login(@requestBody(CredentialsRequestBody) credentials: Credentials): Promise<{ token: string }> {
       // make sure user exist, password should be valid
       const user = await this.userService.verifyCredentials(credentials);
       console.log(user);
      // const userProfile = this.userService.convertToUserProfile(user);
       return Promise.resolve({token: '47289374928734asdads', user: user});
  }
}
