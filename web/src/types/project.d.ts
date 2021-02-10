export interface Project {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
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