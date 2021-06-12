import {createContext} from 'react';

interface ICidadeServicoContext {
  cidade: string;
  setCidade: Function;
  servico: string;
  setServico: Function;
}

const CidadeServico = createContext<ICidadeServicoContext>(
  {} as ICidadeServicoContext
);

export default CidadeServico;
