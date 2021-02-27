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

interface TagInput {
  title: string;
}
export interface ProjectFormValues {
  name?: string;
	previewImage?: any;
	images?: any[];
  tags?: TagInput[];
}

export type ProjectTypes = ProjectAction;