import { useMemo } from "react";
import { useMutation } from "@tanstack/react-query";
import { UserRepository } from "../../../../contexts/auth/domain/user.repository";
import { signInQuery } from "../../../../contexts/auth/app/sign-in.query";
import { EventEmitter } from "../../../../packages/context/app/emitter";
import { userStore } from "../stores/user.store";

export function useSignInController(
  userRepository: UserRepository,
  eventEmitter: EventEmitter<object>
) {
  const signInUseCase = useMemo(
    () => signInQuery(userRepository, eventEmitter),
    [userRepository, eventEmitter]
  );

  const signInUser = userStore((state) => state.signIn);

  const { mutate, ...rest } = useMutation({
    mutationFn: signInUseCase.exec,
    onSuccess: (response) => response.success && signInUser(response.data),
  });

  return { signInUser: mutate, ...rest };
}
