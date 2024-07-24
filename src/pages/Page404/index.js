import React from "react";
import { Conteiner } from "../../styles/GlobalStyles";
import history from '../../services/history';

export default function Page404() {
  history.push('/');

  return (
    <Conteiner>
      <h1>Essa Página não existe</h1>
    </Conteiner>
  );
}
