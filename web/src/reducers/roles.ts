import { RootState } from '../store';
import { RoleAction, RoleState } from '../types/role';
import { getData } from './index';

const INITIAL_STATE: RoleState = {
  user: null,
  roles: [],
};

const roleReducer = (state = INITIAL_STATE, action: RoleAction): RoleState => {
  switch (action.type) {
    case 'ROLES_LOADED':
      return {
        ...state,
        roles: action.roles,
      };
    case 'ROLES_UPDATED':
      return {
        ...state,
        roles: action.roles,
      };
  case 'ROLES_BY_USER_LOADED':
    return {
      ...state,
      roles: action.roles,
      user: action.user,
    };
    default:
      return state;
  }
};

// ------------------------------------------------------------------//
// --------------------------- Selectors ----------------------------//
// ------------------------------------------------------------------//
export const getRoles = (state: RootState, errorIfNotFound = false) => getData(state, 'roles.roles', errorIfNotFound && 'No roles data found');

export default roleReducer;