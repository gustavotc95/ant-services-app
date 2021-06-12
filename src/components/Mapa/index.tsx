import {MapContainer as LeafletMap, TileLayer} from 'react-leaflet';

import {ILocalizacao} from '../../models/cidade-model';

interface MapProps {
  interactive?: boolean;
  children: React.ReactNode;
  center: ILocalizacao;
}

export default function Mapa({children, interactive = true, center}: MapProps) {
  return (
    <LeafletMap
      center={[center.latitude, center.longitude]}
      zoom={15}
      style={{width: '100%', height: '100%'}}
      dragging={interactive}
      touchZoom={interactive}
      zoomControl={interactive}
      scrollWheelZoom={interactive}
      doubleClickZoom={interactive}
    >
      <TileLayer
        url={`https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}
      />
      {children}
    </LeafletMap>
  );
}
