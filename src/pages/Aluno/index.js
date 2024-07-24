import React, { useState, useEffect } from "react";
import { get } from "lodash";
import { Conteiner } from '../../styles/GlobalStyles';
import PropTypes from 'prop-types';
import { Form, ProfilePicture, Title } from './styled';
import { isEmail, isInt, isFloat } from "validator";
import { toast } from "react-toastify";
import Loading from "../../components/Loading";
import { response } from "../../services/alunosList";
import history from "../../services/history";
import { useDispatch } from "react-redux";
import * as actions from '../../store/modules/auth/actions';
import { FaEdit, FaUserCircle } from 'react-icons/fa'
import { Link } from "react-router-dom";

export default function Aluno({ match }) {
  const dispatch = useDispatch();

  const id = get(match, 'params.id', 0);
  const [nome, setNome] = useState('');
  const [sobrenome, setSobrenome] = useState('');
  const [email, setEmail] = useState('');
  const [idade, setIdade] = useState('');
  const [peso, setPeso] = useState('');
  const [altura, setAltura] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [foto, setFoto] = useState('');

  useEffect(() => {
    if(!id) return;
    setIsLoading(true);

    async function getData() {
      try {
        setIsLoading(true);
        const Foto = get(response, 'Fotos[0].url', '');

        setFoto(Foto);
        setNome(response.nome);
        setSobrenome(response.sobrenome);
        setEmail(response.email);
        setIdade(response.idade);
        setPeso(response.peso);
        setAltura(response.altura);
        setIsLoading(false);
      } catch(err) {
        setIsLoading(false);
        const status = get(err, 'response.status', 0);
        const errors = get(err, 'response.data.errors', []);

        if(status === 400) errors.map(error => toast.error(error));
        history.push('/');
      }
    }

    getData()
  }, [id]);

  const handleSubmit = e => {
    e.preventDefault();
    let formErrors = false;

    if(nome.length < 3 || nome.length > 255) {
      toast.error('Nome precisa ter entre 3 e 255 caracteres');
      formErrors = true;
    }

    if(sobrenome.length < 3 || sobrenome.length > 255) {
      toast.error('Sobrenome precisa ter entre 3 e 255 caracteres');
      formErrors = true;
    }

    if(!isEmail(email)) {
      test.error('E-mail inválido');
      formErrors = true;
    }

    if(isInt(String(idade))) {
      toast.error('Idade inválida');
      formErrors = true;
    }

    if(isFloat(String(peso))) {
      toast.error('Peso inválido');
      formErrors = true;
    }

    if(isFloat(String(altura))) {
      toast.error('Altura inválida');
      formErrors = true;
    }

    if(formErrors) return;
    try {
      setIsLoading(true);

      if(id) {
        response.push({
          nome,
          sobrenome,
          email,
          idade,
          peso,
          altura,
        });
        toast.success('Aluno(a) editado(a) com sucesso!');
      } else {
        response.push({
          nome,
          sobrenome,
          email,
          idade,
          peso,
          altura,
        });
        toast.success('Aluno(a) criado(a) com sucesso!');
        history.push(`/aluno/${response.id}/edit`);
      }

      setIsLoading(false);
    } catch(err) {
      const status = get(err, 'response.status', 0);
      const data = get(err, 'response.data', {});
      const errors = get(data, 'errors', []);

      if(errors.length > 0) {
        errors.map(error => toast.error(error));
      } else {
        toast.error('Erro deconhecido');
      }

      if(status === 401) dispatch(actions.loginFailure());
    }
  }

  return (
    <Conteiner>
      <Loading isLoading={isLoading} />

      <Title>{id ? 'Editar Aluno' : 'Novo Aluno'}</Title>

      {id && (
        <ProfilePicture>
          {foto ? (
            <img src={foto} alt={nome} />
          ) : (
            <FaUserCircle size={180} />
          )}
          <Link to={`/fotos/${id}`}>
              <FaEdit size={24}></FaEdit>
          </Link>
        </ProfilePicture>
      )}

      <Form onSubmit={handleSubmit}>
        <input>
          type="text"
          value={nome}
          onChange={e => setNome(e.target.value)}
          placeholder="Nome"
        </input>
        <input>
          type="text"
          value={sobrenome}
          onChange={e => setSobrenome(e.target.value)}
          placeholder="Sobrenome"
        </input>
        <input>
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder="E-mail"
        </input>
        <input>
          type="number"
          value={idade}
          onChange={e => setIdade(e.target.value)}
          placeholder="Idade"
        </input>
        <input>
          type="text"
          value={peso}
          onChange={e => setPeso(e.target.value)}
          placeholder="Peso"
        </input>
        <input>
          type="number"
          value={altura}
          onChange={e => setAltura(e.target.value)}
          placeholder="Altura"
        </input>

        <button type="submit">Enviar</button>
      </Form>

    </Conteiner>
  );
}

Aluno.propTypes = {
  match: PropTypes.shape({}).isRequired,
}
