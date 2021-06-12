import {useContext, useEffect, useState} from 'react';
import {useForm} from 'react-hook-form';
import {FiSearch} from 'react-icons/fi';
// import _ from 'lodash/fp';

import './styles.scss';

import {listarTiposServicos} from '../../services/api/tipos-servicos-api';
import {listarCidades} from '../../services/api/cidades-api';

import {ITipoServico} from '../../models/tipo-servico-model';
import {ICidade} from '../../models/cidade-model';

import CidadeServico from '../../hooks/CidadeServico';

interface IFormInputSearch {
  cidade: string;
  tipoServico: string;
}

export default function Search() {
  const {register, handleSubmit, setValue} = useForm<IFormInputSearch>();
  const [tiposServicos, setTiposServicos] = useState<ITipoServico[]>([]);
  const [cidades, setCidades] = useState<ICidade[]>([]);

  const {cidade, setCidade, servico, setServico} = useContext(CidadeServico);

  const onSubmit = async (data: IFormInputSearch) => {
    setCidade(data.cidade);
    setServico(data.tipoServico);
  };

  // console.log('watchAllFields', watchAllFields);

  async function listarTodosTiposServicos() {
    const todosTiposServicos = await listarTiposServicos();
    const tiposServicos: ITipoServico[] = (todosTiposServicos as unknown) as ITipoServico[];
    setTiposServicos(tiposServicos);
  }

  async function listarTodasCidades() {
    const todasCidades = await listarCidades();
    const cidades: ICidade[] = (todasCidades as unknown) as ICidade[];
    setCidades(cidades);
  }

  useEffect(() => {
    listarTodosTiposServicos();
    listarTodasCidades();
  }, []);

  useEffect(() => {
    setValue('cidade', cidade);
    setValue('tipoServico', servico);
  }, [cidades]);

  return (
    <>
      {cidades && (
        <form className="search-form" onSubmit={handleSubmit(onSubmit)}>
          <div className="form-group">
            <label htmlFor="cidade">Cidade:</label>
            <select name="cidade" className="form-input" ref={register}>
              <option value="">Selecione</option>
              {cidades.map(cidadeItem => {
                return (
                  <option value={cidadeItem.id} key={cidadeItem.id}>
                    {cidadeItem.nome}
                  </option>
                );
              })}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="tipoServico">Tipo de serviço:</label>
            <select name="tipoServico" ref={register}>
              <option value="">Selecione</option>
              {tiposServicos.map(tipoServico => {
                return (
                  <option value={tipoServico.id} key={tipoServico.id}>
                    {tipoServico.nome}
                  </option>
                );
              })}
              <option value="todos">Todos</option>
            </select>
          </div>

          <button type="submit">
            <FiSearch />
          </button>
        </form>
      )}
    </>
  );
}
