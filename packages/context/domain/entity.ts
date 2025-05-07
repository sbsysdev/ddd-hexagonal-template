export interface Entity<T extends object> {
  id: string;
  rawData: T;
}

export abstract class BaseEntity<T extends object> implements Entity<T> {
  private readonly _id: string;

  constructor(id: string) {
    this._id = id;
  }

  get id(): string {
    return this._id;
  }

  abstract get rawData(): T;
}
