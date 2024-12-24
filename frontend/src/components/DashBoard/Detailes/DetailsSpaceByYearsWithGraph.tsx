import { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Stack,
  TextField,
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
  const [monthStart, setMonthStart] = useState<number | "">(1);
  const [monthEnd, setMonthEnd] = useState<number | "">(1);
  const [trendData, setTrendData] = useState<TrendData[]>([]);

  const fetchTrendData = async () => {
    const data = await getData(`${urlToMakeGetRequest}?yearStart=${yearStart}&yearEnd=${yearEnd}&monthStart=${monthStart}&monthEnd=${monthEnd}`);
    setTrendData(data);
    setTrendData(data);
  };
  console.log(trendData);
  console.log(125151515);
  
  

  

  useEffect(() => {
    fetchTrendData();
  }, [yearStart, yearEnd, monthStart, monthEnd]);

  const chartData = {
    labels: trendData.map((item) => `${item.year}-${item.month}`),
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
          label="Start Month"
          type="number"
          value={monthStart}
          onChange={(e) => setMonthStart(parseInt(e.target.value, 10))}
        />
        <TextField
          label="End Month"
          type="number"
          value={monthEnd}
          onChange={(e) => setMonthEnd(parseInt(e.target.value, 10))}
        />
      </Stack>

      <Bar data={chartData} options={options} />
    </Box>
  );
}
