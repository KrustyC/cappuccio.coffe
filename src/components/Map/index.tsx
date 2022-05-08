import { MapContainer, Marker, useMap, TileLayer } from "react-leaflet";

interface Coordinates {
  lat: number;
  lng: number;
}

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
      className={className}
      scrollWheelZoom
      center={[center.lat, center.lng]}
      zoom={zoom}
    >
      <ChangeView center={[center.lat, center.lng]} zoom={zoom} />

      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {markers.map((marker) => (
        <Marker
          key={marker.id}
          position={[marker.coordinates.lat, marker.coordinates.lng]}
        >
          {marker.popup || null}
        </Marker>
      ))}
    </MapContainer>
  );
};

export default Map;
