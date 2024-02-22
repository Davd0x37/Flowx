export const UserStatus = {
  active: 'active',
  idle: 'idle',
  doNotDisturb: 'doNotDisturb',
  offline: 'offline',
} as const;

export type UserStatus = keyof typeof UserStatus;

export type UserStore = {
  name: string;
  avatar: string;
  status: UserStatus;
};
