import React, {useEffect, useState} from 'react';

import CidadeServico from '../../hooks/CidadeServico';

import {buscarPrestadores} from '../../services/api/prestadores-api';
import {getCidadeInfo} from '../../services/api/cidades-api';

import {IPrestador} from '../../models/prestador-model';
import {ILocalizacao} from '../../models/cidade-model';

import Header from '../../components/Header';
import Mapa from '../../components/Mapa';
import PrestadorMarker from '../../components/Mapa/PrestadorMarker';

import 'leaflet/dist/leaflet.css';

export default function Home() {
  const [cidade, setCidade] = useState('1');
  const [servico, setServico] = useState('todos');
  const [localizacao, setLocalizacao] = useState<ILocalizacao>({
    latitude: -19.9204952,
    longitude: -43.9404043,
  });
  const [prestadores, setPrestadores] = useState<IPrestador[]>(
    [] as IPrestador[]
  );

  async function listarPrestadores() {
    const listaPrestadores = await buscarPrestadores(cidade, servico);
    setPrestadores(listaPrestadores);
  }

  async function buscaCidadesInfos(cidadeId: string) {
    const cidadeInfo = await getCidadeInfo(cidadeId);
    const cidadeLocalizacao = {
      latitude: cidadeInfo.latitude,
      longitude: cidadeInfo.longitude,
    };
    setLocalizacao(cidadeLocalizacao);
  }

  useEffect(() => {
    if (cidade && servico) {
      listarPrestadores();
      buscaCidadesInfos(cidade);
    }
  }, [cidade, servico]);

  useEffect(() => {
    listarPrestadores();
  }, []);

  return (
    <>
      <CidadeServico.Provider value={{cidade, setCidade, servico, setServico}}>
        <Header />
        <div className="map-container-full-page">
          <Mapa center={localizacao} key={localizacao.latitude + servico}>
            {prestadores &&
              prestadores.map(prestador => {
                return (
                  <PrestadorMarker prestador={prestador} key={prestador.id} />
                );
              })}
          </Mapa>
        </div>
      </CidadeServico.Provider>
    </>
  );
}
