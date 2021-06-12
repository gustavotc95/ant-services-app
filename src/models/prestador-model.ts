import {IEndereco} from './cidade-model';
import {ITipoServico} from './tipo-servico-model';

export interface IPrestador {
  id: number;
  nome: string;
  email: string;
  telefone: string;
  resumo: string;
  avaliacaoScore: number;
  ativo: boolean;
  images: string[];
  tiposServicos: ITipoServico[];
  endereco: IEndereco;
}

export interface INovoPrestador {
  nome: string;
  email: string;
  telefone: string;
  resumo: string;
  logradouro: string;
  numero: string;
  complemento: string;
  cep: string;
  bairro: string;
  cidade: string;
  latitude: string;
  longitude: string;
  avaliacaoScore: string;
  ativo: boolean;
  images: any;
  tiposServicos: ITipoServico[];
}
