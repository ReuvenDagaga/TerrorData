import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

interface RegionData {
  lat: number | null; 
  long: number | null; 
  region: string; 
  count: number;
}

interface MapProps {
  data: RegionData[];
}



export default function CasualtyMap({ data }: MapProps) {
  const filteredData = data.filter(
    (region) => region.lat !== null && region.long !== null
  );

  const centerPosition: [number, number] =
    filteredData.length > 0
      ? [filteredData[0].lat as number, filteredData[0].long as number]
      : [0, 0];

  return (
    <MapContainer center={centerPosition} zoom={6} style={{ height: "100vh", width: "100%" }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />

      {filteredData.map((region, index) => (
        <Marker key={index} position={[region.lat as number, region.long as number]}>
          <Popup>
            <strong>{region.region + " "}</strong>
            <br />
             Average Casualties: {region.count}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
