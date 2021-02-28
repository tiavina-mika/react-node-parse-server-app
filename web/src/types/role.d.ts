import { User } from "./user";

export interface Role {
  [x: string]: any;
}

export interface RoleState {
  user?: User | null;
  roles: Roles[];
}

export interface RoleAction {
  type: string;
  roles: Role[];
  user?: User | null;
}

export type RoleTypes = RoleAction;