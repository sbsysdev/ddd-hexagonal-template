import { useForm } from "react-hook-form";
import { axiosUserRepo, emitter } from "../../constants";
import { useSignInController } from "../../controllers/useSignIn.controller";

export function useSignInView() {
  const {
    handleSubmit,
    formState: { errors },
  } = useForm();

  // view related states

  const { signInUser } = useSignInController(axiosUserRepo, emitter);

  const handleSignInSubmit = handleSubmit((data) => {
    signInUser(data as any);
  });

  // react to controller state changes
  // react to store changes

  return { errors, handleSignInSubmit };
}
