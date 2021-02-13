export interface AppState {
  user: any | null;
  loading: boolean;
  variant?: 'info' | 'success' | 'warning' | 'error' | null;
  message: string | null;
  error?: string | null;
  title?: string | null;
}

export interface AppAction extends AppState {
  type: string;
}

export type AppTypes = AppAction;