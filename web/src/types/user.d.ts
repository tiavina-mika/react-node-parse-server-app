export interface User {
  [x: string]: any;
}

export interface UserState {
  user?: User | null;
  users: User[];
}

export interface UserAction {
  type: string;
  user: User;
  users: User[];
}

export type UserTypes = UserAction;