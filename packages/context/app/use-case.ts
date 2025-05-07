import { Response } from "../domain/response";

export interface UseCase<P extends object, S extends object, E extends string> {
  exec(params?: P): Promise<Response<S, E>>;
}
