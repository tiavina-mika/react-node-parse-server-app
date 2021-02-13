import { push } from 'connected-react-router';
import {  AppThunk, AppDispatch } from '../store';

/* eslint-disable @typescript-eslint/no-use-before-define */
const CONNECTION_FAILED = 'Votre connexion semble dégradée, vérifiez-là puis actualisez la page.';
/**
 *
 * @param {object} error
 */
export const handleErrorMessage = (error: any): string => {
  switch (error.code) {
  case 100:
    return CONNECTION_FAILED;
  default:
    return error.message;
  }
};

export const showError = (errorOrMessage: any): AppDispatch => (dispatch: any): void => {
  console.error(errorOrMessage);
  dispatch({
    type: 'ERROR',
    message: typeof errorOrMessage === 'string' ? errorOrMessage : handleErrorMessage(errorOrMessage),
  });
};

interface Close {
  type: 'CLOSE_ERROR' | 'CLOSE_MESSAGE';
}
export const closeError = (): Close => ({ type: 'CLOSE_ERROR' });

/**
 * load coupon feedback
 * @param {string} message
 */
export const showMessage = (message: string): AppThunk => dispatch => {
  dispatch({
    type: 'MESSAGE',
    message,
  });
};

export const closeMessage = (): Close => ({ type: 'CLOSE_MESSAGE' });

// --------------------------------------------------------//
// ---------------------- Routing -------------------------//
// --------------------------------------------------------//

export const goToDashboard = () => async (dispatch: AppDispatch) => {
  dispatch(push('/dashboard'));
};