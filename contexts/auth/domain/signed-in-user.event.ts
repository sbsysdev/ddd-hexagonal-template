import { BaseDomainEvent } from "../../../packages/context/domain/event";
import { UserEntity } from "./user.entity";

export class SignedInUserEvent extends BaseDomainEvent<UserEntity> {}

export function signedInUserEvent(userEntity: UserEntity): SignedInUserEvent {
  return new SignedInUserEvent(userEntity);
}
