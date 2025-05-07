import { useForm } from "react-hook-form";
import { axiosUserRepo, emitter } from "../../constants";
import { useSignInController } from "../../controllers/useSignIn.controller";
import { SignInUserDTO } from "../../../../../contexts/auth/domain/user.dto";

export function useSignInView() {
  const {
    handleSubmit,
    formState: { errors },
  } = useForm<SignInUserDTO>();

  // current view related states
  // useTranslate

  const { signInUser } = useSignInController(axiosUserRepo, emitter);

  const handleSignInSubmit = handleSubmit((data) => signInUser(data));

  // react to controller state changes
  // react to store changes

  return { errors, handleSignInSubmit };
}
