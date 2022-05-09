import { MapContainer, Marker, useMap, TileLayer, Popup } from "react-leaflet";
import { Coordinates } from "@/types/global";
// import { cappuccinoMarkerIcon } from "./icons";

interface Marker {
  id: string;
  coordinates: Coordinates;
  popup?: React.ReactNode;
}

interface MapProps {
  className?: string;
  zoom?: number;
  center?: Coordinates;
  markers?: Marker[];
}

function ChangeView({
  center,
  zoom,
}: {
  center: [number, number];
  zoom: number;
}) {
  const map = useMap();

  map.setView(center, zoom);

  return null;
}

const Map: React.FC<React.PropsWithChildren<MapProps>> = ({
  className = "",
  zoom = 13,
  center = { lat: 51.505, lng: -0.09 },
  markers = [],
}) => {
  return (
    <MapContainer
      className={`${className} map`}
      scrollWheelZoom
      center={[center.lat, center.lng]}
      zoom={zoom}
    >
      <ChangeView center={[center.lat, center.lng]} zoom={zoom} />

      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
        url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
      />

      {markers.map((marker) => (
        <Marker
          key={marker.id}
          // icon={cappuccinoMarkerIcon}
          position={[marker.coordinates.lat, marker.coordinates.lng]}
        >
          {/* {marker.popup ? <Popup>{marker.popup}</Popup> : null} */}
          {marker.popup}
        </Marker>
      ))}
    </MapContainer>
  );
};

export default Map;
