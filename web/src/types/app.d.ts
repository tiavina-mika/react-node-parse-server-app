export type Variant = 'info' | 'success' | 'warning' | 'error';
export interface AppState {
  user: any | null;
  loading: boolean;
  variant?: Variant | null;
  message: string | null;
  error?: string | null;
  title?: string | null;
}

export interface AppAction extends AppState {
  type: string;
}

export type AppTypes = AppAction;