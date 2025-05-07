import { DomainException } from "./exception";

export interface ValueObject<T, E extends string> {
  value: T;
  validate: DomainException<E> | null;
}
