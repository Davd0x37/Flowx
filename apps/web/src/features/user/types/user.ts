const UserStatus = {
  available: 'AVAILABLE',
  idle: 'IDLE',
  doNotDisturb: 'DO_NOT_DISTURB',
  invisible: 'INVISIBLE',
} as const;

export type UserStatus = keyof typeof UserStatus;

export type UserStore = {
  name: string;
  avatar: string;
  status: UserStatus;
};
