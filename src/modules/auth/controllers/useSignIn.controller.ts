import { useMutation } from "@tanstack/react-query";
import { UserRepository } from "../../../../contexts/auth/domain/user.repository";
import { signInQueryUseCase } from "../../../../contexts/auth/app/sign-in.query";
import { EventEmitter } from "../../../../packages/context/app/emitter";
import { useUserStore } from "../stores/user.store";
import { DomainEvent } from "../../../../packages/context/domain/event";

export function useSignInController(
  userRepository: UserRepository,
  eventEmitter: EventEmitter<DomainEvent<object>>
) {
  const signInUser = useUserStore((state) => state.signInUser);

  const { mutate, ...rest } = useMutation({
    mutationFn: signInQueryUseCase(userRepository, eventEmitter).exec,
    onSuccess: (response) => {
      if (response.success) return signInUser(response.data);

      // manage failure response UI side
    },
  });

  return { signInUser: mutate, ...rest };
}
