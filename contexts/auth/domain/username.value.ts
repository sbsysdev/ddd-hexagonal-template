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

export type UserNameError = "auth.user.name.required";

export class UserNameValue implements ValueObject<string, UserNameError> {
  private readonly _value: string;

  constructor(value: string) {
    this._value = value;
  }

  get value(): string {
    return this._value;
  }

  get validate(): DomainException<UserNameError> | null {
    if (this._value.length === 0) {
      return validationException("auth.user.name.required");
    }

    return null;
  }
}

export function userNameValue(
  value: string
): Response<UserNameValue, UserNameError> {
  const valueObject = new UserNameValue(value);

  const valueObjectException = valueObject.validate;

  if (valueObjectException) return exceptionResponse(valueObjectException);

  return successResponse(valueObject);
}
