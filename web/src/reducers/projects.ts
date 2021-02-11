import { RootState } from '../store';
import { ProjectAction, ProjectState } from '../types/project';
import { getData } from './index';

const INITIAL_STATE: ProjectState = {
  project: null,
  projects: [],
};

const projectReducer = (state = INITIAL_STATE, action: ProjectAction): ProjectState => {
  switch (action.type) {
  case 'PROJECT_LOADED':
    return {
      ...state,
      project: action.project,
    };
  case 'REMOVE_PROJECT':
    return {
      ...state,
      project: null,
    };
  case 'PROJECT_UPDATED':
    return {
      ...state,
      project: action.project,
    };
  case 'PROJECTS_LOADED':
    return {
      ...state,
      projects: action.projects,
    };
  case 'PROJECTS_UPDATED':
    return {
      ...state,
      projects: action.projects,
    };
  default:
    return state;
  }
};

// ------------------------------------------------------------------//
// --------------------------- Selectors ----------------------------//
// ------------------------------------------------------------------//
export const getProject = (state: RootState, errorIfNotFound = false) => getData(state, 'projects.project', errorIfNotFound && 'No project data found');
export const getProjects = (state: RootState, errorIfNotFound = false) => getData(state, 'projects.projects', errorIfNotFound && 'No projects data found');

export default projectReducer;