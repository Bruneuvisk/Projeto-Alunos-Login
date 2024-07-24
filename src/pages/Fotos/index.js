import React from "react";
import { Conteiner } from '../../styles/GlobalStyles';
import Loading from "../../components/Loading";
import { Title, Form } from "./styled";
import history from "../../services/history";
import { get } from "lodash";
import { response } from "../../services/alunosList";
import { toast } from "react-toastify";
import PropTypes from 'prop-types';
import { useDispatch } from "react-redux";
import * as actions from '../../store/modules/auth/actions';

export default function Fotos() {
  const id = get(match, 'params.id', '');
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = React.useState(false);
  const [foto, setFoto] = React.useState('');

  React.useEffect(() => {
    const getData = async () => {
      try {
        setIsLoading(true);
        setFoto(get(response, 'Fotos[0].url', ''));
        setIsLoading(false);
      } catch {
        toast.error('Erro ao obter imagem');
        setIsLoading(false);
        history.push('/');
      }
    }

    getData()
  }, []);

  const handleChange = e => {
    const file = e.target.files[0];
    const fotoURL = URL.createObjectURL(file);

    setFoto(fotoURL);

    const formData = new FormData();
    formData.append('aluno_id', id);
    formData.append('foto', file);


    try {
      setIsLoading(true);

      toast.success('Foto enviada com sucesso!');

      setIsLoading(false);
    } catch(err) {
      setIsLoading(false);
      const { status } = get(err, 'response', '');
      toast.error('Erro ao enviar foto.');

      if(status === 401) dispatch(actions.loginFailure());

    }
  }

  return (
    <Conteiner>
      <Loading isLoading={isLoading} />
      <Title>Fotos</Title>
      <Form>
        <label htmlFor="foto">
          {foto ? <img src={foto} alt="Foto" /> : 'Selecionar '}
          <input type="file" id="foto" onChange={handleChange} />
        </label>
      </Form>
    </Conteiner>
  );
};

Fotos.propTypes = {
  match: PropTypes.shape({}).isRequired,
};
