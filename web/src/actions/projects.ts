import Parse from 'parse';
import { AppThunk, AppDispatch, RootState } from '../store';
import { getValues, setValues } from '../utils/parseUtils';
import { onEnter, showParseObj, actionWithLoader  } from './utils';
import { showHomeThunk } from './app';

import { getProject, getProjects } from '../reducers/projects';

// --------------------------------------------------------//
// ------------------ Parse <=> Object --------------------//
// --------------------------------------------------------//
const Project = Parse.Object.extend('Project');

const PROJECT_PROPERTIES: any = new Set([
  'name',
]);

/**
 * get values for current project
 * @param project
 * @returns {Object}
 */
export const getProjectValues = (project: any) => getValues(project, PROJECT_PROPERTIES);
/**
 * set project values
 * @param project
 * @param values
 */
export function setProjectValues(project: any, values: any) {
  setValues(project, values, PROJECT_PROPERTIES);
}
// --------------------------------------------------------//
// --------------------- CRUD actions ---------------------//
// --------------------------------------------------------//
/**
 * create new project
 * @param values
 * @returns {*}
 */
export const createProject = (values: any): AppThunk => {
  return actionWithLoader(async (dispatch: AppDispatch, getState: () => RootState) => {
    const projects = getProjects(getState());
    const project = new Project();
		
    setProjectValues(project, values);
    await project.save();
		
    dispatch({
      type: 'PROJECT_LOADED',
      project,
    });
    dispatch({
      type: 'PROJECTS_UPDATED',
      projects: [project, ...projects],
    });
  });
};

/**
 * saves and updates project
 * @param {Object} project
 */
export const updateProjectThunk = (project: any): any => {
  return async (dispatch: AppDispatch) => {
    await project.save();
    dispatch({
      type: 'PROJECT_UPDATED',
      project,
    });
  };
};

/**
 * update current project
 * @param project
 * @param values
 * @returns {*}
 */
export const updateProject = (project: any, values: any): AppThunk => {

  return actionWithLoader(async (dispatch: AppDispatch, getState: () => RootState) => {

    setProjectValues(project, values);
    await updateProjectThunk(project)(dispatch, getState);
  });
};

/**
 * delete current project
 * @param project
 * @returns {*}
 */
export const deleteProject = (project: any): AppThunk => {
  return actionWithLoader(async (dispatch: AppDispatch, getState: () => RootState) => {
    const projects = getProjects(getState());
    const newProjects = projects.filter((m: any) => m !== project);

    project.set('deleted', true);
    await project.save();
    dispatch({
      type: 'PROJECTS_UPDATED', // used in projects list
      projects: newProjects,
    });
  });
};

/**
 * load all templates
 * @returns {Function}
 */
export const loadProjectsThunk = (): any => {
  return async (dispatch: AppDispatch) => {
    const projects = await new Parse.Query('Project')
      .notEqualTo('deleted', true)
      .find();

    if (projects && Array.isArray(projects)) {
      dispatch({
        type: 'PROJECTS_LOADED',
        projects,
      });
    }
    return projects;
  };
};

/**
 * onEnter projects
 * @param store
 * @returns {function(*, *, *): Promise<undefined>}
 */
export const onEnterProjects = (store: any) => {
  return onEnter({
    store,
    /* eslint-disable-next-line @typescript-eslint/no-unused-vars */
    actionThunk: (_: any) => {
      return async (dispatch: AppDispatch, getState: () => RootState) => {
        const projects = await loadProjectsThunk()(dispatch, getState);
        if (!projects) {
          showHomeThunk(dispatch);
        }
      };
    },
  });
};

// --------------------------------------------------------//
// ------------------ loading template --------------------//
// --------------------------------------------------------//
/**
 * load project into redux
 * @param projectId
 * @returns {function(*, *): Promise<*>}
 */
export const loadProjectThunk = (projectId: any): any => {
  return async (dispatch: AppDispatch, getState: () => RootState) => {
    const currentProject = getProject(getState());
    if (!currentProject || currentProject.id !== projectId) {
      // loading template
      const project = await new Parse.Query('Project')
        .include('templates')
        .equalTo('objectId', projectId)
        .first();

      dispatch({
        type: 'PROJECT_LOADED',
        project,
      });
      return project;
    }

    return currentProject;
  };
};

/**
 * onEnter template preview or edit page
 * @param store
 * @returns {function(*, *, *): Promise<undefined>}
 */
export const onEnterProject = (store: any) => {
  return onEnter({
    store,
    actionThunk: (params: any) => {
      return async (dispatch: AppDispatch, getState: () => RootState) => {
        const { projectId } = params;
        const project = await loadProjectThunk(projectId)(dispatch, getState);
        if (!project) {
          // template not found
          showHomeThunk(dispatch);
        }
      };
    },
  });
};

// --------------------------------------------------------//
// ---------------------- Routing -------------------------//
// --------------------------------------------------------//
/**
 * show project
 * @param projectId
 * @param fromNewTab
 */
export const showProject = (projectId: string) => showParseObj('project', projectId);

// export function showProjectCreation() {
// 	return push('/projectCreation');
// }

// export function showProjects() {
// 	return push('/projects');
// }
// export function showProjectEdit(projectId: string) {
// 	return push('/projectEdit-' + projectId)
// }