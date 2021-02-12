export interface Project {
  [x: string]: any;
}

export interface ProjectState {
  project?: Project | null;
  projects: Project[];
}

export interface ProjectAction {
  type: string;
  project: Project;
  projects: Project[];
}

export type ProjectTypes = ProjectAction;