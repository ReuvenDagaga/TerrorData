import { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Button,
  Stack,
  TextField,
  MenuItem,
} from "@mui/material";
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
import { getData } from "../../../services/dataService";
import { data } from "react-router-dom";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface TrendData {
  year: number;
  month: number;
  totalKill: number;
  totalEvents: number;
}

interface BarChartProps {
    urlToMakeGetRequest : string
}

export default function DetailsSpaceByYearsWithGraph({urlToMakeGetRequest}: BarChartProps) {
  const [yearStart, setYearStart] = useState<number>(2010); 
  const [yearEnd, setYearEnd] = useState<number>(2020); 
  const [month, setMonth] = useState<number | "">(1);
  const [trendData, setTrendData] = useState<TrendData[]>([]);

  const fetchTrendData = async () => {
    const data = await getData(urlToMakeGetRequest);
    setTrendData(data);
    setTrendData(data);
  };
  console.log(trendData);
  console.log(125151515);
  
  

  

  useEffect(() => {
    fetchTrendData();
  }, [yearStart, yearEnd, month]);

  const chartData = {
    labels: trendData.map((item) => `${item.year}-${item.month}`), // שנת וחודש
    datasets: [
      {
        label: "Total Kills",
        data: trendData.map((item) => item.totalKill),
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
      {
        label: "Total Events",
        data: trendData.map((item) => item.totalEvents),
        backgroundColor: "rgba(192, 75, 192, 0.6)",
        borderColor: "rgba(192, 75, 192, 1)",
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
      x: { title: { display: true, text: "Year-Month" } },
      y: { title: { display: true, text: "Count" } },
    },
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        height: "100vh",
        width: "100%",
        background: "rgba(119, 139, 212, 0.23)",
        padding: "20px",
      }}
    >
      <Typography variant="h6" sx={{ marginBottom: "20px", color: "#333" }}>
        Incident Trends
      </Typography>

      <Stack direction="row" spacing={2} sx={{ marginBottom: "20px" }}>
        <TextField
          label="Start Year"
          type="number"
          value={yearStart}
          onChange={(e) => setYearStart(parseInt(e.target.value, 10))}
        />
        <TextField
          label="End Year"
          type="number"
          value={yearEnd}
          onChange={(e) => setYearEnd(parseInt(e.target.value, 10))}
        />
        <TextField
          select
          label="Month (Optional)"
          value={month}
          onChange={(e) =>
            setMonth(e.target.value === "" ? "" : parseInt(e.target.value, 10))
          }
          helperText="Leave empty for all months"
        >
          <MenuItem value="">All Months</MenuItem>
          {[...Array(12)].map((_, index) => (
            <MenuItem key={index + 1} value={index + 1}>
              Month {index + 1}
            </MenuItem>
          ))}
        </TextField>
        <Button variant="contained" onClick={fetchTrendData}>
          Apply Filters
        </Button>
      </Stack>

      <Bar data={chartData} options={options} />
    </Box>
  );
}
