export const UserStatus = {
  available: 'available',
  idle: 'idle',
  doNotDisturb: 'doNotDisturb',
  invisible: 'invisible',
} as const;

export type UserStatus = keyof typeof UserStatus;

export type UserStore = {
  name: string;
  avatar: string;
  status: UserStatus;
};
