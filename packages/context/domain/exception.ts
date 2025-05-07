export type DomainExceptionType = "validation" | "not-found";

export interface DomainException<T extends string> {
  id: T;
  kind: DomainExceptionType;
  message: string | undefined;
}

class BaseDomainException<T extends string> implements DomainException<T> {
  private readonly _id: T;
  private readonly _status: DomainExceptionType;
  private readonly _message: string | undefined;

  constructor(id: T, status: DomainExceptionType, message?: string) {
    this._id = id;
    this._status = status;
    this._message = message;
  }

  get id(): T {
    return this._id;
  }

  get kind(): DomainExceptionType {
    return this._status;
  }

  get message(): string | undefined {
    return this._message;
  }
}

export function validationException<T extends string>(
  id: T,
  message?: string
): DomainException<T> {
  return new BaseDomainException(id, "validation", message);
}

export function notFoundException<T extends string>(
  id: T,
  message?: string
): DomainException<T> {
  return new BaseDomainException(id, "not-found", message);
}
