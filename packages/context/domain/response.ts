import { DomainException } from "./exception";

export interface SuccessResponse<S extends object> {
  success: true;
  failure: false;
  data: S;
}

export interface ExceptionResponse<E extends string> {
  success: false;
  failure: true;
  exception: DomainException<E>;
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

  get failure(): false {
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
  private readonly _exception: DomainException<E>;
  private readonly _message?: string;

  constructor(exception: DomainException<E>, message?: string) {
    this._exception = exception;
    this._message = message;
  }

  get success(): false {
    return false;
  }

  get failure(): true {
    return true;
  }

  get exception(): DomainException<E> {
    return this._exception;
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
