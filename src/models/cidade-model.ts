export interface ICidade {
  id: number;
  nome: string;
  uf: string;
  latitude: number;
  longitude: number;
}

export interface ILocalizacao {
  latitude: number;
  longitude: number;
}

export interface IEndereco {
  latitude: number;
  longitude: number;
  logradouro: string;
  numero: string;
  complemento: string;
  bairro: string;
  cidade: ICidade;
}
