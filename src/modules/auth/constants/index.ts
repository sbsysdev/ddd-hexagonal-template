import { eventEmitter } from "../../../../packages/context/app/emitter";
import { axiosUserRepository } from "../repositories/user.repository";

export const axiosUserRepo = axiosUserRepository();

export const emitter = eventEmitter();
