import Leaflet from 'leaflet';

import mapMarkerImg from '../../assets/marker-icon.png';

export default Leaflet.icon({
  iconUrl: mapMarkerImg,
  iconSize: [26, 42],
  iconAnchor: [13, 21],
  popupAnchor: [112, -21],
});
