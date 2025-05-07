import { create } from "zustand";
import {
  SignedInUserDTO,
  SignInUserDTO,
} from "../../../../contexts/auth/domain/user.dto";

interface UserStoreState extends SignedInUserDTO {
  isSignedIn: boolean;
}

interface UserStoreActions {
  signInUser(user: SignInUserDTO): void;
  signOutUser(): void;
}

const initialState: UserStoreState = {
  id: "",
  name: "",
  password: "",
  createdAt: new Date(),
  updatedAt: undefined,
  token: "",
  isSignedIn: false,
};

export const useUserStore = create<UserStoreState & UserStoreActions>()(
  (set) => ({
    ...initialState,
    signInUser: (user) => set({ ...user, isSignedIn: true }),
    signOutUser: () => set(initialState),
  })
);
