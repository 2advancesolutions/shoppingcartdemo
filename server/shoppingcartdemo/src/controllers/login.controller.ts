// Uncomment these imports to begin using these cool features!

import { repository } from '@loopback/repository';
import { UserRepository } from '../repositories';

// import {inject} from '@loopback/context';
import { User } from '../models/user.model';
import { post, getJsonSchemaRef, requestBody } from '@loopback/rest';
import { validateCredentials } from '../util/validator';
import  * as _ from 'lodash';


export class LoginController {
  constructor(@repository(UserRepository) 
  public userRepository: UserRepository) {}
  
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
    validateCredentials(_.pick(userData, ['email','password']));
    // TODO encrypted password
    const saveUser = await this.userRepository.create(userData);
    delete saveUser.password;
    return saveUser;

  }
}
