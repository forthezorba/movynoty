import { createAction, handleActions } from 'redux-actions';
import createRequestSaga, {
  createRequestActionTypes,
} from '../lib/createRequestSaga';
import * as API from '../lib/api/alarm';
import { takeLatest } from 'redux-saga/effects';

const [GET] = createRequestActionTypes('token/GET');
const [INSERT, INSERT_SUCCESS, INSERT_FAILURE] = createRequestActionTypes(
  'token/INSERT',
);
export const insertToken = createAction(GET, (token) => token);
export const insertAlarm = createAction(INSERT);

const createReqeustToken = createRequestSaga(INSERT, API.addToken);

export function* tokenSaga() {
  yield takeLatest(INSERT, createReqeustToken);
}

const initialState = {
  token: null,
  error: null,
};

//불러와서 재활용하기 위해 함수 형태로(실제 액션 함수)
const token = handleActions(
  {
    [GET]: (state, { payload: token }) => ({
      ...state,
      token,
    }),
    [INSERT_SUCCESS]: (state) => ({
      ...state,
    }),
    [INSERT_FAILURE]: (state, { payload: error }) => ({
      ...state,
      error,
    }),
  },
  initialState,
);

export default token;
