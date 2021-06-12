import API from './api';

import {ITipoServico} from '../../models/tipo-servico-model';

export const listarTiposServicos = async () => {
  return (await API.get<ITipoServico>('/tipos-servicos'))?.data;
};

// export const cadastrarCategoria = async (nome: string, descricao?: string) => {
//   const params = {nome, descricao};
//   return (await axios.post<ICategoria>('/categorias', params))?.data;
// };

// export const deletarCategoria = async (id: string) => {
//   return await axios.delete<ICategoria>(`/categorias/${id}`);
// };
