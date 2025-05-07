import { Response } from "../../../packages/context/domain/response";
import { SignedInUserDTO, SignInUserDTO } from "./user.dto";
import { UserError } from "./user.entity";

export interface UserRepository {
  signInUser(
    params: SignInUserDTO
  ): Promise<Response<SignedInUserDTO, UserError>>;
}
