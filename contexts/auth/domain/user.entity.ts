import { BaseEntity } from "../../../packages/context/domain/entity";
import {
  exceptionResponse,
  Response,
  successResponse,
} from "../../../packages/context/domain/response";
import { UserRawDTO } from "./user.dto";
import { UserNameError, userNameValue, UserNameValue } from "./username.value";
import {
  UserPasswordError,
  userPasswordValue,
  UserPasswordValue,
} from "./userpassword.value";

export type UserError =
  | UserNameError
  | UserPasswordError
  | "auth.user.not-found";

export class UserEntity extends BaseEntity<UserRawDTO> {
  readonly username: UserNameValue;
  readonly userpassword: UserPasswordValue;

  private readonly _rawData: UserRawDTO;

  private constructor(
    id: string,
    username: UserNameValue,
    userpassword: UserPasswordValue,
    rawData: UserRawDTO
  ) {
    super(id);

    this.username = username;
    this.userpassword = userpassword;

    this._rawData = rawData;
  }

  get rawData(): UserRawDTO {
    return {
      ...this._rawData,
      name: this.username.value,
      password: this.userpassword.value,
    };
  }

  static fromRawData(rawData: UserRawDTO): Response<UserEntity, UserError> {
    const username = userNameValue(rawData.name);

    if (username.error) return username;

    const userpassword = userPasswordValue(rawData.password);

    if (userpassword.error) return userpassword;

    return successResponse(
      new UserEntity(rawData.id, username.data, userpassword.data, rawData)
    );
  }
}
