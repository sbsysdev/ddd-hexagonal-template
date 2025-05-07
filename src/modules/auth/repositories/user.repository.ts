import {
  SignedInUserDTO,
  SignInUserDTO,
} from "../../../../contexts/auth/domain/user.dto";
import { UserError } from "../../../../contexts/auth/domain/user.entity";
import { UserRepository } from "../../../../contexts/auth/domain/user.repository";
import { notFoundException } from "../../../../packages/context/domain/exception";
import {
  exceptionResponse,
  Response,
  successResponse,
} from "../../../../packages/context/domain/response";

export class AxiosUserRepository implements UserRepository {
  async signInUser(
    params: SignInUserDTO
  ): Promise<Response<SignedInUserDTO, UserError>> {
    if (params.password !== "Lamisma123*") {
      return exceptionResponse(
        notFoundException("auth.user.password.missmatch")
      );
    }

    return successResponse({
      id: crypto.randomUUID(),
      name: params.name,
      password: "",
      createdAt: new Date("2024-12-28T18:25:34Z"),
      updatedAt: new Date("2025-02-14T21:18:12Z"),
      token: crypto.randomUUID(),
    });
  }
}

export function axiosUserRepository(): AxiosUserRepository {
  return new AxiosUserRepository();
}
