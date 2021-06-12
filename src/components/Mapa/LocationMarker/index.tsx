import {useEffect, useState} from 'react';
import {useMapEvents, Marker} from 'react-leaflet';

import appMapIcon from '../appMapIcon';

interface ILocationMarker {
  setLocation: Function;
}

export default function LocationMarker({setLocation}: ILocationMarker) {
  const [position, setPosition] = useState(null);
  const [localizacaoLoading, setLocalizacaoLoading] = useState(false);
  const map = useMapEvents({
    click(e) {
      if (!localizacaoLoading) {
        map.locate();
      } else {
        salvePositions(e.latlng);
      }
    },
    locationfound(e) {
      if (!localizacaoLoading) {
        salvePositions(e.latlng);
        map.flyTo(e.latlng, map.getZoom());
      }
      setLocalizacaoLoading(true);
    },
  });

  function salvePositions(latlng) {
    setPosition(latlng);
    setLocation({
      latitude: latlng.lat,
      longitude: latlng.lng,
    });
  }

  useEffect(() => {
    setLocation({
      latitude: 0,
      longitude: 0,
    });
  }, []);

  return position === null ? null : (
    <Marker
      icon={appMapIcon}
      position={position}
      draggable={true}
      eventHandlers={{
        moveend: e => {
          salvePositions(e.target._latlng);
        },
      }}
    />
  );
}
