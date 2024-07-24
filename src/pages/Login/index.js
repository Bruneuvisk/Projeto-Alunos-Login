import React from "react";
import { Conteiner } from '../../styles/GlobalStyles';
import { Form } from './styled';
import { toast } from 'react-toastify';
import { isEmail } from "validator";
import * as actions from '../../store/modules/auth/actions'
import { useDispatch, useSelector } from "react-redux";
import { get } from "lodash";
import Loading from "../../components/Loading";

export default function Login(props) {
  const dispatch = useDispatch();
  const prevPath = get(props, 'location.state.prevPath', '/');

  const isLoading = useSelector(state => state.auth.isLoading);

  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const handleSubmit = e => {
    e.preventDefault();
    let formErrors = false;

    if(!isEmail(email)) {
      formErrors = true;
      toast.error('Email inválido');
    }

    if(password.length < 6 || password.length > 50) {
      formErrors = true;
      toast.error('Senha inválida');
    }

    if(formErrors) return;

    dispatch(actions.loginRequest({ email, password, prevPath }));
  }

  return (
    <Conteiner>
      <Loading isLoading={isLoading} />
      <h1>Login</h1>

      <Form onSubmit={handleSubmit}>
        <input type="text"
               value={email}
               onChange={e => setEmail(e.target.value)}
               placeholder="Seu e-mail"
        >
        </input>
        <input type="password"
               value={password}
               onChange={e => setPassword(e.target.value)}
               placeholder="Seu senha"
        >
        </input>
        <button type="submit">Acessar</button>
      </Form>
    </Conteiner>
  );
}