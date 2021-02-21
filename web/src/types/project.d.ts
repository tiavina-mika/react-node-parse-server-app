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

export interface ProjectFormValues {
  name?: string;
	previewImage?: any;
	images?: any[];
}

export type ProjectTypes = ProjectAction;