import API from './api';

import {ICidade} from '../../models/cidade-model';

export const listarCidades = async () => {
  return (await API.get<ICidade>('/cidades'))?.data;
};

export const getCidadeInfo = async (id: string) => {
  return (await API.get<ICidade>(`/cidades/${id}`))?.data;
};
