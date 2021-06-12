import {useEffect, useState} from 'react';
import {useHistory, useParams} from 'react-router-dom';
import {useForm} from 'react-hook-form';
import _ from 'lodash/fp';

import PageContainer from '../../components/PageContainer';
import StarRating from '../../components/StarRating';
import FormInput from '../../components/FormInput';

import {IAvaliacao} from '../../models/avaliacao-model';
import {IPrestador} from '../../models/prestador-model';

import {buscarPrestador} from '../../services/api/prestadores-api';
import {cadastrarAvaliacao} from '../../services/api/avaliacoes-api';

export default function CriarAvaliacao() {
  const history = useHistory();
  const {register, handleSubmit, errors} = useForm<IAvaliacao>();
  const [prestador, setPrestador] = useState<IPrestador>({} as IPrestador);
  const [starRatingValue, setStarRatingValue] = useState<number>(0);

  const {id} = useParams<{id: string}>();

  const onSubmit = (data: IAvaliacao) => {
    if (starRatingValue === 0) {
      alert('A avaliação não pode ser 0');
      return;
    }
    const avaliacao: IAvaliacao = {
      titulo: data.titulo,
      starRating: starRatingValue.toString(),
      comentario: data.comentario,
      prestador: Number(id),
    };

    criarAvaliacaoPrestador(avaliacao);
  };

  async function criarAvaliacaoPrestador(avaliacao: IAvaliacao) {
    try {
      await cadastrarAvaliacao(avaliacao);
      alert('Avaliação cadastrada com sucesso!');
      history.push('/');
    } catch (error) {
      alert('Erro!');
      console.error(error);
    }
  }

  async function buscarInfosPrestador(id: string) {
    const prestadorInfos = await buscarPrestador(id);
    setPrestador(prestadorInfos);
  }

  useEffect(() => {
    buscarInfosPrestador(id);
  }, []);

  return (
    <>
      <PageContainer>
        <div className="page-form">
          <h1>Avaliar Prestador - {prestador.nome}</h1>
          <form className="form-create" onSubmit={handleSubmit(onSubmit)}>
            <div className="form-row">
              <div className="form-group col-md-12">
                <label className="form-label" htmlFor="titulo">
                  Título da Avaliação
                </label>
                <FormInput
                  name="titulo"
                  type="text"
                  placeholder=""
                  id="input-titulo"
                  inputRef={register({
                    required: true,
                  })}
                  erros={errors}
                />
              </div>
              <div className="form-group col-md-12">
                <label className="form-label" htmlFor="nome">
                  Nota
                </label>
                <StarRating
                  starRatingValue={starRatingValue}
                  setStarRatingValue={setStarRatingValue}
                />
              </div>

              <div className="form-group col-md-12">
                <label className="form-label" htmlFor="comentario">
                  Comentário
                </label>
                <textarea
                  className="col-md-12 form-text-area"
                  name="comentario"
                  ref={register({
                    required: true,
                    maxLength: 500,
                  })}
                />
                {_.get('comentario.type', errors) === 'required' && (
                  <p className="input-error">Este campo é obrigatório</p>
                )}
                {_.get('comentario.type', errors) === 'maxLength' && (
                  <p className="input-error">
                    O campo não pode ter mais de 500 caracteres
                  </p>
                )}
              </div>
            </div>

            <div className="btn-group">
              <button
                type="submit"
                className="btn btn-primary btn-save"
                disabled={starRatingValue === 0}
              >
                Enviar Avaliação
              </button>
            </div>
          </form>
        </div>
      </PageContainer>
    </>
  );
}
