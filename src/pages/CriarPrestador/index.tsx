import {ChangeEvent, useEffect, useState} from 'react';
import {useForm} from 'react-hook-form';
import _ from 'lodash/fp';

import PageContainer from '../../components/PageContainer';
import FormInput from '../../components/FormInput';
import Mapa from '../../components/Mapa';
import LocationMarker from '../../components/Mapa/LocationMarker';

import {listarTiposServicos} from '../../services/api/tipos-servicos-api';
import {cadastrarPrestador} from '../../services/api/prestadores-api';
import {listarCidades} from '../../services/api/cidades-api';

import {INovoPrestador} from '../../models/prestador-model';
import {ITipoServico} from '../../models/tipo-servico-model';
import {ICidade, ILocalizacao} from '../../models/cidade-model';

// import cpfcnpjMask from '../../../utils/masks/cpfcnpjMask';
import cepMask from '../../utils/masks/cepMask';
import phoneMask from '../../utils/masks/phoneMask';

export default function CriarPrestador() {
  const {register, handleSubmit, errors} = useForm<INovoPrestador>();
  const [tiposServicosLista, setTiposServicosLista] = useState<ITipoServico[]>(
    []
  );
  const [cidades, setCidades] = useState<ICidade[]>([]);
  const [images, setImages] = useState<File[]>([]);

  const [localizacao, setLocalizacao] = useState<ILocalizacao>({
    latitude: -19.9204952,
    longitude: -43.9404043,
  });

  async function listarTodasCidades() {
    const todasCidades = await listarCidades();
    const cidades: ICidade[] = (todasCidades as unknown) as ICidade[];
    setCidades(cidades);
  }

  async function listarTodosTiposServicos() {
    const todosTiposServicos = await listarTiposServicos();
    const tiposServicos: ITipoServico[] = (todosTiposServicos as unknown) as ITipoServico[];
    setTiposServicosLista(tiposServicos);
  }

  const onSubmit = (data: INovoPrestador) => {
    console.log(localizacao);
    if (localizacao.latitude === 0 || localizacao.longitude === 0) {
      alert('A localização no mapa é obrigatória');
      return;
    }

    const novoPrestador = new FormData();

    novoPrestador.append('nome', data.nome);
    novoPrestador.append('email', data.email);
    novoPrestador.append('telefone', data.telefone);
    novoPrestador.append('resumo', data.resumo);
    novoPrestador.append('logradouro', data.logradouro);
    novoPrestador.append('numero', data.numero);
    novoPrestador.append('complemento', data.complemento);
    novoPrestador.append('cep', data.cep);
    novoPrestador.append('bairro', data.bairro);
    novoPrestador.append('cidade', String(data.cidade));
    novoPrestador.append('latitude', String(localizacao.latitude));
    novoPrestador.append('longitude', String(localizacao.longitude));
    novoPrestador.append('avaliacaoScore', String(0));
    novoPrestador.append('ativo', String(true));

    data.tiposServicos.forEach(tipoServico => {
      novoPrestador.append('tiposServicos', String(tipoServico));
    });

    images.forEach(image => {
      novoPrestador.append('images', image);
    });

    criarPrestador(novoPrestador);
  };

  async function criarPrestador(prestador: INovoPrestador | FormData) {
    try {
      await cadastrarPrestador(prestador);
      alert('Prestador cadastrado com sucesso!');
    } catch (error) {
      alert('Erro!');
      console.error(error);
    }
  }

  function handleNewImage(event: ChangeEvent<HTMLInputElement>) {
    if (!event.target.files) {
      return;
    }
    setImages(Array.from(event.target.files));
    console.log(images);
  }

  useEffect(() => {
    listarTodasCidades();
    listarTodosTiposServicos();
  }, []);

  return (
    <>
      <PageContainer>
        <div className="page-form">
          <h1>Cadastrar Prestador</h1>
          <form className="form-create" onSubmit={handleSubmit(onSubmit)}>
            <div className="titulo-sessao">Dados pessoais</div>

            <div className="form-row">
              <div className="form-group col-md-4">
                <label className="form-label" htmlFor="nome">
                  Nome
                </label>
                <FormInput
                  name="nome"
                  type="text"
                  placeholder=""
                  id="input-nome"
                  inputRef={register({
                    required: true,
                  })}
                  erros={errors}
                />
              </div>

              <div className="form-group col-md-4">
                <label className="form-label" htmlFor="email">
                  Email
                </label>
                <FormInput
                  name="email"
                  type="email"
                  placeholder=""
                  id="input-email"
                  inputRef={register({
                    required: true,
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                      message: 'Entre com um e-mail válido.',
                    },
                  })}
                  erros={errors}
                />
              </div>

              <div className="form-group col-md-4">
                <label className="form-label" htmlFor="telefone">
                  Telefone
                </label>
                <FormInput
                  name="telefone"
                  type="text"
                  id="input-telefone"
                  inputRef={register({
                    required: true,
                    maxLength: 14,
                  })}
                  erros={errors}
                  inputMaxLength={14}
                  mask={phoneMask}
                />
              </div>
              <div className="form-group col-md-12">
                <label className="form-label" htmlFor="resumo">
                  Resumo
                </label>
                <textarea
                  className="col-md-12 form-text-area"
                  name="resumo"
                  ref={register({
                    required: true,
                    maxLength: 2000,
                  })}
                />
                {_.get('resumo.type', errors) === 'required' && (
                  <p className="input-error">Este campo é obrigatório</p>
                )}
                {_.get('resumo.type', errors) === 'maxLength' && (
                  <p className="input-error">
                    O campo não pode ter mais de 2000 caracteres
                  </p>
                )}
              </div>
              <div className="form-group col-md-12">
                <label className="form-label" htmlFor="descricao">
                  Imagem de perfil
                </label>
                <input
                  type="file"
                  name="images"
                  ref={register({
                    required: true,
                  })}
                  onChange={handleNewImage}
                />
                {_.get('images.type', errors) === 'required' && (
                  <p className="input-error">Este campo é obrigatório</p>
                )}
              </div>
            </div>

            <div className="titulo-sessao">Selecione os serviços prestados</div>
            <div className="form-row">
              <div className="form-group col-md-12">
                {tiposServicosLista.map(tipoServico => {
                  return (
                    <div className="form-group-checkbox" key={tipoServico.id}>
                      <input
                        type="checkbox"
                        value={tipoServico.id}
                        name="tiposServicos"
                        ref={register({
                          required: true,
                        })}
                      />
                      <label htmlFor={tipoServico.nome}>
                        {tipoServico.nome}
                      </label>
                    </div>
                  );
                })}
                {_.get('tiposServicos.type', errors) === 'required' && (
                  <p className="input-error">Este campo é obrigatório</p>
                )}
              </div>
            </div>

            <div className="titulo-sessao">Endereço</div>

            <div className="form-row">
              <div className="form-group col-md-3">
                <label className="form-label" htmlFor="enderecoCep">
                  CEP
                </label>
                <FormInput
                  name="cep"
                  type="text"
                  id="input-cep"
                  inputRef={register({
                    required: true,
                    maxLength: 9,
                  })}
                  erros={errors}
                  inputMaxLength={9}
                  mask={cepMask}
                />
              </div>

              <div className="form-group col-md-6">
                <label className="form-label" htmlFor="enderecoLogradouro">
                  Logradouro
                </label>
                <FormInput
                  name="logradouro"
                  type="text"
                  placeholder=""
                  id="input-endereco-completo"
                  inputRef={register({
                    required: true,
                  })}
                  erros={errors}
                />
              </div>

              <div className="form-group col-md-3">
                <label className="form-label" htmlFor="enderecoNumero">
                  Nº
                </label>
                <FormInput
                  name="numero"
                  type="text"
                  placeholder=""
                  id="input-endereco-numero"
                  inputRef={register({
                    required: true,
                    maxLength: 6,
                  })}
                  erros={errors}
                  inputMaxLength={6}
                />
              </div>

              <div className="form-group col-md-4">
                <label className="form-label" htmlFor="enderecoComplemento">
                  Complemento <span className="label-opcional">(opcional)</span>
                </label>
                <FormInput
                  name="complemento"
                  type="text"
                  placeholder=""
                  id="input-endereco-complemento"
                  inputRef={register({
                    required: false,
                  })}
                  erros={errors}
                />
              </div>

              <div className="form-group col-md-4">
                <label className="form-label" htmlFor="bairro">
                  Bairro
                </label>
                <FormInput
                  name="bairro"
                  type="text"
                  placeholder=""
                  id="input-endereco-bairro"
                  inputRef={register({
                    required: true,
                  })}
                  erros={errors}
                />
              </div>

              <div className="form-group col-md-4">
                <label className="form-label" htmlFor="cidade">
                  Cidade
                </label>
                <select
                  name="cidade"
                  className="form-input"
                  ref={register({
                    required: true,
                  })}
                >
                  <option value="">Selecione</option>
                  {cidades.map(cidadeItem => {
                    return (
                      <option value={cidadeItem.id} key={cidadeItem.id}>
                        {cidadeItem.nome}
                      </option>
                    );
                  })}
                </select>
                {_.get('cidade.type', errors) === 'required' && (
                  <p className="input-error">Este campo é obrigatório</p>
                )}
              </div>

              <div className="form-group form-map col-md-12">
                <div className="form-label">
                  Selecione no mapa sua localização
                </div>
                <Mapa center={localizacao}>
                  <LocationMarker setLocation={setLocalizacao} />
                </Mapa>
              </div>
            </div>
            <div className="btn-group">
              <button type="submit" className="btn btn-primary btn-save">
                Salvar
              </button>
            </div>
          </form>
        </div>
      </PageContainer>
    </>
  );
}
