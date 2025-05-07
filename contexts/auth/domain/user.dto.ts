export interface UserRawDTO {
  id: string;
  name: string;
  password: string;
  createdAt: Date;
  updatedAt?: Date;
}

export interface SignInUserDTO extends Pick<UserRawDTO, "name" | "password"> {}

export interface SignedInUserDTO extends UserRawDTO {
  token: string;
}
