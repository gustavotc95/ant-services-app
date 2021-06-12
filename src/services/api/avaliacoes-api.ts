import API from './api';

import {IAvaliacao} from 'models/avaliacao-model';

export const cadastrarAvaliacao = async (avaliacao: IAvaliacao) => {
  return (await API.post<IAvaliacao>('/avaliacoes', avaliacao))?.data;
};
