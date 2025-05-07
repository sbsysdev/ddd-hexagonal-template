import { DomainEvent } from "../domain/event";

type EventEmitterSubscribe<T> = (event: T) => void;

type EventEmitterUnsubscribe = () => void;

type DomainEventInstance<T> = new (...args: any) => T;

export interface EventEmitter<T extends DomainEvent<any> = DomainEvent<any>> {
  publish(event: T): void;
  subscribe<U extends T>(
    domainEventRef: DomainEventInstance<U>,
    subscriber: EventEmitterSubscribe<U>
  ): EventEmitterUnsubscribe;
}

class BaseEventEmitter<T extends DomainEvent<any>> implements EventEmitter<T> {
  private readonly _eventSource: Map<
    DomainEventInstance<any>,
    EventEmitterSubscribe<T>[]
  >;

  constructor() {
    this._eventSource = new Map();
  }

  publish(event: T): void {
    this._eventSource
      .get(event["constructor"] as DomainEventInstance<any>)
      ?.forEach((cb) => cb(event));
  }

  subscribe<U extends T>(
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

export function eventEmitter<E extends DomainEvent<any>>(): EventEmitter<E> {
  return new BaseEventEmitter<E>();
}
