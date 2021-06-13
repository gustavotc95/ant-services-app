import API from './api';

import {IPrestador, INovoPrestador} from '../../models/prestador-model';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const cadastrarPrestador = async (prestador: INovoPrestador | any) => {
  return (
    await API.post<INovoPrestador>('/prestadores', prestador, {
      headers: {'Content-Type': 'multipart/form-data'},
    })
  )?.data;
};

export const buscarPrestador = async (prestadorId: string) => {
  return (await API.get<IPrestador>(`/prestadores/${prestadorId}`))?.data;
};

export const buscarPrestadores = async (
  cidade: string,
  tipoServico: string
) => {
  if (tipoServico === 'todos') {
    tipoServico = '';
  }
  return (
    await API.get<IPrestador[]>(
      `/prestadores?cidade=${cidade}&tipoServico=${tipoServico}`
    )
  )?.data;
};
