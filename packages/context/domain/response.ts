import { DomainException } from "./exception";

export interface SuccessResponse<S extends object> {
  success: true;
  error: false;
  data: S;
}

export interface ExceptionResponse<E extends string> {
  success: false;
  error: DomainException<E>;
  message: string | undefined;
}

export type Response<S extends object, E extends string> =
  | SuccessResponse<S>
  | ExceptionResponse<E>;

class BaseSuccessResponse<S extends object> implements SuccessResponse<S> {
  private readonly _data: S;

  constructor(data: S) {
    this._data = data;
  }

  get success(): true {
    return true;
  }

  get error(): false {
    return false;
  }

  get data(): S {
    return this._data;
  }
}

export function successResponse<S extends object>(data: S): SuccessResponse<S> {
  return new BaseSuccessResponse(data);
}

class BaseExceptionResponse<E extends string> implements ExceptionResponse<E> {
  private readonly _error: DomainException<E>;
  private readonly _message?: string;

  constructor(error: DomainException<E>, message?: string) {
    this._error = error;
    this._message = message;
  }

  get success(): false {
    return false;
  }

  get error(): DomainException<E> {
    return this._error;
  }

  get message(): string | undefined {
    return this._message;
  }
}

export function exceptionResponse<E extends string>(
  domainException: DomainException<E>
): ExceptionResponse<E> {
  return new BaseExceptionResponse(domainException);
}
