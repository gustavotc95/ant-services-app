import {Marker, Popup} from 'react-leaflet';
import {FaWhatsapp} from 'react-icons/fa';

import {IPrestador} from '../../../models/prestador-model';

import appMapIcon from '../appMapIcon';

interface IPrestadorMarker {
  prestador: IPrestador;
}

export default function PrestadorMarker({prestador}: IPrestadorMarker) {
  return (
    <Marker
      icon={appMapIcon}
      position={[prestador.endereco.latitude, prestador.endereco.longitude]}
    >
      <Popup closeButton={true} className="map-popup">
        <div className="prestador-infos">
          <div className="prestador-infos__nome">{prestador.nome}</div>
          <div className="prestador-infos__servicos">
            <div className="tipo-servico--title">Serviços prestados:</div>
            <ul>
              {prestador.tiposServicos.map(tipoSerivico => {
                return <li className="tipo-servico">{tipoSerivico.nome}</li>;
              })}
            </ul>
          </div>
          <hr />
          <div className="prestador-infos__contato">
            <div className="prestador-infos__endereco">
              Endereço: {prestador.endereco.logradouro},{' '}
              {prestador.endereco.numero} {prestador.endereco.complemento}{' '}
              <br />
              Bairro: {prestador.endereco.bairro}
            </div>
            <div className="prestador-infos__telefone">
              <a
                href={`https://api.whatsapp.com/send?phone=55${prestador.telefone}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaWhatsapp size={32} color="#FFF" />
                <span>Entrar em contato</span>
              </a>
            </div>
          </div>
        </div>
      </Popup>
    </Marker>
  );
}
