export interface DomainEvent<T> {
  id: string;
  metadata: T;
  occurredAt: Date;
}

export abstract class BaseDomainEvent<T> implements DomainEvent<T> {
  private readonly _id: string;
  private readonly _metadata: T;
  private readonly _occurredAt: Date;

  constructor(metadata: T) {
    this._id = crypto.randomUUID();
    this._metadata = metadata;
    this._occurredAt = new Date();
  }

  get id(): string {
    return this._id;
  }

  get metadata(): T {
    return this._metadata;
  }

  get occurredAt(): Date {
    return this._occurredAt;
  }
}
