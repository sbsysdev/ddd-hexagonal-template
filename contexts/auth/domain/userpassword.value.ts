import {
  DomainException,
  validationException,
} from "../../../packages/context/domain/exception";
import { ValueObject } from "../../../packages/context/domain/value-object";
import {
  exceptionResponse,
  Response,
  successResponse,
} from "../../../packages/context/domain/response";

export type UserPasswordError = `auth.user.password.${
  | "required"
  | "missmatch"}`;

export class UserPasswordValue
  implements ValueObject<string, UserPasswordError>
{
  private readonly _value: string;

  constructor(value: string) {
    this._value = value;
  }

  get value(): string {
    return this._value;
  }

  get validate(): DomainException<UserPasswordError> | null {
    if (this._value.length === 0) {
      return validationException("auth.user.password.required");
    }

    return null;
  }
}

export function userPasswordValue(
  value: string
): Response<UserPasswordValue, UserPasswordError> {
  const valueObject = new UserPasswordValue(value);

  const valueObjectException = valueObject.validate;

  if (valueObjectException) return exceptionResponse(valueObjectException);

  return successResponse(valueObject);
}
