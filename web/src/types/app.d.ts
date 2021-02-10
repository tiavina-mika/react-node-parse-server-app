export interface AppState {
  user: any | null,
  loading: boolean,
  error?: string | null,
  message: string | null,
  title?: string | null,
}

export interface AppAction extends AppState{
  type: string;
}

export type AppTypes = AppAction;