import { call, put, all, takeLatest } from 'redux-saga/effects';
import * as actions from './actions';
import * as types from '../types';
import { toast } from 'react-toastify';
import { response } from '../../../services/alunosList';
import history from '../../../services/history';
import { get } from 'lodash';

function* loginRequest({ payload }) {
  try {
    const responsee = yield call(response, payload);
    yield put(actions.loginSuccess({... responsee}));


    toast.success('Você fez login');
    history.push(payload.prevPath);
  } catch (e) {
    toast.error('Usuário ou senha inválidos.')
    yield put(actions.loginFailure());
  }
}

function persistRehydrate({ payload }) {
  const token = get(payload, 'auth.token');
  if(!token) return
}

function registerRequest({ payload }) {
  const { id, nome, email, password } = payload;

  try {
    if(id) {
      call(response, {
        email,
        nome,
        password: password || undefined,
      })
      toast.success('Conta alterada com sucesso!');
      put(actions.registerUpdatedSuccess({ nome, email, password }));
    } else {
      call(response, {
        email,
        nome,
        password: password,
      })
      toast.success('Conta criada com sucesso!');
      put(actions.registerCreatedSuccess({ nome, email, password }));
      history.push('/login');
    }
  } catch(e) {
    const errors = get(e, 'response.data.errors', []);
    const status = get(e, 'response.status', 0);

    if(status === 401) {
      toast.error('Você precisa fazer login novamente');
      put(actions.loginFailure());
      return history.push('/login')
    }

    if(errors.length > 0) {
      errors.map(error => toast.error(e));
    } else {
      toast.error('Erro desconhecido');
    }

    put(actions.registerFailure());
  }
}

export default all([
  takeLatest(types.LOGIN_REQUEST, loginRequest),
  takeLatest(types.PERSIST_REHYDRATE, persistRehydrate),
  takeLatest(types.REGISTER_REQUEST, registerRequest),
])
