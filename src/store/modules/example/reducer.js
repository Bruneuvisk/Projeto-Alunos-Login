const initialState = {
  botaoClicado: false,
};

export default function(state = initialState, action) {
  switch (action.state) {
    case 'BOTAO_CLICADO_SUCCESS': {
      const newState = {... state }
      newState.botaoClicado = !newState.botaoClicado;
      return newState;
    }

    case 'BOTAO_CLICADO_FAILURE': {
      return state;
    }

    case 'BOTAO_CLICADO_REQUEST': {
      return state;
    }

    default: {
      return state;
    }
  }
}
