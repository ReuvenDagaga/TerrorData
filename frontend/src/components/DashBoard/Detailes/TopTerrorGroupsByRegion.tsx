import { useState, useEffect } from "react";
import { Box, Typography, Button, Stack, MenuItem, TextField } from "@mui/material";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { MapContainer, Marker, Popup } from "react-leaflet"; 
import "leaflet/dist/leaflet.css";
import { getData } from "../../../services/dataService";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface TerrorGroup {
  _id: string;
  total: number;
}

interface MapMarker {
  region: string;
  coordinates: [number, number];
}

interface MapProps {
  urlToMakeGetRequest: string
}

interface RegionData {
  _id: string;
}
export default function TopTerrorGroupsByRegion({urlToMakeGetRequest}: MapProps) {
  const [region, setRegion] = useState<string>("");
  const [terrorGroups, setTerrorGroups] = useState<TerrorGroup[]>([]);
  const [regionsNames, setRegionsNames] = useState<RegionData[]>([]);
  const [markers, setMarkers] = useState<MapMarker[]>([]);
  console.log(region, markers, terrorGroups, regionsNames);
  

  const fetchRegionsName = async () => {
    const data = await getData(`http://localhost:3222/api/getRegionsName`);
    setRegionsNames(data);
  };
  useEffect(() => {
    fetchRegionsName(); 
  }, []);
  
  const fetchTerrorGroups = async (region: string) => {    
    const data = await getData(`${urlToMakeGetRequest}?regionName=${region}`);
    setTerrorGroups(data);
  };
  useEffect(() => {
    fetchTerrorGroups(region); 
  }, [region]);

  const chartData = {
    labels: terrorGroups.map((group) => group._id),
    datasets: [
      {
        label: "Incidents",
        data: terrorGroups.map((group) => group.total),
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: "top" as const },
      tooltip: { enabled: true },
    },
    scales: {
      x: { title: { display: true, text: "Terror Groups" } },
      y: { title: { display: true, text: "Number of Incidents" } },
    },
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "20px" }}>
      <Typography variant="h6" sx={{ marginBottom: "20px", color: "#333" }}>
        Top Terror Groups by Region
      </Typography>

      <Stack direction="row" spacing={2} sx={{ marginBottom: "20px" }}>
        <TextField
          select
          label="Region"
          value={region}
          onChange={(e) => setRegion(e.target.value)}
          helperText="Select a region"
        >
          {regionsNames.map((regionName) => (
            <MenuItem key={regionName._id} value={regionName._id} onClick={() => setRegion(regionName._id)}>
              {regionName._id}
            </MenuItem>
          ))}
        </TextField>
      </Stack>

      <Bar data={chartData} options={options} />

      <Box sx={{ marginTop: "40px", width: "100%", height: "400px" }}>
        <MapContainer center={[0, 0]} zoom={2} style={{ width: "100%", height: "100%" }}>
          {markers.map((marker) => (
            <Marker
              key={marker.region}
              position={marker.coordinates}
              eventHandlers={{
                click: () => {
                  setRegion(marker.region);
                },
              }}
            >
              <Popup>{marker.region}</Popup>
            </Marker>
          ))}
        </MapContainer>
      </Box>
    </Box>
  );
}
