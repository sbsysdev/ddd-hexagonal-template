import { DomainEvent } from "../domain/event";

type EventEmitterSubscribe<T extends object> = (event: DomainEvent<T>) => void;

type EventEmitterUnsubscribe = () => void;

type DomainEventInstance<T extends object> = new (
  ...args: any
) => DomainEvent<T>;

export interface EventEmitter<T extends object> {
  publish(event: DomainEvent<T>): void;
  subscribe(
    domainEventRef: DomainEventInstance<T>,
    subscriber: EventEmitterSubscribe<T>
  ): EventEmitterUnsubscribe;
}

class BaseEventEmitter<T extends object> implements EventEmitter<T> {
  private readonly _eventSource: Map<
    DomainEventInstance<T>,
    EventEmitterSubscribe<T>[]
  >;

  constructor() {
    this._eventSource = new Map();
  }

  publish(event: DomainEvent<T>): void {
    this._eventSource
      .get(event["constructor"] as DomainEventInstance<T>)
      ?.forEach((cb) => cb(event));
  }

  subscribe<U extends T = T>(
    domainEventRef: DomainEventInstance<U>,
    subscriber: EventEmitterSubscribe<U>
  ): EventEmitterUnsubscribe {
    if (!this._eventSource.has(domainEventRef)) {
      this._eventSource.set(domainEventRef, []);
    }

    this._eventSource
      .get(domainEventRef)
      ?.push(subscriber as EventEmitterSubscribe<T>);

    return () => {
      this._eventSource.set(
        domainEventRef,
        this._eventSource.get(domainEventRef)!.filter((cb) => cb !== subscriber)
      );
    };
  }
}

export function eventEmitter(): EventEmitter<object> {
  return new BaseEventEmitter<object>();
}
