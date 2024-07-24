import React from "react";
import PropTypes from 'prop-types';
import { Conteiner } from "./styled";

export default function Loading({  isLoading }) {
  if(!isLoading) return <></>;

  return (
    <Conteiner>
      <div />
      <span>Carregando...</span>
    </Conteiner>
  );
}

Loading.defaultProps = {
  isLoading: false,
}

Loading.propTypes = {
  isLoading: PropTypes.bool,
}
