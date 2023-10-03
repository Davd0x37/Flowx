export interface UserInterface {
  email: string;
  password: string;
}

export type UserRegisterInterface = UserInterface & {
  repeatPassword: string;
};
