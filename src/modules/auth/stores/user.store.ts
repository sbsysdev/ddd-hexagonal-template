import { create } from "zustand";
import {
  SignedInUserDTO,
  SignInUserDTO,
} from "../../../../contexts/auth/domain/user.dto";

interface UserStoreState extends SignedInUserDTO {
  isSignedIn: boolean;
}

interface UserStoreActions {
  signIn(user: SignInUserDTO): void;
  signOut(): void;
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

export const userStore = create<UserStoreState & UserStoreActions>()((set) => ({
  ...initialState,
  signIn: (user) => set({ ...user, isSignedIn: true }),
  signOut: () => set(initialState),
}));
