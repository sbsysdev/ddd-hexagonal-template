import { UseCase } from "../../../packages/context/app/use-case";
import { EventEmitter } from "../../../packages/context/app/emitter";
import { Response } from "../../../packages/context/domain/response";
import { SignedInUserDTO, SignInUserDTO } from "../domain/user.dto";
import { UserEntity, UserError } from "../domain/user.entity";
import { UserRepository } from "../domain/user.repository";
import { userNameValue } from "../domain/username.value";
import { userPasswordValue } from "../domain/userpassword.value";
import { signedInUserEvent } from "../domain/signed-in-user.event";

export class SignInQuery
  implements UseCase<SignInUserDTO, SignedInUserDTO, UserError>
{
  private readonly _userRepository: UserRepository;
  private readonly _eventEmitter: EventEmitter<object>;

  constructor(
    userRepository: UserRepository,
    eventEmitter: EventEmitter<object>
  ) {
    this._userRepository = userRepository;
    this._eventEmitter = eventEmitter;
  }

  async exec(
    params: SignInUserDTO
  ): Promise<Response<SignedInUserDTO, UserError>> {
    const username = userNameValue(params.name);
    if (username.error) return username;

    const userpassword = userPasswordValue(params.password);
    if (userpassword.error) return userpassword;

    const signedInUser = await this._userRepository.signInUser(params);
    if (signedInUser.error) return signedInUser;

    const userEntity = UserEntity.fromRawData(signedInUser.data);
    if (userEntity.error) return userEntity;

    this._eventEmitter.publish(signedInUserEvent(userEntity.data));

    return signedInUser;
  }
}

export function signInQuery(
  userRepository: UserRepository,
  eventEmitter: EventEmitter<object>
) {
  return new SignInQuery(userRepository, eventEmitter);
}
