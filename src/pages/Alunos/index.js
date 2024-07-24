import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom'
import { Conteiner } from '../../styles/GlobalStyles';
import { AlunoConteiner, ProfilePicture, NovoAluno } from "./styled";
import { get } from 'lodash';
import { FaUserCircle, FaEdit, FaWindowClose, FaExclamation } from 'react-icons/fa';
import { response } from "../../services/alunosList";
import Loading from "../../components/Loading";
import { toast } from "react-toastify";

export default function Alunos() {
  const [alunos, setAlunos] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function getData() {
      setIsLoading(true);
      setAlunos(response);
      setIsLoading(false);
    }

    getData();
  }, []);

  const handleDeleteAsk = e => {
    e.preventDefault();
    const exclamation = e.currentTarget.nextSibling;
    exclamation.setAttribute('display', 'block');
    e.currentTarget.remove();
  }

  const handleDelete = async (e, id, index) => {
      e.persist();

      try {
        setIsLoading(true);
        const novosAlunos = [... alunos]
        novosAlunos.splice(index, 1);
        setAlunos(novosAlunos)
        setIsLoading(false);
      } catch (err) {
        const status = get(err, 'response.status', 0);

        if(status === 401) {
          toast.error('Você precisa fazer login');
          return;
        } else {
          toast.error('Ocorreu um erro ao excluir aluno');
        }
        setIsLoading(false);
      }
  }

  return (
    <Conteiner>
      <Loading isLoading={isLoading} />
      <h1>Alunos</h1>

      <NovoAluno to="/aluno/">Novo Aluno</NovoAluno>

      <AlunoConteiner>
        {alunos.map((aluno, index) => (
          <div key={String(aluno.id)}>
            <ProfilePicture>
              {get(aluno, 'Fotos[0].url', false) ? (
                <img src={aluno.Fotos[0].url} alt=""></img>
              ) : (<FaUserCircle size={36} />)}
            </ProfilePicture>

            <span>{aluno.nome}</span>
            <span>{aluno.email}</span>
            <Link to={`/aluno/${aluno.id}/edit`}>
              <FaEdit size={16} />
            </Link>

            <Link onClick={handleDeleteAsk} to={`/aluno/${aluno.id}/delete`} >
              <FaWindowClose size={16} />
            </Link>

            <FaExclamation
              size={16}
              display="none"
              cursor="pointer"
              onClick={e => handleDelete(e, aluno.id, index)}
            />
          </div>
        ))}
      </AlunoConteiner>
    </Conteiner>
  );
}
