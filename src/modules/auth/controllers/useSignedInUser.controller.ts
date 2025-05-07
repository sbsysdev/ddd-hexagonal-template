import { useEffect } from "react";
import { EventEmitter } from "../../../../packages/context/app/emitter";
import { SignedInUserEvent } from "../../../../contexts/auth/domain/signed-in-user.event";

export function useSignedInUserController(eventEmitter: EventEmitter) {
  useEffect(() => {
    const unsubscribe = eventEmitter.subscribe(SignedInUserEvent, (event) => {
      console.log("Signed in user:", event.metadata.rawData);
    });

    return () => unsubscribe();
  }, []);
}
